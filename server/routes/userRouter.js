const express = require ('express');
const { signup, login, logout, resetPassword } = require('../controllers/userController');
const {loginWithCookie} = require('../controllers/userController');
const userRouter = express.Router();


userRouter.post("/signup", signup);
userRouter.get("/login", loginWithCookie);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.patch("/reset-password", resetPassword);

//export default router
module.exports =userRouter ;