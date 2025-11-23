const express = require("express");
const router = require("./routes/contactRoute");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors({
   origin: 'http://localhost:5173',
  // origin: '*', //only for development purpose allows all origins
  credentials: true
}));

const dotenv = require("dotenv").config();
const port = process.env.PORT || 8001;

connectDb();

// console.log(__dirname);

app.use("/api/contacts" ,require ("./routes/contactRoute"));
app.use("/api/users" ,require ("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
// Serve uploaded images under /uploads route
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/payments", require("./routes/paymentRoute"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
