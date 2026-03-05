"use client";

import dynamic from "next/dynamic";
import type { GeoPoint } from "@/types";

interface LocationPickerProps {
  value?: GeoPoint;
  onChange: (location: GeoPoint) => void;
  disabled?: boolean;
}

const DynamicMap = dynamic<LocationPickerProps>(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-lg bg-muted animate-pulse flex items-center justify-center border text-sm text-muted-foreground">
      Loading map...
    </div>
  ),
});

export function LocationPicker({
  value,
  onChange,
  disabled,
}: LocationPickerProps) {
  return (
    <div className="space-y-2">
      <DynamicMap value={value} onChange={onChange} disabled={disabled} />

      {value ? (
        <p className="text-sm text-muted-foreground">
          📍 Selected: {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Select an address above or click on the map to set the property
          location
        </p>
      )}
    </div>
  );
}
