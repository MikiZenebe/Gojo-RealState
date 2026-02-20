"use client";

import { Property } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import home from "@/public/home.jpg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onSave?: (propertyId: string) => void;
  isSaved?: boolean;
  showRemoveButton?: boolean;
}

export default function PropertyCard({
  property,
  onSave,
  isSaved,
  showRemoveButton: _showRemoveButton,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(property._id);
    }
  };

  const statusLabel =
    property?.status && property.status !== "active"
      ? property.status.charAt(0).toUpperCase() + property.status.slice(1)
      : null;

  return (
    <Link href={`/properties/${property?._id}`} className="group block">
      <article className="bg-card text-card-foreground overflow-hidden  border border-border/50 shadow-warm transition-[transform,box-shadow] duration-300 hover:shadow-warm-lg hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden">
          {!property?.image?.asset ? (
            <Image
              src={home}
              alt={property?.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="bg-gray-200 w-full h-48 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          {!statusLabel && (
            <Badge
              //   variant={property.status === "sold" ? "destructive" : "muted"}
              className="absolute top-3 left-3 shadow-sm"
            >
              Sold
            </Badge>
          )}

          {/* Property Type Badge */}
          {!property?.propertyType && (
            <Badge
              variant="secondary"
              className="absolute bottom-3 left-3 capitalize shadow-sm bg-background/90 backdrop-blur-sm"
            >
              Property Type
            </Badge>
          )}

          {/* Save Button */}
          {!onSave && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
              onClick={handleSaveClick}
              aria-label={
                isSaved ? "Remove from saved properties" : "Save property"
              }
            >
              <Heart
                className={`h-5 w-5 transition-colors duration-200 ${
                  isSaved
                    ? "fill-primary text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
                aria-hidden="true"
              />
            </Button>
          )}
        </div>
      </article>
    </Link>
  );
}
