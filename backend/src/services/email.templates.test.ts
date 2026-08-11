import { describe, expect, test } from "bun:test";
import { buildConfirmationEmail, buildNotificationEmail } from "./email.templates";

const DANGEROUS_DATA = {
  name: '<script>alert("xss")</script>',
  email: "attacker@example.com",
  message: 'Hello & "welcome" <b>bold</b>',
};

describe("buildNotificationEmail", () => {
  test("escapes dangerous characters in name and message", () => {
    const { html } = buildNotificationEmail(DANGEROUS_DATA, "es");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&amp;");
    expect(html).toContain("&lt;b&gt;bold&lt;/b&gt;");
  });

  test("subject includes the sender's name", () => {
    const { subject } = buildNotificationEmail({ ...DANGEROUS_DATA, name: "Ana" }, "es");
    expect(subject).toBe("Nuevo contacto: Ana");
  });

  test("uses the requested language's labels", () => {
    const es = buildNotificationEmail(DANGEROUS_DATA, "es");
    const en = buildNotificationEmail(DANGEROUS_DATA, "en");
    expect(es.html).toContain("Nombre");
    expect(en.html).toContain("Name");
  });

  test("optional fields only render when present", () => {
    const withoutExtras = buildNotificationEmail(DANGEROUS_DATA, "es");
    expect(withoutExtras.html).not.toContain("Teléfono");
    const withPhone = buildNotificationEmail({ ...DANGEROUS_DATA, phone: "664 123 4567" }, "es");
    expect(withPhone.html).toContain("Teléfono");
    expect(withPhone.html).toContain("664 123 4567");
  });
});

describe("buildConfirmationEmail", () => {
  test("escapes the name in the title and the message body", () => {
    const { html } = buildConfirmationEmail(DANGEROUS_DATA, "es");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;bold&lt;/b&gt;");
  });

  test("subject is language-specific and constant", () => {
    expect(buildConfirmationEmail(DANGEROUS_DATA, "es").subject).toBe(
      "Recibimos tu mensaje — Ecommetrica",
    );
    expect(buildConfirmationEmail(DANGEROUS_DATA, "en").subject).toBe(
      "We received your message — Ecommetrica",
    );
  });
});
