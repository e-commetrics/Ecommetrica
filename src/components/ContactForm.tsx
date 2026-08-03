"use client";

import { useRef, useState, type FormEvent, type RefObject, type SyntheticEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { submitContactForm } from "@/services/contact.service";
import { useLanguage } from "@/components/LanguageProvider";
import { createContactFormSchema, type ContactFormValues } from "@/lib/validation/contactForm";

type Status = "idle" | "submitting" | "success";
type FieldName = "name" | "email" | "phone" | "company" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "company", "message"];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const fieldRefs = useRef<Partial<Record<FieldName, FieldElement>>>({});

  function runValidation(form: HTMLFormElement) {
    const raw = Object.fromEntries(new FormData(form).entries());
    const result = createContactFormSchema(t.contactForm).safeParse(raw);

    if (result.success) {
      setErrors({});
      return { data: result.data, fieldErrors: {} as FieldErrors };
    }

    const flat = result.error.flatten().fieldErrors;
    const fieldErrors: FieldErrors = {
      name: flat.name?.[0],
      email: flat.email?.[0],
      phone: flat.phone?.[0],
      company: flat.company?.[0],
      message: flat.message?.[0],
    };
    setErrors(fieldErrors);
    return { data: null as ContactFormValues | null, fieldErrors };
  }

  function handleBlur(name: FieldName, event: SyntheticEvent<FieldElement>) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (event.currentTarget.form) runValidation(event.currentTarget.form);
  }

  function handleChange(name: FieldName, event: SyntheticEvent<FieldElement>) {
    // Once a field has already shown an error, clear it live as the user fixes it
    // instead of waiting for the next blur.
    if (touched[name] && event.currentTarget.form) runValidation(event.currentTarget.form);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setTouched({ name: true, email: true, phone: true, company: true, message: true });
    const { data, fieldErrors } = runValidation(form);

    if (!data) {
      const firstInvalid = FIELD_ORDER.find((name) => fieldErrors[name]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    const toastId = toast.loading(t.contactForm.sendingToast);

    try {
      await submitContactForm({ ...data, lang });
      toast.success(t.contactForm.successToast, { id: toastId });
      setStatus("success");
      form.reset();
      setTouched({});
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={t.contactForm.nameLabel}
          name="name"
          type="text"
          autoComplete="name"
          error={touched.name ? errors.name : undefined}
          fieldRefs={fieldRefs}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Field
          label={t.contactForm.emailLabel}
          name="email"
          type="email"
          autoComplete="email"
          error={touched.email ? errors.email : undefined}
          fieldRefs={fieldRefs}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Field
          label={t.contactForm.phoneLabel}
          name="phone"
          type="tel"
          autoComplete="tel"
          error={touched.phone ? errors.phone : undefined}
          fieldRefs={fieldRefs}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Field
          label={t.contactForm.companyLabel}
          name="company"
          type="text"
          error={touched.company ? errors.company : undefined}
          fieldRefs={fieldRefs}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>

      <label className="flex flex-col gap-2 text-xs font-medium tracking-widest text-white/50 uppercase">
        {t.contactForm.messageLabel}
        <textarea
          ref={(el) => {
            fieldRefs.current.message = el ?? undefined;
          }}
          name="message"
          rows={3}
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onBlur={(event) => handleBlur("message", event)}
          onChange={(event) => handleChange("message", event)}
          className={`border-b bg-transparent py-2 text-base font-normal text-white normal-case outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-ecom-orange ${
            touched.message && errors.message ? "border-red-400" : "border-white/30"
          }`}
        />
        <FieldError id="contact-message-error" message={touched.message ? errors.message : undefined} />
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
  autoComplete,
  error,
  fieldRefs,
  onBlur,
  onChange,
}: {
  label: string;
  name: FieldName;
  type: string;
  autoComplete?: string;
  error?: string;
  fieldRefs: RefObject<Partial<Record<FieldName, FieldElement>>>;
  onBlur: (name: FieldName, event: SyntheticEvent<FieldElement>) => void;
  onChange: (name: FieldName, event: SyntheticEvent<FieldElement>) => void;
}) {
  const errorId = `contact-${name}-error`;

  return (
    <label className="flex flex-col gap-2 text-xs font-medium tracking-widest text-white/50 uppercase">
      {label}
      <input
        ref={(el) => {
          fieldRefs.current[name] = el ?? undefined;
        }}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onBlur={(event) => onBlur(name, event)}
        onChange={(event) => onChange(name, event)}
        className={`border-b bg-transparent py-2 text-base font-normal text-white normal-case outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-ecom-orange ${
          error ? "border-red-400" : "border-white/30"
        }`}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.span
          key={message}
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="flex items-center gap-1.5 text-xs font-normal normal-case text-red-400"
        >
          <WarningIcon />
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function WarningIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.169 2.63-1.516 2.63H3.72c-1.347 0-2.189-1.463-1.515-2.63L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
