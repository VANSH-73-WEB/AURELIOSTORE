import {products} from  "./Products";
const ProductList = ({Cart , setCart}) => {

const addtocart = (product) => {
    const  exists = Cart.find(item => item.id === product.id);

    if (exists){
      setCart(
        Cart.map(item => 
          item.id === product.id ? {
            ...item , qty: item.qty + 1 }
            :item
          )
      );
    }
    else {
      setCart([...Cart, { ...product, qty: 1}]);
    }
          
      
  };


  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>

          <button onClick={() => addtocart(product)}>Add to Cart</button>
        </div>
      ))}
      
    </div>
  )
}

export default ProductList
