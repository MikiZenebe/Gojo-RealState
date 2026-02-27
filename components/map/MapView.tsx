"use client";

import L from "leaflet";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import type { Property } from "@/types";

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapViewProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  className?: string;
}

// Helper component to recenter map
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 10);
  }, [lat, lng, map]);
  return null;
}

export function MapView({
  properties,
  onPropertyClick,
  className,
}: MapViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const validProperties = properties.filter(
    (p) => p.location?.lat && p.location?.lng,
  );

  const defaultCenter: [number, number] =
    validProperties.length > 0
      ? [validProperties[0].location!.lat, validProperties[0].location!.lng]
      : [39.8283, -98.5795]; // fallback

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={className ?? "w-full h-full"}>
      <MapContainer
        center={defaultCenter}
        zoom={validProperties.length > 0 ? 10 : 4}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom
      >
        {/* Free OpenStreetMap tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validProperties.map((property) => (
          <Marker
            key={property._id}
            position={[property.location!.lat, property.location!.lng]}
            eventHandlers={{
              click: () => {
                setSelectedProperty(property);
                onPropertyClick?.(property);
              },
            }}
          >
            <Popup>
              <Link
                href={`/properties/${property._id}`}
                className="block min-w-[200px]"
              >
                {/* Image */}
                {property?.image?.asset?.url && (
                  <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <Image
                      src={property.image.asset.url}
                      alt={property.title}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-sm">{property.title}</h3>
                <div>
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(property.price)}
                  </p>
                </div>
                <div className="flex gap-2 text-xs mt-1">
                  <span>{property.bedrooms} beds</span>
                  <span>•</span>
                  <span>{property.bathrooms} baths</span>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}

        {validProperties.length > 0 && (
          <RecenterMap lat={defaultCenter[0]} lng={defaultCenter[1]} />
        )}
      </MapContainer>
    </div>
  );
}
