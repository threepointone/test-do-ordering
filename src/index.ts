import { DurableObject } from "cloudflare:workers";

export interface Env {
  MyDO: DurableObjectNamespace<MyDO>;
}

export class MyDO extends DurableObject {
  testThis = 0;
  someMethod1() {
    console.log("calling someMethod1");
    this.testThis = 1;
  }
  someMethod2() {
    console.log("calling someMethod2");
    this.testThis = 2;
  }
  async fetch(request: Request): Promise<Response> {
    console.log("calling fetch");
    return new Response(this.testThis.toString());
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const docId = env.MyDO.idFromName("my-do");
    const stub = env.MyDO.get(docId);
    stub.someMethod1(); // note there's no await here
    stub.someMethod2(); // note there's no await here
    return stub.fetch(request);
  },
};
