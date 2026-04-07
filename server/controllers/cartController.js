const { UserModel } = require("../models/UserModels");
const { responseCreator } = require("../utils/responseHandler");

const getCartItems = async (req, res, next) => {
    const { username } = res.locals.userdata;
    const data = await UserModel.getCartItems(username);

    res.send(responseCreator("Cart items retrieved successfully",data));
};

const clearCart = async (req, res, next) => {
    const { username } = res.locals.userdata;
    const data = await UserModel.clearCart(username);

    res.send(responseCreator("Cart cleared successfully",data));
};


const addToCart = async (req, res, next) => {
    const { username } = res.locals.userdata;
    const product = req.body;

    const data = await UserModel.addToCart(username, product);

    res.send(responseCreator(`${product.title} is added to cart successfully`,data));
};

const removeFromCart = async (req, res, next) => {
    const { username } = res.locals.userdata;
    const product = req.body;

    const data = await UserModel.removeFromCart(username, product);

    res.send(responseCreator(`${product.title} is remove successfully`,data));
};

const increment = async (req, res, next) => {
    const { username } = res.locals.userdata;
    const product = req.body;

    const data = await UserModel.increment(username, product);

    res.send(responseCreator(`${product.title} increase successfully`,data));
};

const decrement = async (req, res, next) => {
    const { username } = res.locals.userdata;
    const product = req.body;

    const data = await UserModel.decrement(username, product);

    res.send(responseCreator(`${product.title} decrease successfully`,data));
};

module.exports = {
    getCartItems,
    clearCart,
    addToCart,
    removeFromCart,
    increment,
    decrement,
};