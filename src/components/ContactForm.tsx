"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ecom-red/30 bg-white/60 p-8 text-center">
        <h3 className="font-display text-xl font-medium text-ecom-dark">
          Thanks — we&rsquo;ll be in touch soon.
        </h3>
        <p className="mt-2 text-ecom-dark/70">
          Your request has been sent to the Ecommetrica team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Name" name="name" type="text" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
      />
      <Field label="Company / Firma" name="company" type="text" />

      <label className="flex flex-col gap-2 text-sm font-medium text-ecom-dark">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl border border-ecom-dark/20 bg-white/60 px-4 py-3 text-base font-normal text-ecom-dark outline-none focus:border-ecom-red"
        />
      </label>

      {error && <p className="text-sm text-ecom-red">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-ecom-dark px-8 py-4 text-sm font-medium text-ecom-cream transition-colors hover:bg-ecom-red disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send form"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-ecom-dark">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-ecom-dark/20 bg-white/60 px-4 py-3 text-base font-normal text-ecom-dark outline-none focus:border-ecom-red"
      />
    </label>
  );
}
