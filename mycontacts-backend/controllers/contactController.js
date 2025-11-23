const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const errorHandler = require("../middleware/errorHandler");
const fs = require("fs");
const path = require("path");

function removeFileExists(filename){
    if(!filename) return;
    const filepath = path.join(__dirname, '..', 'uploads',filename);
    if(!fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
    }
}

//@desc Get all contacts
//@route GET /api/contacts
//access private
const getContacts = asyncHandler(async (req, res) => {
    const allContacts = await Contact.find();
    console.log(getContacts);
    res.status(200).json(allContacts);
});

//@desc create contacts
//@route POST /api/contacts
//access private
const createContacts = asyncHandler(async (req, res) => {
    console.log("Response Body:",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    if(!req.file){
        res.status(400);
        throw new Error("Image is not uploaded");
    }
    const image = req.file? req.file.filename: null;
    const createContact = await Contact.create({
        name, email, phone,imageUrl:image,
    });
    res.status(201).json(createContact);
});

//@desc Get contacts by Id
//@route GET /api/contacts/id
//access private
const getContactId = asyncHandler(async (req, res) => {
     if (!req.params.id) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const getContact = await Contact.findById(req.params.id);
    res.status(200).json(getContact);
});

//@desc Updated contacts by Id
//@route PUT /api/contacts/id
//access private
const updateContact = asyncHandler(async (req, res) => {
    // if(!req.params.id){
    //     res.status(404);
    //     throw new Error(errorHandler.message);
    // }
    // const editContact = await Contact.findByIdAndUpdate(req.params.id, req.body,{new: true});
    // res.status(200).json(editContact);
    const contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(400);
            throw new Error(`Contact Not Found for this ${req.params.id}`);
        }
      
        if(req.file){
            removeFileExists(Contact.imageUrl);
            contact.imageUrl = req.file.filename;
        }

        contact.name = req.body.name ?? contact.name;
        contact.email = req.body.email ?? contact.email;
        contact.phone = req.body.phone ?? contact.phone;

        const updatedNew = await contact.save();
        res.status(200).json(updatedNew);
});

//@desc Delete contacts by Id
//@route DELETE /api/contacts/id
//access private
const deleteContact = asyncHandler(async (req, res) => {
    // if(!req.params.id){
    //     res.status(404);
    //     throw new Error(errorHandler.message)
    // }
    // const removeContact = await Contact.findByIdAndDelete(req.params.id);
    // res.status(200).json({message:`Deleted contact By Id ${req.params.id} `});
    const removing = await Contact.findById(req.params.id);
    if (!removing) {
        res.status(400);
        throw new Error(`Contact Not Found for this ${req.params.id}`);
    }
    removeFileExists(removing.image);
    await removing.remove();
    res.status(200).json({ message: `Deleted contact By Id ${req.params.id}` });
});


module.exports = {getContacts, createContacts, getContactId, updateContact, deleteContact};