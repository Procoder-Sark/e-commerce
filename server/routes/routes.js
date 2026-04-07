const express = require ('express');
const { signup, login } = require('../controllers/userController');
const router = express.Router();

router.get('/', (req,res)=> {
    res.send("Response from the router");
});

router.post('/product/:id', (req,res)=> {
    const UserData = req.body;
    console.log(UserData);
    console.log(req.query);
    console.log(req.params);
    console.log(req.path);

    res.send({
        success: true,
        message: `${UserData.name} is signed up successfully`,
    });
});

router.post("./signup", signup);
router.post("./login", login);

//export default router
module.exports =router ;