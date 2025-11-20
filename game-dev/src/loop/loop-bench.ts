import { MainLoop } from "./loop.ts";


Deno.bench(
  name = "Bench loop",
  async () => {
    const mainloop = new MainLoop();
    await mainloop.init();
  },
);
