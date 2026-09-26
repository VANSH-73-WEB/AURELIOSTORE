import { Link } from "react-router-dom";
import { HOME_TILES } from "../config/categories";

// "Shop by Category" quick-access tiles, shown on the home page under the search bar.
// Tiles are defined in src/config/categories.js (HOME_TILES).
const CategoryStrip = () => {
  return (
    <section className="px-6 md:px-16 xl:px-20 pt-10" aria-label="Shop by category">
      <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-5">
        Shop by Category
      </h2>

      {/* scrolls sideways on small screens, fits in one row on desktop */}
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x md:justify-between">
        {HOME_TILES.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="group shrink-0 snap-start w-20 md:w-24 flex flex-col items-center gap-2 text-center"
          >
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 text-blue-950 border border-blue-100 flex items-center justify-center text-2xl md:text-3xl group-hover:bg-blue-950 group-hover:text-white group-hover:shadow-lg transition-all duration-300">
              <i className={tile.icon} />
            </span>
            <span className="text-sm text-gray-700 group-hover:text-blue-950 transition-colors">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
