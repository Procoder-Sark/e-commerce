const express = require("express");
const cartRouter = express.Router();
const  {
    getCartItems,
    clearCart,
    addToCart,
    removeFromCart,
    increment,
    decrement,
}  = require("../controllers/cartController");


// cartRouter.get("/get-cart", authController, getCartItems);
cartRouter.get("/get-cart", getCartItems);

cartRouter.post("/add-to-cart", addToCart);
cartRouter.delete("/remove", removeFromCart);
cartRouter.patch("/increment", increment);
cartRouter.patch("/decrement", decrement);

cartRouter.delete("/clear-cart", clearCart);

module.exports = cartRouter;