/**
 * Keyed Monadscan cross-check for the vendored Nad.fun Lens ABI.
 *
 * This suite is intentionally separate from offline tests. A missing
 * MONADSCAN_API_KEY fails instead of skipping, so a configured CI workflow
 * cannot remain green without performing the independent cross-check.
 */
import { readFileSync } from "node:fs";
import { compareDeployedAbi, ERC1967_IMPLEMENTATION_SLOT, fetchAbi } from "@themoss/abi-tools";
import { type Address, createPublicClient, getAddress, http } from "viem";
import { describe, expect, it } from "vitest";
import { NadFunLensAbi } from "../src/abis/lens.js";
import { NADFUN_LENS_ADDRESS } from "../src/adapter.js";

interface AbiManifest {
  lens: {
    address: Address;
    deployment: "direct";
    allowedExplorerOnly: string[];
  };
}

const manifest = JSON.parse(
  readFileSync(new URL("../abis.json", import.meta.url), "utf8"),
) as AbiManifest;

const key = process.env.MONADSCAN_API_KEY;

const rpcUrl = process.env.MONAD_RPC_URL ?? "https://rpc.monad.xyz";

describe("Nad.fun Lens ABI explorer cross-check", () => {
  it("requires MONADSCAN_API_KEY", () => {
    expect(key, "MONADSCAN_API_KEY must be set for pnpm test:abi:online").toBeTruthy();
  });

  it("pins the direct Lens deployment used by the Adapter", () => {
    expect(getAddress(manifest.lens.address)).toBe(getAddress(NADFUN_LENS_ADDRESS));

    expect(manifest.lens.deployment).toBe("direct");
  });

  it("confirms deployed bytecode and no ERC-1967 implementation", {
    timeout: 60_000,
  }, async () => {
    const client = createPublicClient({
      transport: http(rpcUrl, {
        timeout: 30_000,
        retryCount: 2,
      }),
    });

    expect(await client.getChainId()).toBe(143);

    const [code, implementationSlot] = await Promise.all([
      client.getCode({
        address: manifest.lens.address,
      }),
      client.getStorageAt({
        address: manifest.lens.address,
        slot: ERC1967_IMPLEMENTATION_SLOT,
      }),
    ]);

    expect(code).toBeDefined();
    expect(code).not.toBe("0x");

    expect(implementationSlot === undefined || BigInt(implementationSlot) === 0n).toBe(true);
  });

  it("matches the explorer-verified direct Lens ABI", {
    timeout: 120_000,
  }, async () => {
    const explorerAbi = await fetchAbi(manifest.lens.address, key ?? "");

    const issues = compareDeployedAbi(NadFunLensAbi, explorerAbi, {
      allowedActualOnly: manifest.lens.allowedExplorerOnly,
    });

    expect(issues).toEqual([]);
  });
});
