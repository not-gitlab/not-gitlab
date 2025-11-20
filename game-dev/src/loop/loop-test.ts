import { MainLoop } from "./loop.ts";

export const MainLooptest = () => {
  Deno.test(
    name = "Test loop",
    async () => {
      const mainloop = new MainLoop();
      await mainloop.init();
    },
  );
};
