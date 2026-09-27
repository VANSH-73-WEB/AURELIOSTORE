import { Link, useParams } from "react-router-dom";
import Product from "./Bottom/Product";
import Notfound from "./Notfound";
import { findCategory, findSubCategory, categoryPath } from "../config/categories";

// Handles both:  /category/:categorySlug            e.g. /category/electronics
//          and:  /category/:categorySlug/:subSlug   e.g. /category/clothing/men
// Sections are defined in src/config/categories.js.
const Category = ({ cart, setCart }) => {
  const { categorySlug, subSlug } = useParams();

  const category = findCategory(categorySlug);
  const sub = subSlug ? findSubCategory(category, subSlug) : null;

  // unknown category, or a sub-section that doesn't belong to it
  if (!category || (subSlug && !sub)) return <Notfound />;

  const heading = sub ? `${category.name} for ${sub.name}` : category.name;

  return (
    <div className="pt-24 md:pt-28">
      <div className="px-6 md:px-16 xl:px-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
          <Link to="/home" className="hover:text-blue-950 transition">Home</Link>
          <i className="ri-arrow-right-s-line" />
          {sub ? (
            <Link to={categoryPath(category.slug)} className="hover:text-blue-950 transition">
              {category.name}
            </Link>
          ) : (
            <span className="text-gray-600">{category.name}</span>
          )}
          {sub && (
            <>
              <i className="ri-arrow-right-s-line" />
              <span className="text-gray-600">{sub.name}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="mt-4 rounded-2xl overflow-hidden relative text-white px-6 md:px-10 py-8 md:py-10 flex items-center gap-5 min-h-[140px]">
          <img
            src={sub?.image || category.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/70" />
          <span className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-3xl">
            <i className={sub?.icon || category.icon} />
          </span>
          <div className="relative">
            <h1 className="font-raleway text-2xl md:text-4xl font-light tracking-wide">{heading}</h1>
            <p className="text-white/70 text-sm mt-1">
              Browse our {category.name.toLowerCase()} collection
            </p>
          </div>
        </div>

        {/* Sub-section pills (only for categories that have them, e.g. Clothing -> Men / Women / Kids) */}
        {category.subCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            <Pill to={categoryPath(category.slug)} active={!sub}>All</Pill>
            {category.subCategories.map((s) => (
              <Pill key={s.slug} to={categoryPath(category.slug, s.slug)} active={sub?.slug === s.slug}>
                <i className={s.icon} /> {s.name}
              </Pill>
            ))}
          </div>
        )}
      </div>

      {/* key remounts the list when the section changes, so it always starts on page 1 */}
      <Product
        key={`${category.slug}/${sub?.slug ?? ""}`}
        products={[]}
        cart={cart}
        setCart={setCart}
        category={category.name}
        subCategory={sub?.name}
        title="Products"
        emptyMessage="Nothing here yet - check back soon."
      />
    </div>
  );
};

const Pill = ({ to, active, children }) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border transition ${
      active
        ? "bg-blue-950 text-white border-blue-950 shadow"
        : "bg-white text-gray-700 border-gray-200 hover:border-blue-950 hover:text-blue-950"
    }`}
  >
    {children}
  </Link>
);

export default Category;
