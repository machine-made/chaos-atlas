"use client";

import StandardMapVisualization from '@/components/visualizations/StandardMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function StandardMapPage() {
  return (
    <MapPageLayout
      title="Standard Map"
      description="Explore Hamiltonian chaos"
    >
      <StandardMapVisualization />
    </MapPageLayout>
  );
}
