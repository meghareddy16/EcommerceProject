const Orders = require('../models/orderModel');
const products = require('../models/productModel');
const categories = require('../models/categoryModel');
const users = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');

const adminDetails = expressAsyncHandler( async (req, res) => {
  try {
    const userCount = await users.countDocuments({type: "User"});
    const orderCount = await Orders.countDocuments();
    const productCount = await products.countDocuments();
    const categoryCount = await categories.countDocuments();
    const paidOrders = await Orders.find({ paymentStatus: "Paid" });
    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.json({
      users: userCount,
      orders: orderCount,
      products: productCount,
      categories: categoryCount,
      Revenue: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin details', error });
  }
});

module.exports = { adminDetails };
   