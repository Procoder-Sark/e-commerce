const errorHandler = (err, req, res, next) => {
    console.log('Error from ErrorHAndler');
    console.log(err);
    console.log(err.code);

    // if (err.code === 11000) {
    //     res.status(400);
    //     res.send({
    //         success: false,
    //         message: 'username already exists',
    //     });
    // };
    if (err.message == "jwt expired") {
        err.status = 401;
        err.message = "Session expired, please login again";
    }
    if (err.code === 11000) {
        err.status = 409;
        if (err.keyPattern.username) {
            err.message = 'Username already exists';
        }else if (err.keyPattern.email) {
            err.message = 'Email already exists';
        }
    }
    
    res.status(err.status || 500).send({
        success: false,
        message: err.message,
    });
}

module.exports = errorHandler;