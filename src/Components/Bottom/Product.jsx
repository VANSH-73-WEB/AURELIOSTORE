import { products } from "../../data/produts";

const Product = ({ cart, setCart }) => {

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <section className="mt-24 px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {/* // <div className="mt-20 grid grid-cols-3 gap-1 ml-70"> */}


      {products.map((item) => (
        <div key={item.id} className="product-card bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
          <img
            src={item.image}
            alt={item.name}
            className="w-70 h-70 rounded-2xl"
          />

          <h3 className="font-semibold text-2xl">{item.name}</h3>
          <p>₹{item.price}</p>

          <div className="flex justify-between">
            <button
              className="w-30 h-10 font-semibold rounded-3xl border border-gray-300 cursor-pointer"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>

            <button className="w-30 h-10 font-semibold rounded-3xl border border-gray-300 bg-black text-white cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default Product;
