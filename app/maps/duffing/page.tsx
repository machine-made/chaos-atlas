"use client";

import DuffingMapVisualization from '@/components/visualizations/DuffingMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function DuffingMapPage() {
  return (
    <MapPageLayout
      title="Duffing Map"
      description="Discretized double-well oscillator demonstrating bistable dynamics and chaos"
    >
      <DuffingMapVisualization />
    </MapPageLayout>
  );
}
