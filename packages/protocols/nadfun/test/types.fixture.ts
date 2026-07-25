import {
  Address,
  type Handle,
  type InferParams,
  type ParamsSpec,
  type ProtocolRef,
  UnsignedIntegerString,
} from "@themoss/core";
import type { NadFunLensAbi } from "../src/abis/lens.js";
import type { NadFun } from "../src/adapter.js";

const TOKEN = "0xe85170a4303cBA6DD224628F5Aa052fb7FeB7777" as const;

const fixtureParams = {
  token: {
    type: Address,
    description: "Fixture token.",
  },
  amountIn: {
    type: UnsignedIntegerString,
    description: "Fixture base-unit amount.",
  },
} satisfies ParamsSpec;

const validParams: InferParams<typeof fixtureParams> = {
  token: TOKEN,
  amountIn: "42",
};

const invalidAmount: InferParams<typeof fixtureParams> = {
  token: TOKEN,
  // @ts-expect-error Amounts are inferred as strings, not numbers.
  amountIn: 42,
};

const dependency = null as unknown as ProtocolRef<NadFun>;

dependency.quoteBuy({
  token: TOKEN,
  amountIn: "1",
});

// @ts-expect-error Injected Protocol references expose methods, not Handles.
void dependency.lens;

function handleFixture(handle: Handle<typeof NadFunLensAbi>) {
  handle.read.getAmountOut([TOKEN, 1n, true]);

  handle.read.isGraduated([TOKEN]);
  handle.read.isLocked([TOKEN]);
  handle.read.getProgress([TOKEN]);

  // @ts-expect-error Lens has no unknownQuery function.
  handle.read.unknownQuery([TOKEN]);

  handle.read.getAmountOut([
    TOKEN,
    1n,
    // @ts-expect-error getAmountOut requires a boolean side flag.
    "true",
  ]);
}

void validParams;
void invalidAmount;
void handleFixture;
