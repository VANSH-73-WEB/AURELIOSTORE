// Single source of truth for the store's sections.
//
// IMPORTANT: every `name` below must match, character for character, the
// `category` / `subCategory` value stored on products in MongoDB - the
// category pages filter with these exact strings.
//
// To add a new section: add an entry here, then give products that category
// (and optional subCategory) in the database. The navbar menu, home tiles and
// /category/... pages pick it up automatically.

const PEOPLE = [
  { slug: "men", name: "Men", icon: "ri-men-line" },
  { slug: "women", name: "Women", icon: "ri-women-line" },
  { slug: "kids", name: "Kids", icon: "ri-user-smile-line" },
];

export const CATEGORIES = [
  { slug: "clothing", name: "Clothing", icon: "ri-t-shirt-line", subCategories: PEOPLE },
  { slug: "footwear", name: "Footwear", icon: "ri-footprint-line", subCategories: PEOPLE },
  { slug: "electronics", name: "Electronics", icon: "ri-smartphone-line", subCategories: [] },
  { slug: "furniture", name: "Furniture", icon: "ri-sofa-line", subCategories: [] },
  { slug: "accessories", name: "Accessories", icon: "ri-handbag-line", subCategories: [] },
  { slug: "wearables", name: "Wearables", icon: "ri-heart-pulse-line", subCategories: [] },
  { slug: "automobile", name: "Automobile", icon: "ri-motorbike-line", subCategories: [] },
];

// Quick-access tiles shown under the search bar on the home page.
export const HOME_TILES = [
  { label: "Men", icon: "ri-men-line", to: "/category/clothing/men" },
  { label: "Women", icon: "ri-women-line", to: "/category/clothing/women" },
  { label: "Kids", icon: "ri-user-smile-line", to: "/category/clothing/kids" },
  { label: "Footwear", icon: "ri-footprint-line", to: "/category/footwear" },
  { label: "Electronics", icon: "ri-smartphone-line", to: "/category/electronics" },
  { label: "Furniture", icon: "ri-sofa-line", to: "/category/furniture" },
  { label: "Accessories", icon: "ri-handbag-line", to: "/category/accessories" },
  { label: "Wearables", icon: "ri-heart-pulse-line", to: "/category/wearables" },
  { label: "Automobile", icon: "ri-motorbike-line", to: "/category/automobile" },
];

export const findCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const findSubCategory = (category, slug) =>
  category?.subCategories.find((s) => s.slug === slug);

export const categoryPath = (categorySlug, subSlug) =>
  subSlug ? `/category/${categorySlug}/${subSlug}` : `/category/${categorySlug}`;
