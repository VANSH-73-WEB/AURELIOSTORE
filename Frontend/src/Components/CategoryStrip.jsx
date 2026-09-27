import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HOME_TILES } from "../config/categories";

// "Shop by Category" quick-access tiles, shown on the home page under the search bar.
// Tiles are defined in src/config/categories.js (HOME_TILES).
//
// Single row, horizontally scrollable, with left/right arrow buttons instead
// of a raw scrollbar. The native scrollbar is hidden (see .scrollbar-hide in
// index.css) - clicking the arrows or dragging/swiping both still work.
const CategoryStrip = () => {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="px-6 md:px-16 xl:px-20 pt-10" aria-label="Shop by category">
      <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-5">
        Shop by Category
      </h2>

      <div className="relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll categories left"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-blue-950 hover:shadow-lg transition"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
        )}

        {/* Fades hint that there's more content under the arrows */}
        {canScrollLeft && (
          <div className="hidden sm:block pointer-events-none absolute left-0 top-0 bottom-2 w-10 bg-gradient-to-r from-white to-transparent z-[5]" />
        )}
        {canScrollRight && (
          <div className="hidden sm:block pointer-events-none absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent z-[5]" />
        )}

        <div
          ref={scrollerRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 scroll-smooth snap-x"
        >
          {HOME_TILES.map((tile) => (
            <Link
              key={tile.to}
              to={tile.to}
              className="group shrink-0 snap-start w-16 md:w-20 flex flex-col items-center gap-2 text-center"
            >
              <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-300">
                <img
                  src={tile.image}
                  alt={tile.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-colors duration-300" />
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-950 text-white flex items-center justify-center text-xs border-2 border-white">
                  <i className={tile.icon} />
                </span>
              </span>
              <span className="text-sm text-gray-700 group-hover:text-blue-950 transition-colors">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right arrow */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll categories right"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-blue-950 hover:shadow-lg transition"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        )}
      </div>
    </section>
  );
};

export default CategoryStrip;
