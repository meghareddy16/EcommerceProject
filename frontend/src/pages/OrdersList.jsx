import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext); // ✅ Get user directly
  const userId = user?._id; // safely extract ID

  useEffect(() => {
    if (userId) {
      axios.get(`/orders/orderUser/${userId}`).then((res) => setOrders(res.data));
    }
  }, [userId]);
  // console.log(orders);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-semibold mb-4">My Orders</h2>
      <div className="grid grid-cols-4 gap-4">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="max-w-md rounded overflow-hidden shadow-lg">
          <div  class="px-6 py-4">
          <div class="text-xl mb-2"><strong>Order Id : </strong>{order._id}</div>
          <div class="text-xl mb-2"><strong>Razorpay Id : </strong>{order.razorpayOrderId}</div>
          <p class="text-gray-700 text-lg">Order Status: {order.status} </p>
          <p class="text-gray-700 text-lg">Payment Method : {order.paymentMethod} </p>
          <p class="text-gray-700 text-lg">Total : {order.totalAmount} </p>
          <p class="text-gray-700 text-lg">Email : {order.email} </p>
          <div className="mt-2 text-xl">
            <strong>Products:</strong>
            <ul className=" ml-4 mt-1 text-lg flex px-2">
              {order.products.map((p) => (
                <li key={p._id} className="text-gray-600">
                  <img src={`https://backend-u4x0.onrender.com/uploads/${p.productId?.imageUrl}`} className="w-25 h-25 rounded"/>
                  <p classname="">{p.productId?.itemName} — ₹{p.productId?.price} × {p.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
        ))
      )}
      </div>
    </div>
  );
};

export default OrdersList;
