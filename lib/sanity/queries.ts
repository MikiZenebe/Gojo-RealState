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
