const Navbar = ({ cart, setShowCart }) => {
   console.log(cart);
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
          <i className="ri-search-line text-2xl text-white cursor-pointer"></i>
       <div
  className="relative flex items-center cursor-pointer"
  onClick={() => setShowCart(prev => !prev)}
>
  <i className="ri-shopping-cart-fill text-2xl text-white"></i>

  {cart.length > 0 && (
   <span className="absolute -top-2 -right-2
backdrop-blur-md bg-white/30
border border-white/40
text-white text-xs font-bold
w-5 h-5 rounded-full
flex items-center justify-center
shadow-md">
 {cart.reduce((total, item) => total + item.qty, 0)}  
</span>
  )}
</div>


          <i className="ri-circle-fill text-3xl text-white cursor-pointer"></i>
        </div>

      </div>
      
    </nav>
  );
};

export default Navbar;
