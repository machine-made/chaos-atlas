// Wrapper functions to standardize map function signatures for comparative analysis

import { calculateLogisticMap } from './logistic';
import { calculateHenonMap } from './henon';
import { calculateStandardMap } from './standard';
import { calculateTentMap } from './tent';
import { calculateBakersMap } from './bakers';
import { calculateArnoldMap } from './arnold';
import { calculateIkedaMap } from './ikeda';
import { calculateTinkerbellMap } from './tinkerbell';
import { calculateDuffingMap } from './duffing';

export type ComparativeMapPoint = number | { x: number; y: number };
export type ComparativeMapSeries = ComparativeMapPoint[];
export type ComparativeMapParams = Record<string, number>;

const getParam = (params: ComparativeMapParams, key: string, fallback: number): number => {
  const value = params[key];
  return Number.isFinite(value) ? value : fallback;
};

// Standard wrapper function for maps that already match the expected signature
export const calculateLogisticMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateLogisticMap(
    getParam(params, 'r', 3.8),
    getParam(params, 'x0', 0.5),
    iterations
  );
};

export const calculateHenonMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateHenonMap(
    getParam(params, 'a', 1.4),
    getParam(params, 'b', 0.3),
    getParam(params, 'x0', 0.1),
    getParam(params, 'y0', 0.1),
    iterations
  );
};

export const calculateStandardMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateStandardMap(
    getParam(params, 'K', 1.0),
    getParam(params, 'theta0', 0.1),
    getParam(params, 'p0', 0.1),
    iterations
  ).map(([x, y]) => ({ x, y }));
};

export const calculateTentMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateTentMap(
    getParam(params, 'alpha', 1.2),
    getParam(params, 'x0', 0.5),
    iterations
  );
};

export const calculateBakersMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateBakersMap(
    { x: getParam(params, 'x0', 0.1), y: getParam(params, 'y0', 0.1) },
    iterations
  );
};

export const calculateArnoldMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateArnoldMap(
    { x: getParam(params, 'x0', 0.1), y: getParam(params, 'y0', 0.1) },
    iterations
  );
};

export const calculateIkedaMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateIkedaMap(
    { x: getParam(params, 'x0', 0.1), y: getParam(params, 'y0', 0.1) },
    {
      a: getParam(params, 'a', 0.9),
      b: getParam(params, 'b', 0.9),
      c: getParam(params, 'c', 0.4),
      d: getParam(params, 'd', 6.0)
    },
    iterations
  );
};

export const calculateTinkerbellMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateTinkerbellMap(
    { x: getParam(params, 'x0', 0.1), y: getParam(params, 'y0', 0.1) },
    {
      a: getParam(params, 'a', 0.9),
      b: getParam(params, 'b', -0.6),
      c: getParam(params, 'c', 2.0),
      d: getParam(params, 'd', 0.5)
    },
    iterations
  );
};

export const calculateDuffingMapWrapper = (
  params: ComparativeMapParams,
  iterations: number
): ComparativeMapSeries => {
  return calculateDuffingMap(
    { x: getParam(params, 'x0', 0.1), y: getParam(params, 'y0', 0.1) },
    { a: getParam(params, 'a', 2.75), b: getParam(params, 'b', 0.2) },
    iterations
  );
};
