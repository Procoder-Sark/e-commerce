const express = require ("express");
require("dotenv").config();
require("./dbConnection");

const router = require("./routes/routes");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const cartRouter = require("./routes/cartRouter");
const {authController, adminController} = require("./controllers/authController");
const { responseCreator } = require("./utils/responseHandler");

const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/router", router);
app.use("/user", userRouter);
app.use("/cart" ,authController ,cartRouter);
app.use("/admin" ,authController ,adminController ,(req,res) => {
    res.send(responseCreator("Welcome Admin"));
});

app.use(errorHandler)
// console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug check

// console.log(process.env.DB_URL)

// //middlewares, intermidiate request handler
// app.use( "/", (req,res) => {
//     res.send("Response from the server");
// });

app.use('/router', router)

const PORT = 4000;
app.listen(PORT, () => {
    // console.clear();
    console.log(`Server started at port- ${PORT}`);
})