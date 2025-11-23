const express = require('express');
const router = express.Router();

const upload = require("../middleware/uploadImage");
const { allProducts, create, update, deleteProduct, getProduct, getProductsByCategory, filterProducts } = require('../controllers/productController');

router.route('/allProducts').get(allProducts);
router.route('/createProduct').post(upload.single('image'),create);
router.route('/updateProduct/:id').put(upload.single('image'),update);
router.route('/deleteProduct/:id').delete(deleteProduct);
router.route('/oneProduct/:id').get(getProduct);
router.route('/filters').get(filterProducts);
router.get("/category/:categoryId", getProductsByCategory);

module.exports = router;