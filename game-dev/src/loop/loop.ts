function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//*
class MainLoop {
  // running_statuses possible states:
  // 0 not-running
  // 1 running
  // 2 slowed
  // 3 waiting
  // 4 break
  // 5 error
  // 6 exit
  // defaults to 0
  // */
  running_statuses = 0;
  start_at = new Date();
  end_at: Date | null | undefined;
  cycles: [] | undefined;
  constructor() {
    this.running_statuses = 1;
  }
  init = async () => {
    console.time("start main");
    await this.loop();
    console.timeEnd("start main");
  };
  end_process = () => {
    this.end_at = new Date();
    this.running_statuses = 6;
  };
  log = (cycle: number) => {
    console.log(`log in cycle ${cycle} `);
    console.log(`running_statuses ${this.running_statuses} \n`);
    console.log(`start_at ${this.start_at} \n`);
    if (this.running_statuses === 5 || this.running_statuses === 6) {
      console.log(`end_at ${this.end_at} \n`);
    }
  };
  loop = async (loop_cyle: number = 0) => {
    const stop_main_loop = await new Promise(
      async (resolve, _) => {
        this.log(loop_cyle);
        resolve(true);
      },
    ).catch((reason) => {
      console.log(JSON.stringify(reason));
      this.end_process();
      return false;
    });

    if (stop_main_loop) {
      await this.loop(loop_cyle + 1);
    } else {
      await sleep(2000);
      return;
    }
  };
}

export { MainLoop };

Deno.bench("main loop profiling", async () => {
  const main_loop: MainLoop = new MainLoop();
  await main_loop.init();
});
