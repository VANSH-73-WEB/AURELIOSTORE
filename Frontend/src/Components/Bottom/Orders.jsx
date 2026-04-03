import { useEffect, useState } from "react";
const BASE_URL = "https://aurelio-backend-ztel.onrender.com";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  

  
    useEffect(() => {
      fetchOrders();
    }, []);


  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await res.json();
    console.log("ORDERS:", data);
    setOrders(data);
  };
  
  return (
    <div className="min-h-[70vh] px-20 pt-30">
      <h2 className="text-2xl font-semibold mb-6 bg-blue-900 text-white px-6 py-2 rounded text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        
        <p className="text-center text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-6 p-4 border rounded-xl">
            
            <h3 className="font-bold mb-2">
              Order ID: {order._id}
            </h3>

            <p className="text-gray-600 mb-2">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* Products */}
            {order.products.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-2">
                <img
                  src={item.product.image}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>₹{item.product.price} × {item.quantity}</p>
                </div>
              </div>
            ))}

            <h4 className="text-right font-semibold mt-3">
              Total: ₹{order.totalPrice}
            </h4>

          </div>
        ))
      )}
    </div>
  );
};

export default Orders;