import { auth } from "@clerk/nextjs/server";
import { Heart, Link } from "lucide-react";
import { redirect } from "next/navigation";
import PropertyGrid from "@/components/property/PropertyGrid";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { USER_SAVED_LISTINGS_QUERY } from "@/lib/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function SavedListingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { data: savedProperties } = await sanityFetch({
    query: USER_SAVED_LISTINGS_QUERY,
    params: { clerkId: userId },
  });

  return (
    <div className="container py-16 mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Saved Listings</h1>
      </div>

      {savedProperties && savedProperties.length > 0 ? (
        <PropertyGrid properties={savedProperties} showRemoveButton />
      ) : (
        <EmptyState
          icon={Heart}
          title="No saved listings yet"
          description="Start browsing properties and save your favorites here."
          action={
            <Button asChild className="w-1/2 mx-auto">
              <Link href="/properties">Browse Properties</Link>
            </Button>
          }
          className="bg-muted"
        />
      )}
    </div>
  );
}
