const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    catName:{
        type:String,
        required:[true, 'Please provide name'],
    },
    description:{
        type: String,
        default: null,
    },
    imageUrl:{
        type: String,
        default: null,
    },
},{
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;