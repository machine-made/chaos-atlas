"use client";

import IkedaMapVisualization from '@/components/visualizations/IkedaMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function IkedaMapPage() {
  return (
    <MapPageLayout
      title="Ikeda Map"
      description="Nonlinear optics model producing stunning spiral attractors from laser cavity dynamics"
    >
      <IkedaMapVisualization />
    </MapPageLayout>
  );
}
