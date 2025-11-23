const express = require('express');
const router = express.Router();
const { getContacts, createContacts ,getContactId, updateContact, deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/TokenHandler');
const upload = require('../middleware/uploadImage');

router.use(validateToken);
router.route("/").get(getContacts).post(upload.single('image'),createContacts);
router.route("/:id").get(getContactId).put(upload.single('image') ,updateContact).delete(deleteContact);

module.exports = router;