const Cart = ({ cart, setCart }) => {

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="absolute">
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.qty}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove from Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
