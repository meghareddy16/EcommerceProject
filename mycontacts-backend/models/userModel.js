const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    // user_id :{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },
    username: {
        type: String,
        required: [true, "Please enter username"],
    },
    type: {
        type: String,
        required: [true, "Please enter either Admin or User"],
        enum: ["Admin", "User"],
    },
        email: {
        type: String,
        required: [true, "Please enter email address"],
        unique: [true, "This Email address is already taken"],
    },
     password: {
        type: String,
        required: [true, "Please enter strong password"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Users",userSchema);