/**
 * Check the parameter grids of the bifurcation and potential sweeps.
 *
 * A loop of the form `for (v = min; v <= max; v += step)` adds rounding
 * error at each step. For min = 0, max = 0.3, step = 0.1 the last value is
 * 0.30000000000000004, so the loop stops before max and the sweep loses its
 * last column. The sweeps compute each value from its index instead, so
 * both ends are always present and the count is exact.
 */
import { calculateLogisticBifurcation } from '@/lib/maps/logistic';
import { calculateTentBifurcation } from '@/lib/maps/tent';
import { calculateDuffingBifurcation, calculateDuffingPotential } from '@/lib/maps/duffing';
import { calculateIkedaBifurcation } from '@/lib/maps/ikeda';
import { calculateTinkerbellBifurcation } from '@/lib/maps/tinkerbell';

const distinct = (values: number[]) => [...new Set(values)].sort((a, b) => a - b);

function expectGrid(values: number[], min: number, max: number, count: number) {
  const grid = distinct(values);
  expect(grid).toHaveLength(count);
  expect(grid[0]).toBe(min);
  expect(grid[grid.length - 1]).toBe(max);
}

describe('sweep grids keep both ends', () => {
  const range = { min: 0, max: 0.3, step: 0.1 };

  it('tent: alpha from 0 to 0.3 in steps of 0.1 gives 4 values', () => {
    const points = calculateTentBifurcation({ min: 0, max: 0.3 }, 0.1, 0.4, 10, 5);
    expectGrid(points.map((p) => p.x), 0, 0.3, 4);
  });

  it('duffing: parameter a from 0 to 0.3 in steps of 0.1 gives 4 values', () => {
    const points = calculateDuffingBifurcation('a', range, { b: 0.2 }, 600);
    expectGrid(points.map((p) => p.paramValue), 0, 0.3, 4);
  });

  it('ikeda: parameter b from 0 to 0.3 in steps of 0.1 gives 4 values', () => {
    const points = calculateIkedaBifurcation('b', range, { a: 1, c: 0.4, d: 6 }, 600);
    expectGrid(points.map((p) => p.paramValue), 0, 0.3, 4);
  });

  it('tinkerbell: parameter a from 0 to 0.3 in steps of 0.1 gives 4 values', () => {
    const points = calculateTinkerbellBifurcation('a', range, { b: -0.6, c: 2, d: 0.5 }, 600);
    expectGrid(points.map((p) => p.paramValue), 0, 0.3, 4);
  });

  it('logistic: rSteps is the number of r values, both ends included', () => {
    const points = calculateLogisticBifurcation(3, 4, 5, 10, 5);
    expectGrid(points.map((p) => p.x), 3, 4, 5);
  });

  it('duffing potential: numPoints is the number of x values, both ends included', () => {
    const points = calculateDuffingPotential(1, { min: -2, max: 2 }, 5);
    expect(points).toHaveLength(5);
    expect(points[0].x).toBe(-2);
    expect(points[4].x).toBe(2);
  });
});
