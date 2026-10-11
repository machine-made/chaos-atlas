/**
 * Check the coupling direction of the directional (one-way) CML.
 *
 * Kaneko's open-flow lattice couples each site to its upstream (left)
 * neighbour: x_{n+1}(i) = (1 - eps) f(x_n(i)) + eps f(x_n(i - 1)).
 * python/src/chaos_atlas/cml.py writes the same rule as np.roll(f, 1).
 * A perturbation on one site must therefore move downstream (to i + 1),
 * never upstream.
 */
import { calculateDirectionalCMLIteration } from '@/lib/maps/cml';

const f = (r: number, x: number) => r * x * (1 - x);

describe('directional CML coupling', () => {
  it('moves a single-site perturbation downstream, to the right', () => {
    const lattice = [0, 0, 0, 0.5, 0, 0, 0, 0];
    const next = calculateDirectionalCMLIteration(lattice, 3.9, 0.4);
    expect(next[4]).toBeCloseTo(0.4 * f(3.9, 0.5), 12);
    expect(next[2]).toBe(0);
  });

  it('matches the upstream rule on every site, with the periodic wrap at i = 0', () => {
    const r = 3.7;
    const eps = 0.3;
    const lattice = [0.11, 0.52, 0.93, 0.27, 0.64, 0.05, 0.78];
    const n = lattice.length;
    const next = calculateDirectionalCMLIteration(lattice, r, eps);
    for (let i = 0; i < n; i++) {
      const upstream = lattice[(i - 1 + n) % n];
      const expected = (1 - eps) * f(r, lattice[i]) + eps * f(r, upstream);
      expect(next[i]).toBeCloseTo(expected, 12);
    }
  });
});
