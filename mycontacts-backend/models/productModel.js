const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    itemName:{
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    // ✅ Reference category by its ObjectId
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // must match the model name
      required: true,
    },
    stockQuantity: {
        type: Number,
        default: 0,
        min: 0
    },
    imageUrl: {
        type: String,
        default: null
    }
   
},{
    timestamps: true,
}
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
  