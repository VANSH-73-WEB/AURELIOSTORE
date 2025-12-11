
const Navbar = () => {
  return (
   <div className="relative flex">
  
  <div className="absolute top-0 left-0 w-full h-20  items-center">
   <div className="bg-blue-950/70 backdrop-blur-md mx-40 h-full rounded-b-2xl flex items-center shadow-lg">
    <img src="src/AURILEOSTORE.png" alt=""  className="w-20 h-auto relative text-white"/>
      <h1 className="font-raleway text-2xl font-thin tracking-[0.3em] uppercase text-white">
       AURELIO STORE
    </h1>
   <div className="flex flex-row space-x-6 ml-50">
  <h5 className="font-raleway font-thin text-white">Shop</h5>
  <h5 className="font-raleway font-thin text-white">Blog</h5>
  <h5 className="font-raleway font-thin text-white">Home</h5>
</div>
<div className="flex flex-row space-x-10 ml-80">
  <i class="ri-search-line text-2xl text-white text-shadow-cyan-950"></i>
  <i class="ri-shopping-cart-fill text-2xl text-white"></i>
  <i class="ri-circle-fill text-3xl text-white"></i>
</div>

   </div>
    
</div>
</div>
)
}

export default Navbar
