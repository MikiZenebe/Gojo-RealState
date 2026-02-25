import { defineQuery } from "next-sanity";

// Image fragment for reuse
const imageFragment = /* groq */ `
asset->{
    id,
    url,
    metadata{lqip,dimensions}
},alt`;

// Featured listings for homepage
export const FEATURED_PROPERTIES_QUERY = defineQuery(/* groq */ `
  *[_type == "property" && featured == true && status == "active"][0...6] {
    _id,
    title,
    "slug": slug.current,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    address,
    "image": images[0] { ${imageFragment} },
    location
  }
`);

// Property search with filters
export const PROPERTIES_SEARCH_QUERY = defineQuery(/* groq */ `
  *[_type == "property" && status == "active"
    && price >= $minPrice && price <= $maxPrice
    && ($beds == 0 || ($bedsIsPlus == true && bedrooms >= $beds) || ($bedsIsPlus == false && bedrooms == $beds))
    && ($baths == 0 || ($bathsIsPlus == true && bathrooms >= $baths) || ($bathsIsPlus == false && bathrooms == $baths))
    && ($type == "" || propertyType == $type)
    && ($city == "" || lower(address.city) match $city + "*" || lower(address.state) match $city + "*" || lower(address.zipCode) match $city + "*")
    && ($minSqft == 0 || squareFeet >= $minSqft)
    && ($maxSqft == 0 || squareFeet <= $maxSqft)
    && ($minYear == 0 || yearBuilt >= $minYear)
    && ($maxYear == 0 || yearBuilt <= $maxYear)
    && ($minLotSize == 0 || lotSize >= $minLotSize)
    && ($maxLotSize == 0 || lotSize <= $maxLotSize)
    && ($daysOnMarket == 0 || dateTime(createdAt) >= dateTime(now()) - 60*60*24*$daysOnMarket)
    && ($openHouse == false || (openHouseDate != null && dateTime(openHouseDate) >= dateTime(now())))
    && ($priceReduced == false || (originalPrice != null && price < originalPrice))
    && ($amenitiesCount == 0 || count((amenities)[@ in $amenities]) == $amenitiesCount)
  ] | order(createdAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    price,
    originalPrice,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    lotSize,
    address,
    "image": images[0] { ${imageFragment} },
    location,
    amenities,
    openHouseDate,
    createdAt
  }
`);

// Fetch all amenities for forms
export const AMENITIES_QUERY = defineQuery(/* groq */ `
  *[_type == "amenity"] | order(order asc, label asc) {
    _id,
    value,
    label,
    icon
  }
`);

// Properties count for pagination
export const PROPERTIES_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[_type == "property" && status == "active"
    && price >= $minPrice && price <= $maxPrice
    && ($beds == 0 || ($bedsIsPlus == true && bedrooms >= $beds) || ($bedsIsPlus == false && bedrooms == $beds))
    && ($baths == 0 || ($bathsIsPlus == true && bathrooms >= $baths) || ($bathsIsPlus == false && bathrooms == $baths))
    && ($type == "" || propertyType == $type)
    && ($city == "" || lower(address.city) match $city + "*" || lower(address.state) match $city + "*" || lower(address.zipCode) match $city + "*")
    && ($minSqft == 0 || squareFeet >= $minSqft)
    && ($maxSqft == 0 || squareFeet <= $maxSqft)
    && ($minYear == 0 || yearBuilt >= $minYear)
    && ($maxYear == 0 || yearBuilt <= $maxYear)
    && ($minLotSize == 0 || lotSize >= $minLotSize)
    && ($maxLotSize == 0 || lotSize <= $maxLotSize)
    && ($daysOnMarket == 0 || dateTime(createdAt) >= dateTime(now()) - 60*60*24*$daysOnMarket)
    && ($openHouse == false || (openHouseDate != null && dateTime(openHouseDate) >= dateTime(now())))
    && ($priceReduced == false || (originalPrice != null && price < originalPrice))
    && ($amenitiesCount == 0 || count((amenities)[@ in $amenities]) == $amenitiesCount)
  ])
`);
