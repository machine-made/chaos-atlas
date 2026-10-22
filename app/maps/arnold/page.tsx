"use client";

import ArnoldMapVisualization from '@/components/visualizations/ArnoldMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function ArnoldMapPage() {
  return (
    <MapPageLayout
      title="Arnold Cat Map"
      description="Area-preserving transformation with periodic behavior and Fibonacci connections"
    >
      <ArnoldMapVisualization />
    </MapPageLayout>
  );
}
