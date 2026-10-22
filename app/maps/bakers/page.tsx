"use client";

import BakersMapVisualization from '@/components/visualizations/BakersMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function BakersMapPage() {
  return (
    <MapPageLayout
      title="Baker's Map"
      description="Demonstrating stretching, folding, and mixing mechanisms in chaotic dynamics"
    >
      <BakersMapVisualization />
    </MapPageLayout>
  );
}
