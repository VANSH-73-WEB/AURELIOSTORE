const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="bg-blue-950/70 backdrop-blur-md mx-40 h-20 rounded-b-2xl flex items-center shadow-lg px-6">
        
        
        <img
          src="src/AURILEOSTORE.png"
          alt="Aurelio Store"
          className="w-20 h-auto"
        />

        <h1 className="ml-4 font-raleway text-2xl font-thin tracking-[0.3em] uppercase text-white">
          AURELIO STORE
        </h1>

        
        <div className="flex space-x-6 ml-auto">
          <h5 className="font-raleway font-thin text-white cursor-pointer">Home</h5>
          <h5 className="font-raleway font-thin text-white cursor-pointer">Shop</h5>
          <h5 className="font-raleway font-thin text-white cursor-pointer">Blog</h5>
        </div>

        
        <div className="flex space-x-6 ml-10">
          <i className="ri-search-line text-2xl text-white"></i>
          <i className="ri-shopping-cart-fill text-2xl text-white"></i>
          <i className="ri-circle-fill text-3xl text-white"></i>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
