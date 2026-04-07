const mongoose = require('mongoose');
const errorHandler = require('../utils/errorHandler');
const { Schema,
    Types: { Decimal128 },
 } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'is required']
    },
    name: {
        type: String,
        required: [true, 'is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'is required']
    },
    password: {
        type: String,
        required: [true, 'is required']
    },
    cart: {
        items: [Object],
        totalQuantity: { type: Number, default: 0},
        totalPrice: { 
            type: Decimal128,
            get: (v) => parseFloat(v),
            set: (v) => new Decimal128(v.toFixed(2)),
             default: 0
            },
        // totalPrice: Schema.Types.Decimal128,
    },
    role: {
        type: String,
        default: "user",
    },
    secret: String,
},
{
    toObject: {
        getters: true,
    }
});

const sanitizeUserdata = (userdata, key=[] ) =>{
    const {password, secret, ...sanitizeUserdata} = userdata.toObject();
    if (key) {
        return sanitizeUserdata[key];
    }
    return sanitizeUserdata;
};

userSchema.statics.findUser = async function (username) {
    const user = await this.findOne({ username }, { _id: 0, __v: 0 });
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
        
    }

    return user;

};

userSchema.statics.createUserAcc = async function (userdata) {
    const user = await this.create(userdata);
    return user;

};



userSchema.statics.updatePassword = async function (username, password) {
    const data = await UserModel.updateOne(
        { username },
        {
            $set: { password },
        },
    );

    if (data.modifiedCount) {
        return true;
    }
};

// Cart related operations

userSchema.statics.getCartItems = async function (username) {
    const user = await this.findOne({username}, {cart: 1});
    return sanitizeUserdata(user, "cart");
};

userSchema.statics.clearCart = async function (username) {
    const user = await this.findOneAndUpdate(
        { username },
        {
            $set: {
                cart: {
                    items: [],
                    totalQuantity: 0,
                    totalPrice: 0,
                }
            }
        },
        { new: true },
    );

    return sanitizeUserdata(user, "cart");
};

userSchema.statics.addToCart = async function (username, product) {
    const user = await this.findOneAndUpdate(
        { username },
        {
            $addToSet: {
                "cart.items": { ...product},
            },
            $inc: {
                "cart.totalQuantity": 1,
                "cart.totalPrice": product.price,
            },
        },
        {
            new: true,
        },
    );
    return sanitizeUserdata(user, "cart");
};


userSchema.statics.removeFromCart = async function (username, product) {
    const  userdata = await this.aggregate([
           {
        $match: { username }
    },
    {
        $unwind: {path: "$cart.items"}
    },
    {
        $match: {"cart.items.id": product.id}
    },
    {
        $project: {
          "cart.items.quantity" : true,
          "cart.items.price": true,
        }
    }
    ]);

    const cart = userdata[0].cart;

    const user = await this.findOneAndUpdate(
        { username, },
        {
            $pull: {
                "cart.items": {id: product.id},
            },
            $inc: {
                "cart.totalQuantity": - cart.items?.quantity,
                "cart.totalPrice": - cart.items?.price * cart.items?.quantity,
            },
        },
        {
            new: true,
        },
    );
    return sanitizeUserdata(user, "cart");
};

userSchema.statics.increment = async function (username, product) {
    const user = await this.findOneAndUpdate(
        { username, "cart.items.id" : product.id },
        {
            $inc: {
                "cart.totalQuantity": 1,
                "cart.items.$.quantity": 1,
                "cart.totalPrice": product.price,
                "cart.items.$.price": product.price,
            },
        },
        {
            new: true,
        },
    );
    return sanitizeUserdata(user, "cart");
};

userSchema.statics.decrement = async function (username, product) {
    const updatedData = await this.findOneAndUpdate(
        { username, "cart.items.id" : product.id },
        {
            $inc: {
                "cart.totalQuantity": -1,
                "cart.items.$.quantity": -1,
                "cart.totalPrice": -product.price,
                "cart.items.$.price": -product.price,
            },
        },
        {
            new: true,
        },
    );

    const productInCart = updatedData.cart.items.find(({ id }) => product.id === id);

    if ( productInCart.quantity === 0 ) {
        return this.removeFromCart(username, product);
    }
    return sanitizeUserdata(updatedData, "cart");
};

const UserModel = mongoose.model("User ", userSchema);


module.exports = {
    UserModel,
    sanitizeUserdata,
};

// const user = {
//     username: "test",
//     name: "test user",
//     email: "test@example.com",
//     password: "testpassword"
// };

// (async () => {
//     const data = await UserModel.findUser('test');
//     console.log("user data",data);
// })();

// (async () => {
//     const data = await UserModel.createUserAcc(user);
//     console.log("user data",data);
// })();