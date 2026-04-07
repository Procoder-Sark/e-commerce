const { UserModel } = require("../models/UserModels");
const { verifyToken } = require("../utils/jwtUtils");


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const authController = async (req, res, next) => {
   try {
     const { authToken } = req.cookies;
    const { username } = verifyToken(authToken);
    const userdata = await UserModel.findUser(username);
    // res.locals is a palceholder for storing any temporary data that we want to pass to the next middleware or route handler
    res.locals.userdata = userdata;
    next();
   } catch (error) {
    next(error);
   }

};

const adminController = (req, res, next) => {
   const { role } = res.locals.userdata;
   if(role !== "admin"){
      const err = new Error("Access denied! Admin only");
      err.status = 403;
      throw err;
   }
   next();
};

module.exports = {
   authController,
   adminController,
};