const express = require("express");
const router = require("./routes/contactRoute");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors({
  //  origin: 'http://localhost:5173',
  origin: 'https://ecommerce-project-cyan-rho.vercel.app', //only for development purpose allows all origins
  credentials: true
}));

const dotenv = require("dotenv").config();
const port = process.env.PORT || 8001;

connectDb();

// console.log(__dirname);

app.use("/contacts" ,require ("./routes/contactRoute"));
app.use("/users" ,require ("./routes/userRoute"));
app.use("/products", require("./routes/productRoute"));
app.use("/category", require("./routes/categoryRoute"));
app.use("/orders", require("./routes/orderRoute"));
// Serve uploaded images under /uploads route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/payments", require("./routes/paymentRoute"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
