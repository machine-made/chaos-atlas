/**
 * @jest-environment node
 *
 * No file vendored under public/vendor may carry a path from the machine that
 * built it. rustc writes the absolute path of every source file into a
 * WebAssembly module (panic locations, debug info), so a module built in a
 * home folder publishes that folder name with the site. dynachaos remaps
 * those paths when it builds the module; this test reads the vendored files
 * themselves, so a module that arrives with a path fails CI here.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const VENDOR = join(__dirname, '../../public/vendor');

// The start of a user's home folder on Linux, macOS and Windows.
const MARKERS = ['/home/', '/Users/', 'C:\\Users', 'C:/Users'];

function filesUnder(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? filesUnder(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

function leaks(file: string): string[] {
  const text = readFileSync(file).toString('latin1');
  return MARKERS.filter((marker) => text.includes(marker));
}

describe('vendored files carry no local path', () => {
  const files = filesUnder(VENDOR);
  const wasm = files.filter((file) => file.endsWith('.wasm'));

  it('finds the vendored wasm module, so the scan cannot pass on an empty set', () => {
    expect(wasm.length).toBeGreaterThan(0);
  });

  it.each(files.map((file) => [file.slice(VENDOR.length + 1), file]))(
    '%s',
    (_name, file) => {
      expect(leaks(file)).toEqual([]);
    },
  );
});
