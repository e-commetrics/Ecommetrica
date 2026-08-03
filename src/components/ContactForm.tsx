"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { submitContactForm, type ContactFormPayload } from "@/services/contact.service";
import { useLanguage } from "@/components/LanguageProvider";

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as unknown as Omit<
      ContactFormPayload,
      "lang"
    >;

    const toastId = toast.loading(t.contactForm.sendingToast);

    try {
      await submitContactForm({ ...data, lang });
      toast.success(t.contactForm.successToast, { id: toastId });
      setStatus("success");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.contactForm.errorFallback, { id: toastId });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/5 p-8 text-center">
        <h3 className="font-display text-xl font-medium text-white">
          {t.contactForm.successTitle}
        </h3>
        <p className="mt-2 text-white/60">{t.contactForm.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.contactForm.nameLabel} name="name" type="text" required autoComplete="name" />
        <Field label={t.contactForm.emailLabel} name="email" type="email" required autoComplete="email" />
        <Field label={t.contactForm.phoneLabel} name="phone" type="tel" autoComplete="tel" />
        <Field label={t.contactForm.companyLabel} name="company" type="text" />
      </div>

      <label className="flex flex-col gap-2 text-xs font-medium tracking-widest text-white/50 uppercase">
        {t.contactForm.messageLabel}
        <textarea
          name="message"
          required
          rows={3}
          className="border-b border-white/30 bg-transparent py-2 text-base font-normal text-white normal-case outline-none placeholder:text-white/30 focus:border-ecom-orange"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-ecom-black transition-colors hover:bg-ecom-orange hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? t.contactForm.submitting : t.contactForm.submit}
        <span aria-hidden>&#8599;</span>
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
    <label className="flex flex-col gap-2 text-xs font-medium tracking-widest text-white/50 uppercase">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="border-b border-white/30 bg-transparent py-2 text-base font-normal text-white normal-case outline-none placeholder:text-white/30 focus:border-ecom-orange"
      />
    </label>
  );
}
