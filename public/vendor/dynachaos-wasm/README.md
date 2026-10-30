# @openfluids/dynachaos-wasm

The dynachaos compute kernels compiled to WebAssembly: the same Rust code
the published figures ran on, wrapped by wasm-bindgen for the browser. This
package is what chaos-atlas copies into `vendor/dynachaos-wasm`. See
`docs/wasm-vendoring.md` in the source repository for the recipe.

## Provenance

- Source: openfluids/dynachaos commit `654eb53a641fc18ca13681119b62e4369e59589d`
- Built: 2026-10-28 11:32:55 UTC
- wasm-bindgen: 0.2.129
- Target: `wasm32-unknown-unknown`, `--target web` with TypeScript declarations

## Contents

- `dynachaos_wasm.js` — the ES-module glue. Initialise it with `initSync`
  and the `.wasm` bytes (or the default async init) before calling any
  export.
- `dynachaos_wasm_bg.wasm` — the compiled kernels.
- `dynachaos_wasm.d.ts`, `dynachaos_wasm_bg.wasm.d.ts` — TypeScript
  declarations.
- `LICENSE` — Apache-2.0, copied unchanged from the source repository.

Every export clamps its inputs and returns one flat `Float64Array`. The
layout of each result is documented on the export in
`rust/wasm/src/lib.rs` of the source commit, and the contract is described
in `docs/wasm-architecture.md`.
