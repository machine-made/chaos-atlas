"use client";

import TinkerbellMapVisualization from '@/components/visualizations/TinkerbellMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function TinkerbellMapPage() {
  return (
    <MapPageLayout
      title="Tinkerbell Map"
      description="Complex polynomial dynamics with multi-loop attractors and bistable behavior"
    >
      <TinkerbellMapVisualization />
    </MapPageLayout>
  );
}
