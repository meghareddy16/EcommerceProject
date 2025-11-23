
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add contact email id"]
    },
    phone: {
        type: String,
        required: [true, "Please add contact phone number"]
    },
    imageUrl: {
        type:String,
        default: null
    },
},
{timestamps: true,});

module.exports = mongoose.model("Contact",contactSchema);
