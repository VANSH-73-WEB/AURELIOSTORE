const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 mt-20
    ">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-white text-xl tracking-widest mb-4">
            AURELIO STORE
          </h2>
          <p className="text-sm leading-relaxed">
            Premium fashion & lifestyle products crafted for elegance and
            everyday comfort.
          </p>

          <div className="flex gap-4 mt-5">
            <i className="ri-instagram-line text-xl cursor-pointer hover:text-white"></i>
            <i className="ri-facebook-line text-xl cursor-pointer hover:text-white"></i>
            <i className="ri-twitter-x-line text-xl cursor-pointer hover:text-white"></i>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Men</li>
            <li className="hover:text-white cursor-pointer">Women</li>
            <li className="hover:text-white cursor-pointer">Accessories</li>
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers & updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-lg bg-blue-900 text-white outline-none"
            />
            <button className="bg-white text-blue-950 px-4 rounded-r-lg font-semibold">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 text-center text-sm">
        © {new Date().getFullYear()} Aurelio Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
