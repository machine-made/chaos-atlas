import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/themes', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
  NeonButton: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => <button {...props}>{children}</button>,
}));

import MapPageLayout from '@/components/ui/MapPageLayout';
import LogisticMapPage from '@/app/maps/logistic/page';
import HenonMapPage from '@/app/maps/henon/page';
import StandardMapPage from '@/app/maps/standard/page';
import TentMapPage from '@/app/maps/tent/page';
import BakersMapPage from '@/app/maps/bakers/page';
import ArnoldMapPage from '@/app/maps/arnold/page';
import IkedaMapPage from '@/app/maps/ikeda/page';
import TinkerbellMapPage from '@/app/maps/tinkerbell/page';
import DuffingMapPage from '@/app/maps/duffing/page';
import ComplexMapPage from '@/app/maps/complex/page';

jest.mock('@/components/visualizations/LogisticMapVisualization', () => () => (
  <div>Mock Logistic Visualization</div>
));
jest.mock('@/components/visualizations/HenonMapVisualization', () => () => (
  <div>Mock Hénon Visualization</div>
));
jest.mock('@/components/visualizations/StandardMapVisualization', () => () => (
  <div>Mock Standard Visualization</div>
));
jest.mock('@/components/visualizations/TentMapVisualization', () => () => (
  <div>Mock Tent Visualization</div>
));
jest.mock('@/components/visualizations/BakersMapVisualization', () => () => (
  <div>Mock Baker&apos;s Visualization</div>
));
jest.mock('@/components/visualizations/ArnoldMapVisualization', () => () => (
  <div>Mock Arnold Visualization</div>
));
jest.mock('@/components/visualizations/IkedaMapVisualization', () => () => (
  <div>Mock Ikeda Visualization</div>
));
jest.mock('@/components/visualizations/TinkerbellMapVisualization', () => () => (
  <div>Mock Tinkerbell Visualization</div>
));
jest.mock('@/components/visualizations/DuffingMapVisualization', () => () => (
  <div>Mock Duffing Visualization</div>
));
jest.mock('@/components/visualizations/ComplexMapVisualization', () => () => (
  <div>Mock Complex Visualization</div>
));

describe('MapPageLayout', () => {
  it('renders common layout structure', () => {
    render(
      <MapPageLayout
        title="Sample Map"
        description="Sample map description"
      >
        <div>Visualization slot</div>
      </MapPageLayout>
    );

    expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sample Map' })).toBeInTheDocument();
    expect(screen.getByText('Sample map description')).toBeInTheDocument();
    expect(screen.getByText('Visualization slot')).toBeInTheDocument();
  });
});

type MapPageModule = {
  name: string;
  description: string;
  Component: React.ComponentType;
};

const mapPages: MapPageModule[] = [
  {
    name: 'Logistic Map',
    description: 'Explore the period-doubling route to chaos',
    Component: LogisticMapPage,
  },
  {
    name: 'Hénon Map',
    description: 'Discover the strange attractor',
    Component: HenonMapPage,
  },
  {
    name: 'Standard Map',
    description: 'Explore Hamiltonian chaos',
    Component: StandardMapPage,
  },
  {
    name: 'Tent Map',
    description: 'Piecewise linear chaos with exact analytical solutions',
    Component: TentMapPage,
  },
  {
    name: "Baker's Map",
    description: 'Demonstrating stretching, folding, and mixing mechanisms in chaotic dynamics',
    Component: BakersMapPage,
  },
  {
    name: 'Arnold Cat Map',
    description: 'Area-preserving transformation with periodic behavior and Fibonacci connections',
    Component: ArnoldMapPage,
  },
  {
    name: 'Ikeda Map',
    description: 'Nonlinear optics model producing stunning spiral attractors from laser cavity dynamics',
    Component: IkedaMapPage,
  },
  {
    name: 'Tinkerbell Map',
    description: 'Complex polynomial dynamics with multi-loop attractors and bistable behavior',
    Component: TinkerbellMapPage,
  },
  {
    name: 'Duffing Map',
    description: 'Discretized double-well oscillator demonstrating bistable dynamics and chaos',
    Component: DuffingMapPage,
  },
  {
    name: 'Complex Quadratic Map',
    description: 'Explore Julia sets and the Mandelbrot set in the complex plane',
    Component: ComplexMapPage,
  },
];

describe('Map pages shared shell smoke checks', () => {
  it.each(mapPages)('$name page renders shared shell and content', ({ name, description, Component }) => {
    render(<Component />);

    expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
  });
});
