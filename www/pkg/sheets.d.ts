/* tslint:disable */
/* eslint-disable */
/**
*/
export class Sheet {
  free(): void;
/**
* @param {number} nrows
* @param {number} ncols
*/
  constructor(nrows: number, ncols: number);
/**
* @param {number} row
* @param {number} col
* @returns {string | undefined}
*/
  get(row: number, col: number): string | undefined;
/**
* @param {number} row
* @param {number} col
* @param {string} value
*/
  put(row: number, col: number, value: string): void;
/**
* @returns {number}
*/
  nrows(): number;
/**
* @returns {number}
*/
  ncols(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_sheet_free: (a: number) => void;
  readonly sheet_new: (a: number, b: number) => number;
  readonly sheet_get: (a: number, b: number, c: number, d: number) => void;
  readonly sheet_put: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly sheet_nrows: (a: number) => number;
  readonly sheet_ncols: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
