const Cart = ({ cart, setCart }) => {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-[70vh] px-20 pt-30  ">
      <h2 className="text-2xl font-semibold mb-6 bg-blue-900 rounded-2xl  text-white">Your Cart</h2>

      {cart.length === 0 ? (



        <div className="flex flex-col items-center justify-center h-[50vh]  text-gray-500">
          <i className="ri-shopping-cart-line text-6xl mb-4"></i>
          <p className="text-lg  ">Your cart is empty</p>
        </div>
      ) : (
        cart.map(item => (


          <div key={item.id} className="mb-4">

<div className="flex flex-row bg-gray-400 mb-4 font-bold w-220 rounded-2xl pb-2">

  <h1 className="mr-40 ml-5">Product</h1>
  <h1 className="mr-40">Price</h1>
  <h1 className="mr-40">Quantity</h1>
  <h1 className="mr-40">Subtotal</h1>
</div>



            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <p>Qty: {item.qty}</p>
            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
