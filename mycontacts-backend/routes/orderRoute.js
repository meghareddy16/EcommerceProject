const express =  require('express');
const { placeOrder, getUserOrders } =require('../controllers/orderController');
const router = express.Router();


router.post("/orderPlace", placeOrder);
router.get("/orderUser/:userId", getUserOrders);

module.exports = router;
