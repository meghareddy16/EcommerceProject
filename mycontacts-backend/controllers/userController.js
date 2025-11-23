const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/errorHandler");
const jsonwebtoken = require("jsonwebtoken");


//@desc POST Register user
//@route POST /register
//access public
const register = expressAsyncHandler(async (req,res) => {
    const {username, type, email, password} = req.body;
    if(!username || !type || !email || !password){
        res.status(400);
        throw new Error("All Fields are required");
    }
     const userAvailable = await userModel.findOne({email});
     if(userAvailable){
        res.status(400);
        throw new Error("User with email already registered");
     }

     const hashedPassword = await bcrypt.hash(password, 10);
     console.log("Hashed Password:", hashedPassword);

     const user = await userModel.create({username, type,
        email, password: hashedPassword,
     })
    res.status(201).json(user);
});


//@desc POST Register user
//@route POST /login
//access public
const login = expressAsyncHandler(async (req,res) => {
    const {type, email, password} = req.body;
    if(!type || !email || !password){
        res.status(400);
        throw new Error("Invalid email or password");
    }

    const userPresent = await userModel.findOne({email});
    // console.log("User Present",userPresent);
    if(!userPresent){
        res.status(400);
        throw new Error("User not Found");
    }

    if(userPresent.type !== type){
        res.status(400);
        throw new Error("Role is not correct");
    }

    if(userPresent && await bcrypt.compare(password, userPresent.password)) {
        const accessToken = jsonwebtoken.sign({
            user:{
                id: userPresent.id,
                name: userPresent.username,
                email: userPresent.email,
                type: userPresent.type,
            },
        },process.env.ACCESS_SECRET_KEY,{
            expiresIn: "60m",
        });
       res.status(200).json({
        user:{_id: userPresent.id,
            username: userPresent.username,
            email: userPresent.email,
            type: userPresent.type,
        }, accessToken});
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

//@desc GET 
//@route GET api/users/registered
//access private
const getUsers = expressAsyncHandler(async (req,res) => {
    const getUser = await userModel.find();
    res.status(200).json(getUser);
});

//@desc GET 
//@route GET api/users/currentUser
//access private
const currentUser = expressAsyncHandler(async (req,res) => {
    // const currentUser = await userModel.find(req.user_id);
    res.status(200).json(req.user);
});


module.exports = {register, login, getUsers, currentUser};