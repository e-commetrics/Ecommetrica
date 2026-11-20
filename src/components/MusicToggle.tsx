"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Background music and its toggle: a small wave that grooves with the music while it
 * plays and lies flat when paused.
 *
 * Browsers only allow sound after the visitor interacts, so it starts on their first
 * click, tap or key press anywhere on the page, on every visit; a pause lasts until the
 * page is reloaded (nothing is remembered). The Header renders one toggle for desktop and one for
 * mobile; both drive the single player below, which lives as long as the page does, so
 * the music carries on across client-side navigation.
 */

/**
 * Satie — Gymnopédie No. 1, played by Robin Alciatore (Musopen). Public domain. Streamed
 * from Wikimedia Commons as their MP3 transcode (the original is Ogg, which Safari can't play).
 */
const TRACK_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/90/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg.mp3";
const VOLUME = 0.45;

type Status = "idle" | "playing" | "paused";

let status: Status = "idle";
let audio: HTMLAudioElement | null = null;
// Web Audio around the <audio> element: fades in and out, and the loudness for the wave.
let ctx: AudioContext | null = null;
let gain: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let pauseTimer = 0;
const listeners = new Set<() => void>();

function setStatus(next: Status) {
  status = next;
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function fadeTo(volume: number, seconds: number) {
  if (!ctx || !gain) return;
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setTargetAtTime(volume, ctx.currentTime, seconds);
}

function play() {
  if (!audio) {
    audio = new Audio();
    audio.crossOrigin = "anonymous"; // the analyser needs CORS access to the stream
    audio.loop = true;
    audio.preload = "auto";
    audio.src = TRACK_SRC;
  }
  // Created inside the gesture's call stack: Safari only unlocks audio there.
  try {
    if (!ctx) {
      ctx = new AudioContext();
      gain = ctx.createGain();
      gain.gain.value = 0;
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      ctx.createMediaElementSource(audio).connect(gain).connect(analyser).connect(ctx.destination);
    }
    void ctx.resume();
  } catch {
    // No Web Audio: the track plays straight, without fades or a moving wave.
  }
  window.clearTimeout(pauseTimer);
  audio.play().catch((error: unknown) => {
    // The browser didn't count that press as a gesture: wait for the next one.
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      setStatus("idle");
      armAutoplay();
    }
  });
  fadeTo(VOLUME, 0.6);
  setStatus("playing");
  watchVisibility();
}

function pause() {
  setStatus("paused");
  fadeTo(0, 0.12);
  pauseTimer = window.setTimeout(() => audio?.pause(), ctx ? 450 : 0);
}

// A hidden tab goes quiet and picks up where it left off on return.
let watching = false;
function watchVisibility() {
  if (watching) return;
  watching = true;
  document.addEventListener("visibilitychange", () => {
    if (status !== "playing" || !audio) return;
    if (document.hidden) audio.pause();
    else void audio.play().catch(() => undefined);
  });
}

// The first click, tap or key press anywhere on the page starts the music.
let armed = false;
function armAutoplay() {
  if (armed) return;
  armed = true;
  const events = ["click", "keydown", "touchend"] as const;
  const disarm = () => events.forEach((name) => window.removeEventListener(name, onFirst, true));
  function onFirst(event: Event) {
    if (event instanceof KeyboardEvent && ["Escape", "Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
    disarm();
    armed = false;
    // A press on the toggle itself is its own decision (its click handler runs next).
    if (event.target instanceof Element && event.target.closest("[data-music-toggle]")) return;
    if (status === "idle") play();
  }
  events.forEach((name) => window.addEventListener(name, onFirst, true));
}

/** Loudness right now (RMS), for the wave. */
const samples = new Float32Array(512);
function level() {
  if (!analyser) return 0;
  analyser.getFloatTimeDomainData(samples);
  let sum = 0;
  for (const v of samples) sum += v * v;
  return Math.sqrt(sum / samples.length);
}

const W = 22;
const MID = 7;
/** The icon's path: a wave tapered at both ends; amp 0 is a flat line. */
function wavePath(amp: number, phase: number) {
  let d = `M0 ${MID}`;
  for (let x = 1; x <= W; x++) {
    const taper = Math.sin((Math.PI * x) / W);
    const y = MID + amp * taper * (Math.sin(x * 0.75 + phase) * 0.75 + Math.sin(x * 1.6 - phase * 1.3) * 0.25);
    d += ` L${x} ${y.toFixed(2)}`;
  }
  return d;
}

export default function MusicToggle() {
  const { t } = useLanguage();
  const current = useSyncExternalStore(subscribe, () => status, () => "idle" as Status);
  const still = Boolean(useReducedMotion());
  const pathRef = useRef<SVGPathElement>(null);
  const playing = current === "playing";

  useEffect(armAutoplay, []);

  // The wave follows the music's loudness; it eases flat when paused and stops drawing.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    let frame = 0;
    let amp = 0;
    let phase = 0;
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Satie is soft (RMS ≈ 0.01–0.04 at this volume), hence the steep scale.
      const target = playing ? (still ? 3 : Math.min(5, 1.4 + level() * 90)) : 0;
      amp += (target - amp) * Math.min(1, dt * 8);
      if (!still) phase += dt * 7;
      // Skip the drawing (not the loop) for the copy the current breakpoint hides.
      if (path.getClientRects().length) path.setAttribute("d", wavePath(amp, phase));
      frame = playing || amp > 0.02 ? requestAnimationFrame(draw) : 0;
      if (!frame) path.setAttribute("d", wavePath(0, 0));
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [playing, still]);

  return (
    <button
      type="button"
      data-music-toggle
      onClick={() => (playing ? pause() : play())}
      aria-label={playing ? t.music.pause : t.music.play}
      title={t.music.title}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 hover:border-ecom-orange hover:text-ecom-orange ${
        playing ? "border-ecom-orange/60 text-ecom-orange" : "border-white/20 text-white/70"
      }`}
    >
      <svg aria-hidden viewBox={`0 0 ${W} 14`} className="h-3.5 w-[1.375rem] overflow-visible">
        <path
          ref={pathRef}
          d={wavePath(0, 0)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
