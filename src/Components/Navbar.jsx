
const Navbar = () => {
  return (
   <div className="relative">
  <img
    className="w-full h-[500px] object-cover  rounded-b-2xl shadow-lg mx-auto"
    src="https://i.pinimg.com/736x/64/f6/53/64f6537904d62276655df3fdf16bb5e5.jpg"
    alt="banner"
  />
  <div className="absolute top-0 left-0 w-full h-20  items-center">
   <div className="bg-blue-950/70 backdrop-blur-md mx-40 h-full rounded-b-2xl flex items-center shadow-lg">
      <h1 className="font-raleway ml-5 text-2xl font-thin tracking-[0.3em] uppercase text-white">
       AURELIO STORE
    </h1>
  </div>
    <h1 className="text-white font-raleway relative top-15 font-bold text-[300px] flex justify-center tracking-[0.2em]">Shop</h1>
</div>
</div>
)
}

export default Navbar
