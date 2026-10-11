// src/lib/maps/tent.ts
export interface TentPoint {
  x: number;
  y: number;
}

/**
 * Calculate a single iteration of the tent map
 * Equation: x_{n+1} = min(α·x_n, α·(1-x_n))
 * @param x Current x value
 * @param alpha Parameter α (0 < α ≤ 2, default: 1.8)
 * @returns New x value after one iteration
 */
export function calculateTentIteration(
  x: number,
  alpha: number = 1.8
): number {
  if (x < 0.5) {
    return alpha * x;
  } else {
    return alpha * (1 - x);
  }
}

/**
 * Calculate the tent map for a given number of iterations
 * @param alpha Parameter α (0 < α ≤ 2, default: 1.8)
 * @param x0 Initial x value (default: 0.4)
 * @param iterations Number of iterations (default: 100)
 * @returns Array of x values representing the tent map trajectory
 */
export function calculateTentMap(
  alpha: number = 1.8,
  x0: number = 0.4,
  iterations: number = 100
): number[] {
  const points: number[] = [];
  let x = x0;

  for (let i = 0; i < iterations; i++) {
    points.push(x);
    x = calculateTentIteration(x, alpha);
  }

  return points;
}

/**
 * Calculate the tent map cobweb plot
 * @param alpha Parameter α (0 < α ≤ 2, default: 1.8)
 * @param x0 Initial x value (default: 0.4)
 * @param iterations Number of iterations (default: 50)
 * @returns Array of points representing the cobweb plot
 */
export function calculateTentCobweb(
  alpha: number = 1.8,
  x0: number = 0.4,
  iterations: number = 50
): TentPoint[] {
  const points: TentPoint[] = [];
  let x = x0;

  for (let i = 0; i < iterations; i++) {
    // Vertical line from (x, x) to (x, f(x))
    const y = calculateTentIteration(x, alpha);
    points.push({ x, y: x });  // Start point on diagonal
    points.push({ x, y });     // End point on tent map

    // Horizontal line from (x, f(x)) to (f(x), f(x))
    x = y;
    points.push({ x: y, y });  // Back to diagonal
  }

  return points;
}

/**
 * Calculate the tent map bifurcation diagram
 * @param alphaRange Range of α values to explore (default: 0.5 to 2.0)
 * @param alphaStep Step size for α values (default: 0.01)
 * @param x0 Initial x value (default: 0.4)
 * @param transient Transient iterations to discard (default: 500)
 * @param collect Number of iterations to collect (default: 50)
 * @returns Array of points representing the bifurcation diagram
 */
export function calculateTentBifurcation(
  alphaRange: { min: number; max: number } = { min: 0.5, max: 2.0 },
  alphaStep: number = 0.01,
  x0: number = 0.4,
  transient: number = 500,
  collect: number = 50
): TentPoint[] {
  const points: TentPoint[] = [];

  const steps = Math.max(1, Math.round((alphaRange.max - alphaRange.min) / alphaStep) + 1);
  for (let i = 0; i < steps; i++) {
    const alpha = steps === 1 ? alphaRange.min : alphaRange.min + (i * (alphaRange.max - alphaRange.min)) / (steps - 1);
    let x = x0;

    // Transient iterations
    for (let i = 0; i < transient; i++) {
      x = calculateTentIteration(x, alpha);
    }

    // Collect points
    for (let i = 0; i < collect; i++) {
      x = calculateTentIteration(x, alpha);
      points.push({ x: alpha, y: x });
    }
  }

  return points;
}

/**
 * Calculate the Lyapunov exponent for the tent map
 * @param alpha Parameter α (0 < α ≤ 2, default: 1.8)
 * @param x0 Initial x value (default: 0.4)
 * @param iterations Number of iterations (default: 1000)
 * @returns Lyapunov exponent value
 */
export function calculateTentLyapunovExponent(
  alpha: number = 1.8,
  x0: number = 0.4,
  iterations: number = 1000
): number {
  let x = x0;
  let sum = 0;

  for (let i = 0; i < iterations; i++) {
    // The derivative of the tent map is either α or -α
    const derivative = x < 0.5 ? alpha : -alpha;
    sum += Math.log(Math.abs(derivative));
    x = calculateTentIteration(x, alpha);
  }

  return sum / iterations;
}

/**
 * Generate symbolic dynamics sequence for the tent map
 * @param alpha Parameter α (0 < α ≤ 2, default: 1.8)
 * @param x0 Initial x value (default: 0.4)
 * @param iterations Number of iterations (default: 100)
 * @returns Array of symbols (L for left, R for right)
 */
export function calculateTentSymbolicDynamics(
  alpha: number = 1.8,
  x0: number = 0.4,
  iterations: number = 100
): string[] {
  const symbols: string[] = [];
  let x = x0;

  for (let i = 0; i < iterations; i++) {
    symbols.push(x < 0.5 ? 'L' : 'R');
    x = calculateTentIteration(x, alpha);
  }

  return symbols;
}

/**
 * Calculate the tent map invariant density
 * @param alpha Parameter α (0 < α ≤ 2, default: 1.8)
 * @param bins Number of bins for histogram (default: 100)
 * @param samples Number of samples to generate (default: 10000)
 * @returns Array of normalized densities
 */
export function calculateTentInvariantDensity(
  alpha: number = 1.8,
  bins: number = 100,
  samples: number = 10000
): { x: number; density: number }[] {
  const histogram = new Array(bins).fill(0);
  let x = 0.4; // Initial condition

  // Generate samples
  for (let i = 0; i < samples; i++) {
    const binIndex = Math.floor(x * bins);
    if (binIndex >= 0 && binIndex < bins) {
      histogram[binIndex]++;
    }
    x = calculateTentIteration(x, alpha);
  }

  // Normalize histogram
  const maxCount = Math.max(...histogram);
  return histogram.map((count, i) => ({
    x: i / bins,
    density: count / maxCount
  }));
}