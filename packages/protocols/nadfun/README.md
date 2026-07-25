# @themoss/protocol-nadfun

Moss Query Adapter for the Nad.fun Lens contract on Monad mainnet.

The Lens is Nad.fun's unified read interface. It selects the appropriate
bonding-curve or post-graduation router and exposes token launch status.

## Supported Queries

### `quoteBuy`

Quotes an exact-input MON-to-token buy.

Inputs:

- `token`: Nad.fun token address.
- `amountIn`: MON input in wei as a positive integer string.

Returns:

- buy side;
- input amount;
- Lens-selected router;
- expected token output in base units.

### `quoteSell`

Quotes an exact-input token-to-MON sell.

Inputs:

- `token`: Nad.fun token address.
- `amountIn`: token input in base units as a positive integer string.

Returns:

- sell side;
- input amount;
- Lens-selected router;
- expected MON output in wei.

### `tokenStatus`

Returns:

- graduation state;
- lock state;
- bonding-curve progress in basis points.

Nad.fun documents `10000` progress basis points as `100%`.

## Fixed Contract

Monad mainnet Lens:

```text
0x7e78A8DE94f21804F7a17F4E8BF9EC2c872187ea
```

Canonical address source:

```text
Naddotfun/contract-v3-abi
commit 35ca13bd26bb2a5418698b13ddcd07008eecc30a
README.md
```

## ABI Provenance

The complete upstream `ILens.json` artifact is committed at:

```text
abis-src/ILens.json
```

Pinned SHA-256:

```text
679d4f19e46f7f74aad0ac99f5beb485298caea61b0125f3b1222d4b3e87fadd
```

Regenerate the TypeScript module with:

```bash
pnpm --filter @themoss/protocol-nadfun gen:abis
```

The ABI test proves that the generated module is deterministic and
contains all seven upstream functions.

## Safety and Scope

This v1 package is query-only.

It does not:

- sign transactions;
- send transactions;
- approve tokens;
- execute buys or sells;
- apply slippage protection;
- claim that a quote guarantees future execution.

Amounts are returned as JSON-safe decimal strings.

## Validation

Run from the repository root:

```bash
pnpm --filter @themoss/protocol-nadfun build
pnpm --filter @themoss/protocol-nadfun typecheck
pnpm --filter @themoss/protocol-nadfun test
pnpm exec biome check packages/protocols/nadfun
```

## Live Monad Mainnet Verification

The online suite checks:

- Monad mainnet chain ID `143`;
- deployed bytecode at the fixed Lens address;
- deployed bytecode for the sample Nad.fun token;
- a live `quoteBuy` query;
- a live `quoteSell` query using the buy output;
- a live `tokenStatus` query;
- deployed bytecode at both Lens-selected routers;
- JSON-safe Query results.

Run it separately from the offline suite:

```bash
pnpm --filter @themoss/protocol-nadfun test:online
```

Override the defaults without committing credentials or local values:

```bash
MONAD_RPC_URL=https://your-rpc.example \
NADFUN_SAMPLE_TOKEN=0xYourTokenAddress \
pnpm --filter @themoss/protocol-nadfun test:online
```

## ABI Maintenance

The ABI uses the ADR 0007 vendored tier.

Committed provenance inputs:

- `abis-src/ILens.json`: verbatim upstream ABI;
- `abis-src/VENDOR.json`: repository, full Git commit, file path, SHA-256, and vendoring date;
- `abis.json`: the fixed direct Monad mainnet deployment used for the Explorer cross-check.

Offline regeneration:

```bash
pnpm --filter @themoss/protocol-nadfun gen:abis
```

Network update from the current upstream `HEAD`:

```bash
pnpm --filter @themoss/protocol-nadfun update:abis
```

Reproduce a specific reviewed commit:

```bash
pnpm --filter @themoss/protocol-nadfun update:abis 35ca13bd26bb2a5418698b13ddcd07008eecc30a
```

The keyed Monadscan cross-check is separate from the normal offline suite:

```bash
MONADSCAN_API_KEY=your_local_key \
pnpm --filter @themoss/protocol-nadfun test:abi:online
```

Never commit or paste the API key into source files, test output, issues, or pull requests.
