"use client";

import LogisticMapVisualization from '@/components/visualizations/LogisticMapVisualization';
import MapPageLayout from '@/components/ui/MapPageLayout';

export default function LogisticMapPage() {
  return (
    <MapPageLayout
      title="Logistic Map"
      description="Explore the period-doubling route to chaos"
    >
      <LogisticMapVisualization />
    </MapPageLayout>
  );
}
