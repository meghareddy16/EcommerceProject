const  mongoose = require("mongoose");

const connectDb = async ()=> {
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECTION);
        console.log("MongoDb connected..", connect.connection.host,
            connect.connection.name
        );
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDb;