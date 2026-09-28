// Single source of truth for the store's sections.
//
// IMPORTANT: every `name` below must match, character for character, the
// `category` / `subCategory` value stored on products in MongoDB - the
// category pages filter with these exact strings.
//
// To add a new section: add an entry here, then give products that category
// (and optional subCategory) in the database. The navbar menu, home tiles and
// /category/... pages pick it up automatically.

// Small helper so every image request is a consistent, compressed size
// (800px wide, auto-format/quality) instead of pulling full-res photos.
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`;

const PEOPLE = [
  { slug: "men", name: "Men", icon: "ri-men-line", image: img("photo-1622519407650-3df9883f76a5") },
  { slug: "women", name: "Women", icon: "ri-women-line", image: img("photo-1554881070-74595ca2b74c") },
  { slug: "kids", name: "Kids", icon: "ri-user-smile-line", image: img("photo-1641399624718-6392f1343459") },
];

export const CATEGORIES = [
  { slug: "clothing", name: "Clothing", icon: "ri-t-shirt-line", image: img("photo-1554881070-74595ca2b74c"), subCategories: PEOPLE },
  { slug: "footwear", name: "Footwear", icon: "ri-footprint-line", image: img("photo-1542272604-78d13c1f741a"), subCategories: PEOPLE },
  { slug: "electronics", name: "Electronics", icon: "ri-smartphone-line", image: img("photo-1678851836066-dc27614cc56b"), subCategories: [] },
  { slug: "furniture", name: "Furniture", icon: "ri-sofa-line", image: img("photo-1684165610413-2401399e0e59"), subCategories: [] },
  { slug: "accessories", name: "Accessories", icon: "ri-handbag-line", image: img("photo-1572196223922-d8b7e0ab0b4d"), subCategories: [] },
  { slug: "wearables", name: "Wearables", icon: "ri-heart-pulse-line", image: img("photo-1517502474097-f9b30659dadb"), subCategories: [] },
  { slug: "automobile", name: "Automobile", icon: "ri-motorbike-line", image: img("photo-1730577220440-d89e0726c6ee"), subCategories: [] },
  { slug: "fragrances", name: "Fragrances", icon: "ri-flask-line", image: img("photo-1634944119598-837431c4900a"), subCategories: [] },
  { slug: "beauty", name: "Beauty & Personal Care", icon: "ri-lipstick-line", image: img("photo-1596462502278-27bfdc403348"), subCategories: [] },
  { slug: "sports", name: "Sports & Fitness", icon: "ri-boxing-line", image: img("photo-1589579234096-25cb6b83e021"), subCategories: [] },
  { slug: "books", name: "Books & Stationery", icon: "ri-book-2-line", image: img("photo-1630852722128-db210d1b62a7"), subCategories: [] },
  { slug: "toys", name: "Toys & Games", icon: "ri-gamepad-line", image: img("photo-1516981879613-9f5da904015f"), subCategories: [] },
  { slug: "kitchen", name: "Kitchen & Dining", icon: "ri-knife-line", image: img("photo-1556911220-e15b29be8c8f"), subCategories: [] },
];

// Quick-access tiles shown under the search bar on the home page.
export const HOME_TILES = [
  { label: "Men", icon: "ri-men-line", image: PEOPLE[0].image, to: "/category/clothing/men" },
  { label: "Women", icon: "ri-women-line", image: PEOPLE[1].image, to: "/category/clothing/women" },
  { label: "Kids", icon: "ri-user-smile-line", image: PEOPLE[2].image, to: "/category/clothing/kids" },
  { label: "Footwear", icon: "ri-footprint-line", image: CATEGORIES[1].image, to: "/category/footwear" },
  { label: "Electronics", icon: "ri-smartphone-line", image: CATEGORIES[2].image, to: "/category/electronics" },
  { label: "Furniture", icon: "ri-sofa-line", image: CATEGORIES[3].image, to: "/category/furniture" },
  { label: "Accessories", icon: "ri-handbag-line", image: CATEGORIES[4].image, to: "/category/accessories" },
  { label: "Wearables", icon: "ri-heart-pulse-line", image: CATEGORIES[5].image, to: "/category/wearables" },
  { label: "Automobile", icon: "ri-motorbike-line", image: CATEGORIES[6].image, to: "/category/automobile" },
  { label: "Fragrances", icon: "ri-flask-line", image: CATEGORIES[7].image, to: "/category/fragrances" },
  { label: "Beauty", icon: "ri-lipstick-line", image: CATEGORIES[8].image, to: "/category/beauty" },
  { label: "Sports", icon: "ri-boxing-line", image: CATEGORIES[9].image, to: "/category/sports" },
  { label: "Books", icon: "ri-book-2-line", image: CATEGORIES[10].image, to: "/category/books" },
  { label: "Toys", icon: "ri-gamepad-line", image: CATEGORIES[11].image, to: "/category/toys" },
  { label: "Kitchen", icon: "ri-knife-line", image: CATEGORIES[12].image, to: "/category/kitchen" },
];

export const findCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const findSubCategory = (category, slug) =>
  category?.subCategories.find((s) => s.slug === slug);

export const categoryPath = (categorySlug, subSlug) =>
  subSlug ? `/category/${categorySlug}/${subSlug}` : `/category/${categorySlug}`;
