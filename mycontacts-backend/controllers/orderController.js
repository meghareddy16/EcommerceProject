import { sendEmail } from "../middleware/sendEmail.js";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, name, email, paymentMethod, products, totalAmount,razorpay_order_id,razorpay_payment_id,razorpay_signature } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const order = new Order({
      userId,
      name,
      email,
      paymentMethod,
      products,
      totalAmount,
      paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",
      razorpayOrderId: razorpay_order_id || null,
      razorpayPaymentId: razorpay_payment_id || null,
      razorpaySignature: razorpay_signature || null,
      paidAt: paymentMethod === "Online" ? new Date() : null,
    });
    // console.log(order);
    await order.save();
    await sendEmail(
      email,
      "Order Created Successfully",
      `Dear ${name},\n\nYour order has been successfully placed.
             \n Your OrderId: ${order._id}, \n\n Total Amount: ${totalAmount},
             Thank you for shopping with us!\n\nBest regards,\nYour Company Team`,
  
    );
    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};
