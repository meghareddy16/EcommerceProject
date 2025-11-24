import { useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const OrderForm = () => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log("Razorpay script loaded");
    };
  }, []);
 
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // 👈 get user info
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  // console.log(user)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );



  const placeOrder = async (paymentMethod, razorpayData=null) => {
    const orderData = {
      userId: user?._id, 
      name,
      email,
      paymentMethod,
      totalAmount,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      razorpay_order_id: razorpayData?.razorpay_order_id || null,
      razorpay_payment_id: razorpayData?.razorpay_payment_id || null,
      razorpay_signature: razorpayData?.razorpay_signature || null,

      paymentStatus: razorpayData ? "Paid" : "Pending",
      paidAt: razorpayData ? new Date() : null,
    };
    // console.log(orderData);

    try {
      const response = await axios.post("/orders/orderPlace", orderData);
      toast.success("Order Placed Successfully");
      // console.log(response);
      clearCart();
      navigate("/orderList");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Order placement failed!");
    }
  };

  const handleOnlinePayment = async () => {
  try {
    const amount = totalAmount;

    // 1. Create Razorpay order (backend)
    const { data } = await axios.post("/payments/create-order", { amount });

    const options = {
      key: "rzp_test_Rfhk3qoYhzszx6",
      amount: data.amount,
      currency: "INR",
      name: "My E-Commerce",
      description: "Order Payment",
      order_id: data.id,

      handler: async function (response) {
        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        console.log("verify data:",verifyData);

        const verifyRes = await axios.post(
          "/payments/verify-payment",
          verifyData
        );
        console.log("verify response",verifyRes);

        if (verifyRes.data.success) {
          toast.success("Payment Successful!");
          navigate('/orderList')
          // Now place order in MongoDB
          await placeOrder("Online", verifyData);
        } else {
          toast.error("Payment Failed");
        }
      },

      prefill: {
        name,
        email,
      },

      theme: { color: "#3399cc" },
    };

    if (!window.Razorpay) {
      toast.error("Razorpay not loaded!");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log(error);
    toast.error("Payment error");
  }
};


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Place Your Order</h2>
      <form  className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <div className="font-semibold text-gray-800">
          Total: ₹{totalAmount.toFixed(2)}
        </div>

        {/* <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Place Order
        </button> */}
         <button type="button" onClick={handleOnlinePayment}
            className="bg-green-600 text-white p-2 w-full rounded">
            Pay Online
          </button>
      </form>
    </div>
  );
};

export default OrderForm;
