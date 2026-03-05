"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { GeoPoint } from "@/types";

const customIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div class="-ml-[16px] -mt-[32px]"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary fill-primary stroke-white drop-shadow-lg"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="white"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [0, 0], // The offset is handled by the div container class inside HTML string
});

function MapController({
  value,
  onChange,
  disabled,
}: {
  value?: GeoPoint;
  onChange: (location: GeoPoint) => void;
  disabled?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (value) {
      map.flyTo([value.lat, value.lng], 15);
    }
  }, [value, map]);

  useMapEvents({
    click(e) {
      if (disabled) return;
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, Math.max(map.getZoom(), 14));
    },
  });

  return null;
}

interface MapProps {
  value?: GeoPoint;
  onChange: (location: GeoPoint) => void;
  disabled?: boolean;
}

export default function LeafletMap({ value, onChange, disabled }: MapProps) {
  const defaultCenter = { lat: 39.8283, lng: -98.5795 };
  const center = value
    ? [value.lat, value.lng]
    : [defaultCenter.lat, defaultCenter.lng];
  const zoom = value ? 14 : 4;

  return (
    <div
      className={`relative h-[300px] w-full rounded-lg overflow-hidden border ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <MapContainer
        center={center as L.LatLngExpression}
        zoom={zoom}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {value && (
          <Marker position={[value.lat, value.lng]} icon={customIcon} />
        )}
        <MapController value={value} onChange={onChange} disabled={disabled} />
      </MapContainer>
    </div>
  );
}
