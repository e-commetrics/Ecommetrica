import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { Request, Response } from "express";
import type { ContactPayload } from "../services/email.service";

const sendContactEmailMock = mock((_payload: ContactPayload) => Promise.resolve());

mock.module("../services/email.service", () => ({
  sendContactEmail: sendContactEmailMock,
}));

const { submitContact } = await import("./contact.controller");

function makeRes() {
  const res = {} as Response & { statusCode?: number; body?: unknown };
  res.status = mock((code: number) => {
    res.statusCode = code;
    return res;
  }) as Response["status"];
  res.json = mock((body: unknown) => {
    res.body = body;
    return res;
  }) as Response["json"];
  return res;
}

function makeReq(body: Record<string, unknown>) {
  return { body } as Request;
}

const VALID_BODY = {
  name: "Ana",
  email: "ana@example.com",
  message: "Quisiera cotizar una página web nueva.",
};

beforeEach(() => {
  sendContactEmailMock.mockClear();
});

describe("submitContact", () => {
  test("400s on a missing name, without calling sendContactEmail", async () => {
    const req = makeReq({ email: "ana@example.com", message: VALID_BODY.message });
    const res = makeRes();
    await submitContact(req, res);
    expect(res.statusCode).toBe(400);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  test("400s on an invalid email", async () => {
    const req = makeReq({ ...VALID_BODY, email: "not-an-email" });
    const res = makeRes();
    await submitContact(req, res);
    expect(res.statusCode).toBe(400);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  test("400s on an empty message", async () => {
    const req = makeReq({ ...VALID_BODY, message: "   " });
    const res = makeRes();
    await submitContact(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("200s on a valid payload and forwards it to sendContactEmail", async () => {
    const req = makeReq({ ...VALID_BODY, phone: "664 123 4567", company: "Acme", lang: "en" });
    const res = makeRes();
    await submitContact(req, res);

    expect(res.statusCode).toBe(200);
    expect(sendContactEmailMock).toHaveBeenCalledTimes(1);
    expect(sendContactEmailMock.mock.calls[0]?.[0]).toMatchObject({
      name: "Ana",
      email: "ana@example.com",
      phone: "664 123 4567",
      company: "Acme",
      lang: "en",
    });
  });

  test("defaults lang to 'es' when not 'en'", async () => {
    const req = makeReq({ ...VALID_BODY, lang: "fr" });
    const res = makeRes();
    await submitContact(req, res);
    expect(sendContactEmailMock.mock.calls[0]?.[0]).toMatchObject({ lang: "es" });
  });

  test("502s when sendContactEmail throws", async () => {
    sendContactEmailMock.mockImplementationOnce(async () => {
      throw new Error("SMTP down");
    });
    const req = makeReq(VALID_BODY);
    const res = makeRes();
    await submitContact(req, res);
    expect(res.statusCode).toBe(502);
  });
});
