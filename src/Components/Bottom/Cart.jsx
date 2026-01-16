const Cart = ({ cart, setCart }) => {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-[70vh] px-20 pt-30  ">
     <h2 className="text-2xl font-semibold mb-6 bg-blue-900 rounded-2xl px-6 py-2 text-white text-center">
  Your Cart
</h2>

<div className="grid grid-cols-4 bg-gray-400 mb-4 font-bold rounded-2xl px-5 py-2 w-240">
  <h1>Product</h1>
  <h1>Price</h1>
  <h1>Quantity</h1>
  <h1>Subtotal</h1>
</div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]  text-gray-500">
          <i className="ri-shopping-cart-line text-6xl mb-4"></i>
          <p className="text-lg  ">Your cart is empty</p>
        </div>
      ) : (
        cart.map(item => (
<div key={item.id} className="grid grid-cols-4 mb-4 font-bold rounded-2xl px-5 py-2 w-240">
   <div className="flex items-center gap-3">
    <img src={item.image} className="w-12 h-12 rounded" />
    <span className="font-medium">{item.name}</span>
  </div>
  
  <h1>₹{item.price}</h1>
  <h1>{item.qty}</h1>
  <h1>₹{item.price * item.qty}</h1>
          <button onClick={() => removeFromCart(item.id)}>
              
           </button>
</div>
          

          
  // <div key={item.id} className="mb-4">
  //           <h4>{item.name}</h4>
  //           <p>₹{item.price}</p>
  //           <p>Qty: {item.qty}</p>
  //           <button onClick={() => removeFromCart(item.id)}>
  //             Remove
  //           </button>
  //         </div>
        ))
      )}
    </div>
  );
};

export default Cart;
