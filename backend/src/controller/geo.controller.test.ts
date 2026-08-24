import { describe, expect, test } from "bun:test";
import type { Request, Response } from "express";
import { getGeo } from "./geo.controller";

function makeRes() {
  const res = {} as Response & { statusCode?: number; body?: unknown };
  res.status = ((code: number) => {
    res.statusCode = code;
    return res;
  }) as Response["status"];
  res.json = ((body: unknown) => {
    res.body = body;
    return res;
  }) as Response["json"];
  return res;
}

function makeReq(ip: string) {
  return { ip } as Request;
}

describe("getGeo", () => {
  test("200s with the region resolved from a known US IP", () => {
    const req = makeReq("8.8.8.8");
    const res = makeRes();

    getGeo(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ region: "us" });
  });

  test("strips the ::ffff: IPv4-mapped prefix before resolving", () => {
    const req = makeReq("::ffff:187.190.138.215");
    const res = makeRes();

    getGeo(req, res);

    expect(res.body).toEqual({ region: "mx" });
  });
});
