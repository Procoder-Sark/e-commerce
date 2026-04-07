const {UserModel, sanitizeUserdata} = require("../models/UserModels");
const { generateToken, verifyToken } = require("../utils/jwtUtils");
const { genPasswordHash, verifyPassword } = require("../utils/passwordUtil");
const { errorCreator, responseCreator } = require("../utils/responseHandler");
const { Request, Response } = require("express");
const { generateQRCode, verifyOtp } = require("../utils/totpUtils");

/** 
 * @params {Request} req
 * @params {Response} res
 * @params {*} next
 */

const signup = async (req, res, next) => {
    try {
        const {password,...userdata} = req.body;
        const passwordHash = await genPasswordHash(password);
        userdata.password = passwordHash;
        const { qrCode, secret } = await generateQRCode(userdata.username);
        userdata.secret = secret;
        const data = await UserModel.createUserAcc(userdata);
        if (data) {
            res.send(
                // sucess: true,
                // message: `${userdata?.name} is signed up successfully`,
                // data: userdata,
                
            responseCreator(`${userdata?.name} is signed up successfully`, qrCode),);
        }
        //pwdUtils -> password hashing
    
        //token -> api-> validate token -> make db call and fetch user data
        
    } catch (error) {
       next(error);
    }


};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userData = await UserModel.findUser(username);
        const isPasswordValid = await verifyPassword(password, userData.password);
    
        if (!isPasswordValid) {
            // const err = new Error('Invalid Credentials');
            // err.status= 401;
            // throw err;
            errorCreator('Invalid Credentials', 401);
        }
        
        const token = generateToken(userData);
        // save the token in cookie
        res.cookie("authToken", token, {
            maxAge: 3600_000,
            httpOnly: true,
        })
        // res.send({ message: `${userData.name} is logged in successfully`, data: userData});
        res.send(responseCreator(`${userData.name} is logged in successfully`, sanitizeUserdata(userData) ));
        
    } catch (error) {
        next(error);
    }
};

const loginWithCookie = async (req, res, next) => {
    try {
        const { authToken } = req.cookies;
        const { username } = verifyToken(authToken);
        const userData = await UserModel.findUser(username);

        res.send(responseCreator("logged In with cookie successfully", sanitizeUserdata(userData)));
    } catch (error) {
        next(error);
    }
}

/** 
 * @params {Request} req
 * @params {Response} res
 * @params {*} next
 */
const logout = async (req, res, next) => {
    try {
        res.clearCookie("authToken");
        res.locals= {};
        res.send(responseCreator("Logged out successfully"));
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    const { username, newPassword, otp } = req.body;
    const { secret } = await UserModel.findUser(username);
    const userdata = await UserModel.findUser(username);
    const isVerified = verifyOtp( userdata.secret, otp);

    if (isVerified) {

        const isPasswordSame = await verifyPassword( newPassword, userdata.password);
        if (isPasswordSame) {
            errorCreator("New password cannot be as same as old password", 400);
        }

        const pwdhash = await genPasswordHash(newPassword);
        const isUpdated = await UserModel.updatePassword(username, pwdhash);
        if (isUpdated) {
            res.send(
                responseCreator("Password reset successfully")
            );
        }
    } else {
        errorCreator("Invalid OTP", 400);
    }
};

module.exports = {
    signup,
    login,
    loginWithCookie,
    logout,
    resetPassword,
};
