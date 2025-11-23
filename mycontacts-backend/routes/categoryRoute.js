const express = require("express");
const { createCat, allCategory, oneCat, updateCat, deleteCat } = require("../controllers/categoryController");
const uploads = require("../middleware/uploadImage");
const router = express.Router();

router.route("/createCategory").post(uploads.single('image'), createCat);
router.route("/allCategory").get(allCategory);
router.route('/oneCategory/:id').get(oneCat);
router.route('/updateCategory/:id').put(uploads.single('image'), updateCat);
router.route('/delete/:id').delete(deleteCat);


module.exports = router;