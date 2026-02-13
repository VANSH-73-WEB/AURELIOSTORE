const Cart = ({ cart, setCart }) => {
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-[70vh] px-20 pt-30  ">
      <h2 className="text-2xl font-semibold mb-6 bg-blue-900 rounded-2xl px-6 py-2 text-white text-center">
        Your Cart
      </h2>

      <div className="grid grid-cols-5 bg-gray-400 mb-4 font-bold rounded-2xl px-5 py-2 w-240">
        <h1 className="text-center">Product</h1>
        <h1 className="text-center">Price</h1>
        <h1 className="text-center">Quantity</h1>
        <h1 className="text-center">Subtotal</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]  text-gray-500">
          <i className="ri-shopping-cart-line text-6xl mb-4"></i>
          <p className="text-lg  ">Your cart is empty</p>
        </div>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center mb-5 font-bold rounded-2xl px-5 py-2 w-240"
          >
            {/* Product */}
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-12 h-12 rounded" />
              <span className="font-medium truncate">{item.name}</span>
            </div>

            {/* Price */}
            <h1 className="text-center">₹{item.price}</h1>

            {/* Quantity */}
            <h1 className="text-center">{item.qty}</h1>

            {/* Total */}
            <h1 className="text-center">₹{item.price * item.qty}</h1>

            {/* Delete */}
            <div className="flex justify-center">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <i className="ri-delete-bin-7-fill text-xl"></i>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
