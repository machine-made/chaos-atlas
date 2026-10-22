// src/lib/maps/cml.ts
export interface CMLPoint {
  position: number;
  value: number;
}

/**
 * Calculate a single iteration of a diffusively coupled map lattice
 * @param lattice Current state of the lattice
 * @param r Parameter r for the logistic map (default: 3.9)
 * @param epsilon Coupling strength (default: 0.4)
 * @returns New lattice state after one iteration
 */
export function calculateDiffusiveCMLIteration(
  lattice: number[],
  r: number = 3.9,
  epsilon: number = 0.4
): number[] {
  const n = lattice.length;
  const newLattice = new Array(n);
  
  // Apply the logistic map and coupling
  for (let i = 0; i < n; i++) {
    const left = (i - 1 + n) % n; // Periodic boundary conditions
    const right = (i + 1) % n;
    
    // Logistic map function
    const f = (x: number) => r * x * (1 - x);
    
    // Diffusive coupling
    newLattice[i] = (1 - epsilon) * f(lattice[i]) + 
                    (epsilon / 2) * (f(lattice[left]) + f(lattice[right]));
    
    // Ensure values stay in [0, 1]
    newLattice[i] = Math.max(0, Math.min(1, newLattice[i]));
  }
  
  return newLattice;
}

/**
 * Calculate a diffusively coupled map lattice for a given number of time steps
 * @param r Parameter r for the logistic map (default: 3.9)
 * @param epsilon Coupling strength (default: 0.4)
 * @param latticeSize Size of the lattice (default: 100)
 * @param timeSteps Number of time steps (default: 100)
 * @returns 2D array representing the CML evolution (timeSteps x latticeSize)
 */
export function calculateDiffusiveCML(
  r: number = 3.9,
  epsilon: number = 0.4,
  latticeSize: number = 100,
  timeSteps: number = 100
): number[][] {
  // Initialize lattice with random values
  let lattice = Array.from({ length: latticeSize }, () => Math.random());
  
  // Initialize result array
  const result: number[][] = [lattice.slice()];
  
  // Evolve the CML
  for (let t = 1; t < timeSteps; t++) {
    lattice = calculateDiffusiveCMLIteration(lattice, r, epsilon);
    result.push(lattice.slice());
  }
  
  return result;
}

/**
 * Calculate a single iteration of a globally coupled map lattice
 * @param lattice Current state of the lattice
 * @param r Parameter r for the logistic map (default: 3.9)
 * @param epsilon Coupling strength (default: 0.4)
 * @returns New lattice state after one iteration
 */
export function calculateGlobalCMLIteration(
  lattice: number[],
  r: number = 3.9,
  epsilon: number = 0.4
): number[] {
  const n = lattice.length;
  const newLattice = new Array(n);
  
  // Calculate the mean field
  const f = (x: number) => r * x * (1 - x);
  const meanField = lattice.reduce((sum, x) => sum + f(x), 0) / n;
  
  // Apply the logistic map and coupling
  for (let i = 0; i < n; i++) {
    newLattice[i] = (1 - epsilon) * f(lattice[i]) + epsilon * meanField;
    
    // Ensure values stay in [0, 1]
    newLattice[i] = Math.max(0, Math.min(1, newLattice[i]));
  }
  
  return newLattice;
}

/**
 * Calculate a globally coupled map lattice for a given number of time steps
 * @param r Parameter r for the logistic map (default: 3.9)
 * @param epsilon Coupling strength (default: 0.4)
 * @param latticeSize Size of the lattice (default: 100)
 * @param timeSteps Number of time steps (default: 100)
 * @returns 2D array representing the CML evolution (timeSteps x latticeSize)
 */
export function calculateGlobalCML(
  r: number = 3.9,
  epsilon: number = 0.4,
  latticeSize: number = 100,
  timeSteps: number = 100
): number[][] {
  // Initialize lattice with random values
  let lattice = Array.from({ length: latticeSize }, () => Math.random());
  
  // Initialize result array
  const result: number[][] = [lattice.slice()];
  
  // Evolve the CML
  for (let t = 1; t < timeSteps; t++) {
    lattice = calculateGlobalCMLIteration(lattice, r, epsilon);
    result.push(lattice.slice());
  }
  
  return result;
}

/**
 * Calculate a single iteration of a directionally coupled map lattice
 * @param lattice Current state of the lattice
 * @param r Parameter r for the logistic map (default: 3.9)
 * @param epsilon Coupling strength (default: 0.4)
 * @returns New lattice state after one iteration
 */
export function calculateDirectionalCMLIteration(
  lattice: number[],
  r: number = 3.9,
  epsilon: number = 0.4
): number[] {
  const n = lattice.length;
  const newLattice = new Array(n);
  
  // Apply the logistic map and coupling
  for (let i = 0; i < n; i++) {
    const left = (i - 1 + n) % n; // Couple to the left (upstream) neighbor per Kaneko open-flow convention
    
    // Logistic map function
    const f = (x: number) => r * x * (1 - x);
    
    // Directional coupling
    newLattice[i] = (1 - epsilon) * f(lattice[i]) + epsilon * f(lattice[left]);
    
    // Ensure values stay in [0, 1]
    newLattice[i] = Math.max(0, Math.min(1, newLattice[i]));
  }
  
  return newLattice;
}

/**
 * Calculate a directionally coupled map lattice for a given number of time steps
 * @param r Parameter r for the logistic map (default: 3.9)
 * @param epsilon Coupling strength (default: 0.4)
 * @param latticeSize Size of the lattice (default: 100)
 * @param timeSteps Number of time steps (default: 100)
 * @returns 2D array representing the CML evolution (timeSteps x latticeSize)
 */
export function calculateDirectionalCML(
  r: number = 3.9,
  epsilon: number = 0.4,
  latticeSize: number = 100,
  timeSteps: number = 100
): number[][] {
  // Initialize lattice with random values
  let lattice = Array.from({ length: latticeSize }, () => Math.random());
  
  // Initialize result array
  const result: number[][] = [lattice.slice()];
  
  // Evolve the CML
  for (let t = 1; t < timeSteps; t++) {
    lattice = calculateDirectionalCMLIteration(lattice, r, epsilon);
    result.push(lattice.slice());
  }
  
  return result;
}

/**
 * Calculate the spatial power spectrum of a lattice state
 * @param lattice Current state of the lattice
 * @returns Array of power spectrum values
 */
export function calculateSpatialPowerSpectrum(lattice: number[]): number[] {
  const n = lattice.length;
  const spectrum = new Array(Math.floor(n / 2));
  
  // Simple implementation using discrete Fourier transform
  for (let k = 0; k < Math.floor(n / 2); k++) {
    let real = 0;
    let imag = 0;
    
    for (let j = 0; j < n; j++) {
      const angle = 2 * Math.PI * k * j / n;
      real += lattice[j] * Math.cos(angle);
      imag += lattice[j] * Math.sin(angle);
    }
    
    spectrum[k] = (real * real + imag * imag) / n;
  }
  
  return spectrum;
}
