import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash } from "lucide-react";

const Cart = () => {

  const navigate = useNavigate();
  
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Proceeding to checkout...");
    navigate("/orderPlace");
    // navigate to order page (you can add checkout form next)
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty <ShoppingBag/></p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://backend-u4x0.onrender.com/uploads/${item.imageUrl}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="bg-gray-200 px-2 rounded text-lg"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="bg-gray-200 px-2 rounded text-lg"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    <Trash/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50"
            >
              Clear Cart
            </button>

            <div className="text-right">
              <p className="text-xl font-bold">
                Total: ₹{totalAmount.toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
