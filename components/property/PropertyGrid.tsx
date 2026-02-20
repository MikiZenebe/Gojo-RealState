import React from "react";
import type { Property } from "@/types";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  onSave?: (propertyId: string) => void;
  savedIds?: string[];
  showRemoveButton?: boolean;
}

const sampleProperties: Property[] = [
  {
    _id: "1",
    title: "Modern Apartment in Downtown",
    price: 2500,
    status: "active",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    image: {
      asset: {
        _id: "image-1",
        url: "",
        metadata: {
          lqip: "",
          dimensions: { width: 0, height: 0 },
        },
      }, // placeholder asset object
      alt: "",
    },
    address: {
      city: "Anytown",
      state: "CA",
      street: "123 Main St",
      zipCode: "12345",
    },
    slug: "",
    createdAt: "",
  },
];

export default function PropertyGrid({
  properties,
  onSave,
  savedIds,
  showRemoveButton,
}: PropertyGridProps) {
  if (properties.length > 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleProperties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          onSave={onSave}
          isSaved={savedIds?.includes(property._id)}
          showRemoveButton={showRemoveButton}
        />
      ))}
    </div>
  );
}
