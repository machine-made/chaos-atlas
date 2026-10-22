"use client";

import HenonMapVisualization from '@/components/visualizations/HenonMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function HenonMapPage() {
  return (
    <MapPageLayout
      title="Hénon Map"
      description="Discover the strange attractor"
    >
      <HenonMapVisualization />
    </MapPageLayout>
  );
}
