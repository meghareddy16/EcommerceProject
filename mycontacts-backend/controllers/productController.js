const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const fs = require('fs');
const path = require("path");

function removeFileExists(filename){
    if(!filename) return;
    const filepath = path.join(__dirname, '..', 'uploads',filename);
    if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
    }
}

//@desc POST 
// route POST  /createProduct
//access public
const create = expressAsyncHandler(async (req,res)=>{
    const {itemName, price, description, category, stockQuantity} = req.body;
    const image = req.file? req.file.filename: null; 
    console.log(req.body);
    console.log(req.file);
    const createProduct = await Product.create({itemName, price, description, category, stockQuantity, imageUrl:image});
    if(!itemName || !price){
        res.status(400).json("Please provide name and price");
    }
    console.log("created",createProduct);
    res.status(201).json(createProduct);
});


//@desc GET 
// route GET  /allProducts
//access public
const allProducts = expressAsyncHandler(async (req,res)=>{
    const allPros = await Product.find().populate("category", "catName description imageUrl");;
    res.status(201).json(allPros);
});

//@desc GET 
// route GET  /oneProduct
//access public
const getProduct = expressAsyncHandler(async (req,res)=>{
    const findProd = await Product.findById(req.params.id).populate("category", "catName description imageUrl");
        if(!findProd){
            res.status(400).json(`Product with ${req.params.id} not found`);
        }
    res.status(200).json(findProd);
});


//@desc PUT 
// route PUT  /updateProduct
//access public
const update = expressAsyncHandler(async (req,res)=>{
    const findProd = await Product.findById(req.params.id);
        if(!findProd){
            res.status(400).json(`Product with ${req.params.id} not found`);
        }
        if(req.file){
            removeFileExists(findProd.imageUrl);
            findProd.imageUrl = req.file.filename;
        }

        findProd.itemName = req.body.itemName?? findProd.itemName;
        findProd.price = req.body.price?? findProd.price;
        findProd.description = req.body.description?? findProd.description;
        findProd.category = req.body.category?? findProd.category;
        findProd.stockQuantity = req.body.stockQuantity?? findProd.stockQuantity;

    const newProduct = await findProd.save();
    res.status(200).json(newProduct);
});



//@desc DELETE 
// route DELETE  /deleteProduct
//access public
const deleteProduct = expressAsyncHandler(async (req,res)=>{
    const findProd = await Product.findById(req.params.id);
        if(!findProd){
            res.status(400).json(`Product with ${req.params.id} not found`);
        }
        if(req.file){
            removeFileExists(findProd.imageUrl);
        }

    await Product.remove();
    res.status(200).json(`Product with ${req.params.id} id removed`);
});

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId }).populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /products/filter?category=xxx&search=iphone&page=1&limit=8
const filterProducts = async (req, res) => {
  try {
    let { category, search, page = 1, limit = 8 } = req.query;

    const query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    page = Number(page);
    limit = Number(limit);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category");

    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {create, allProducts, update, getProduct, deleteProduct, getProductsByCategory, filterProducts};