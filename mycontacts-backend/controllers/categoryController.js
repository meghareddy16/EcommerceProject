const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const Category = require("../models/categoryModel");

function removeFile(filename){
    if(!filename) return;
    const filepath = path.join(__dirname, '..', 'uploads', filename);
    if(!fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
    }
    
}

//desc POST
//route POST /createCategory
//access public
const createCat = asyncHandler(async (req, res) => {
    const {catName, description} = req.body;
    if(!catName){
        res.status(400).json("Please provide details");
    }
   const image = req.file? req.file.filename:null;
    const create = await Category.create({catName, description, imageUrl:image  });
    res.status(201).json({create});

});

//desc GET
//route get /allCategories
//access public
const allCategory = asyncHandler(async (req, res) => {
    const getCat = await Category.find();
    res.status(200).json(getCat);
});

const oneCat = asyncHandler( async (req, res) => {
    const findCate = await Category.findById(req.params.id);
    if(!findCate){
        res.status(400).json(`Requested ${req.params.id} is not found`);
    }
    res.status(200).json(findCate);
});

const updateCat = asyncHandler( async (req,res) => {
    const findCate = await Category.findById(req.params.id);
    if (!findCate) {
        return res.status(404).json({ message: 'Category not found' });
    }
    if(req.file){
        removeFile(findCate.imageUrl);
        findCate.imageUrl = req.file.filename;
    }
    findCate.catName = req.body.catName ?? findCate.catName;
    findCate.description = req.body.description ?? findCate.description;

    const updates = await findCate.save();
    res.status(200).json("Updated Successfully",updates);
})

const deleteCat = asyncHandler(async (req, res) => {
    const findCate = await Category.findById(req.params.id);
    if (!findCate) {
        return res.status(404).json({ message: 'Category not found' });
    }
    // Remove associated file if exists
    if (findCate.imageUrl) {
        removeFile(findCate.imageUrl);
        res.json("category Image removed ")
    }
     await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
});

module.exports = {
    createCat,
    allCategory,
    oneCat,
    updateCat,
    deleteCat,
};

