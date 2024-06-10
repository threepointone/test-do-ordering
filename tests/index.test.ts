import { createExecutionContext, env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import worker from "../src";

import type { Env } from "../src";

declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {}
}

describe("Ordering test", () => {
  it("should call someMethod1 and someMethod2 before fetch", async () => {
    const ctx = createExecutionContext();
    const request = new Request("http://example.com/");
    const response = await worker.fetch(request, env, ctx);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("2");
  });
});
