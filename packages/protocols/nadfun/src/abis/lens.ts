// GENERATED FILE — do not edit by hand.
//   regenerate offline from abis-src/:  pnpm gen:abis
//   re-vendor from upstream:            pnpm update:abis
// ABI origin: vendored (ADR 0007)
//   source:   https://github.com/Naddotfun/contract-v3-abi.git@35ca13bd26bb2a5418698b13ddcd07008eecc30a, ILens.json — verbatim in ../../abis-src/
//   URL:      https://github.com/Naddotfun/contract-v3-abi/blob/35ca13bd26bb2a5418698b13ddcd07008eecc30a/ILens.json
//   file:     sha256 679d4f19e46f7f74aad0ac99f5beb485298caea61b0125f3b1222d4b3e87fadd
//   vendored: 2026-07-25
//   verification: all Query methods are exercised live on Monad mainnet;
//   the direct Lens deployment is checked for bytecode and a zero ERC-1967
//   implementation slot. The vendored ABI is independently cross-checked
//   against Monadscan by `pnpm test:abi:online`.

export const NadFunLensAbi = [
  {
    "type": "function",
    "name": "availableBuyTokens",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "availableBuyToken",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "requiredMonAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAmountIn",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amountOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_isBuy",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [
      {
        "name": "router",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amountIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAmountOut",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_amountIn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_isBuy",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [
      {
        "name": "router",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amountOut",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getInitialBuyAmountOut",
    "inputs": [
      {
        "name": "_amountIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "amountOut",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProgress",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "progress",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isGraduated",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "isGraduated",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isLocked",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "isLocked",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  }
] as const;
