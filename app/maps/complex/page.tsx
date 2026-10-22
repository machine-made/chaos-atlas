"use client";

import ComplexMapVisualization from '@/components/visualizations/ComplexMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function ComplexMapPage() {
  return (
    <MapPageLayout
      title="Complex Quadratic Map"
      description="Explore Julia sets and the Mandelbrot set in the complex plane"
    >
      <ComplexMapVisualization />
    </MapPageLayout>
  );
}
