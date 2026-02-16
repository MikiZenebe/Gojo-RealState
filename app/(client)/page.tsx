import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, MapPin, Search } from "lucide-react";
import React from "react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent via-accent/50 to-background py-24 md:py-32 lg:py-40">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2  rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Perfect for First-Time Buyers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight mb-6">
              Find Your <span className="text-primary">Perfect Nest</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Making your first home journey simple and stress-free. Browse
              curated properties, save your favorites, and connect with trusted
              agents.
            </p>

            {/* Search Bar */}
            <form
              action="/properties"
              method="GET"
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="flex-1 relative">
                <label htmlFor="city-search" className="sr-only">
                  Search by city, neighborhood, or ZIP code
                </label>
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="city-search"
                  name="city"
                  placeholder="Enter city, neighborhood, or ZIP…"
                  autoComplete="address-level2"
                  className="h-14 pl-12 text-base"
                />
              </div>
              <Button type="submit" size={"lg"} className="h-14 cursor-pointer">
                <Search className="h-5 w-5" aria-hidden="true" />
                <span className="ml-2">Search Properties</span>
              </Button>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full bg-success"
                  aria-hidden="true"
                />
                <span>1,000+ Active Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>500+ Happy Homeowners</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full bg-secondary"
                  aria-hidden="true"
                />
                <span>50+ Trusted Agents</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
