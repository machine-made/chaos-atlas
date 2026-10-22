"use client";

import TentMapVisualization from '@/components/visualizations/TentMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function TentMapPage() {
  return (
    <MapPageLayout
      title="Tent Map"
      description="Piecewise linear chaos with exact analytical solutions"
    >
      <TentMapVisualization />
    </MapPageLayout>
  );
}
