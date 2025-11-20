import { assertThrows } from "@std/assert/throws";
import { assertEquals } from "@std/assert/equals";
import { assertIsError } from "@std/assert/is-error";
import { AssertionError } from "@std/assert/assertion-error";

export class SetupUtils {
  private config_name = "undefined";

  constructor(config_name = "undefined", config: object | undefined) {
    this.validate(config_name, config);
    this.config_name = config_name;
    Deno.env.set(config_name, JSON.stringify(config));
  }

  private validate(config_name: string, config?: object) {
    if (config_name === "undefined" || config === undefined) {
      throw new Error(
        "Try again, the config_name value is UNDEFINED or config is undefined",
      );
    }
  }

  public get_config() {
    const config = JSON.parse(Deno.env.get(this.config_name) as string);
    this.validate(this.config_name, config);
    return { ...config };
  }

  public clean() {
    Deno.env.delete(this.config_name);
  }
}

export const SetupTests = () => {
  const config = {
    name: "Test",
    is_test: true,
    is_bench: true,
  };

  Deno.test({
    name: "Inicialize SetupUtils",
    fn: () => {
      const _setup_utils = new SetupUtils(config.name, config);
    },
  });

  Deno.test({
    name:
      "validate function should throw an error when config_name is undefined",
    fn: () => {
      assertThrows(() => new SetupUtils(undefined, config));
    },
  });

  Deno.test({
    name:
      "validate function should throw an error when config object is undefined",
    fn: () => {
      assertThrows(() => new SetupUtils(config.name, undefined));
    },
  });

  Deno.test({
    name: "Should get config correctly",
    fn: () => {
      const setup_utils = new SetupUtils(config.name, config);
      const setupUtilsConfig = setup_utils.get_config();
      assertEquals(config.name, setupUtilsConfig.name);
      // assertEquals(config, setupUtilsConfig);
    },
  });

  Deno.test({
    name: "Should get config with error",
    fn: () => {
      const setup_utils = new SetupUtils("Maoe", config);
      const setupUtilsConfig = setup_utils.get_config();
      assertThrows(() => assertEquals(setupUtilsConfig.name, "oi"));
      // assertEquals(config, setupUtilsConfig);
    },
  });
};
