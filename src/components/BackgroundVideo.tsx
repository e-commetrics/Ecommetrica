"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function BackgroundVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [manual, setManual] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playing = manual ?? !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing, src]);

  const label = playing ? t.a11y.pauseVideo : t.a11y.playVideo;

  return (
    <div className="relative">
      <video ref={videoRef} src={src} muted loop playsInline className={className} style={style} />
      <button
        type="button"
        onClick={() => setManual(!playing)}
        aria-label={label}
        title={label}
        className="absolute right-3 bottom-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ecom-black/75 text-white ring-1 ring-white/30 backdrop-blur transition-colors duration-300 hover:bg-ecom-black"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M6 4l10 6-10 6z" />
    </svg>
  );
}
