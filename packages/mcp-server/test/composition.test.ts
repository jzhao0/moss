import { describe, expect, it } from "vitest";
import { defaultProtocolModules } from "../src/composition.js";

describe("default MCP Protocol composition", () => {
  it("includes the Nad.fun Protocol module", () => {
    const nadfunModule = defaultProtocolModules.find((module) => "NadFun" in module);

    expect(nadfunModule).toBeDefined();
  });
});
