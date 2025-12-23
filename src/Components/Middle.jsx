
const Middle = () => {
  return (
    
  <div className="relative flex justify-center items-center">
  <img
    className="w-full h-[500px]  shadow-lg"
    src="https://i.pinimg.com/1200x/ea/c5/d0/eac5d0031ac7f7f745ac1f21ba73a7e7.jpg"
    alt="banner"
  />

  <h1 className="absolute bg-gradient-to-t from-red-500 to-blue-500 bg-clip-text text-transparent font-raleway font-normal text-[300px] tracking-[0.15em]">
   Shop
 </h1>
 <div className=" absolute w-7xl h-50 bg-white rounded-tl-2xl rounded-tr-2xl
    top-100 flex
    ">
<h1 className="font-raleway font-bold text-4xl ml-3 mt-3 ">Give All You Need</h1>

 <div className="absolute top-5 right-5">
       <input 
       className="bg-white  w-[430px] h-[45px] text-gray-600 rounded-full border border-gray-300 outline-none pl-10 pr-28  " 
       placeholder="Search on Aurileo" />
        <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
       
        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full cursor-pointer">Search</button>
 </div>
</div>
       </div>

  )
}

export default Middle
