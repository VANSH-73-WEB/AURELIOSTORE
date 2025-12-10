
const Navbar = () => {
  return (
   <div className="relative flex">
  <img
    className="w-full h-[500px] object-cover  rounded-b-2xl shadow-lg mx-auto"
    src="https://i.pinimg.com/736x/64/f6/53/64f6537904d62276655df3fdf16bb5e5.jpg"
    alt="banner"
  />
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
<i class="ri-search-line"></i>

   </div>
    <h1 className="text-white font-raleway relative top-15 font-[400px] text-[300px] flex justify-center tracking-[0.15em] ">Shop</h1>
</div>
</div>
)
}

export default Navbar
