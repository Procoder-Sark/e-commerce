/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.

// db.sales.drop();
// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
    { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
    { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
    { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
    { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
    { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
    { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
    { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
    { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

//db.createCollection(user)

//SELECT * FROM TABLE
// db.sales.find({item: "abc"});
use('mongodbVSCodePlaygroundDB');
// db.sales.find({},{item:1,price:1,_id:0});

// Comparision Operator:-
/**
 *  $gt- greater than
 *  $lt- less than
 * $gte- greater than or equal to
 *  $lte- less than or equal to
 * $ne- not equal to
 */

db.sales.find({ quantity: { $gte: 5 } }, { _id: 0 });

// Multiple conditions
//$or
//$and

db.sales.find({
    $or: [
        { quantity: { $lt: 5 } },
        { price: { $gte: 10 } }
    ]
}, { _id: 0, date: 0 });

db.sales.find({
    $and: [
        { quantity: { $lt: 5 } },
        { price: { $gte: 10 } }
    ]
}, { _id: 0, date: 0 });

// we can also use and operator without $and
db.sales.find({
    quantity: { $lt: 5 },
    price: { $gte: 10 }
}, { _id: 0, date: 0 });

//Update quieries
//updateOne - to update a single document
//updateMany - to update multiple documents
//replaceOne - to replace a single document

db.sales.updateMany({ quantity: { $lt: 5 } },
    {
        $inc: { quantity: 10 }
        //to decrease the quantity we can use $inc: {quantity: -10}
    }
);

db.sales.find({}, { _id: 0, date: 0 });

//discount of 10% on items with price greater than or equal to 10
db.sales.updateMany({ price: { $gte: 10 } },
    {
        $mul: { price: 0.9 }
    }
);

db.sales.find({}, { _id: 0, date: 0 });

// to set something $set
db.sales.updateMany({ price: { $gte: 9 } },
    {
        $set: { discount: "10%" }
        // to remove a field we can use$ unset: {discount: ""}
    }
);

db.sales.find({}, { _id: 0, date: 0 });

// const product1 = {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//         "rate": 3.9,
//         "count": 120
//     },
//     quantity: 1
// };

// const product2 = {
//     "id": 2,
//     "title": "Mens Casual Premium Slim Fit T-Shirts ",
//     "price": 22.3,
//     "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
//     "rating": {
//         "rate": 4.1,
//         "count": 259
//     },
//     quantity: 1
// };

const user = {
    username: "sark",
    cart: [product1, product2,]
};

// db.users.drop();
db.users.insertOne(user);

const p3 = {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    "rating": {
        "rate": 4.7,
        "count": 500
    }
};

//array operators

// db.users.find();

/** 
 * $push - to add an element to an array
 * $pull - to remove an element from an array
 * $pullAll - to remove multiple elements from an array
 * $addToSet - to add an element to an array only if it doesn't already exist in the array
 * $pop - to remove the first or last element of an array
 * $each - to add multiple elements to an array
 */

db.users.findOneAndUpdate(
    { username: "sark" },
    {
        $push: { cart: { ...p3, quantity: 1 } }
    },
    { new: true }
);

// db.users.findOneAndUpdate(
//     {username: "sark", "cart.id": 3},// cart.id is use when we do position update
//     {
//         $inc: {"cart.$.quantity": 1}
//     },
//     {new: true}
// );

// db.users.findOneAndUpdate(
//     {username: "sark"},
//     {
//         $pull: {"cart": {id: 2}}
//     },
//     {new: true}
// );

// db.users.findOneAndUpdate(
//     {username: "sark"},
//     {
//         $set: {discount: ["HDFC", "ICICI", "SBI", "AXIS"]}
//     },
//     {new: true}
// );

// db.users.findOneAndUpdate(
//     {username: "sark"},
//     {
//         $pullAll: {discount: ["HDFC", "ICICI"]}
//     },
//     {new: true}
// );

// db.users.findOneAndUpdate(
//     {username: "sark"},
//     {
//         $pullAll: {cart: [product1, product2]}
//     },
//     {new: true}
// );

db.users.findOneAndUpdate(
    { username: "sark" },
    {
        $pull: { cart: { id: { $in: [1, 2] } } }
    },
    { new: true }
);

db.users.aggregate([
    {
        $match: { username: "sark" }
    },
    {
        $addFields: {
            "cart.totalQuantity": {
                $reduce: {
                    input: "$cart.items",
                    initialValue: 0,
                    in: {
                        $add: ["$$value", "$$this.quantity"],
                    },
                },
            },
            "cart.totalPrice": {
                $round: [
                    {
                        $reduce: {
                            input: '$cart.items',
                            initialValue: 0,
                            in: {
                                $add: ["$$value", { $multiply: ["$$this.price", '$$this.quantity'] }],
                            },
                        },
                    },
                    2,
                ],
            },

        },
    },
]);

db.users.find();
db.sales.find();

var product1 = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "rating": {
        "rate": 3.9,
        "count": 120
    },
    quantity: 1
};

// var product2 = {
//     "id": 2,
//     "title": "Mens Casual Premium Slim Fit T-Shirts ",
//     "price": 22.3,
//     "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
//     "rating": {
//         "rate": 4.1,
//         "count": 259
//     },
//     quantity: 1
// };

// db.users.findOneAndUpdate(
//     { username: 'reset'},
//     {
//         $addToSet: {
//             "cart.items": { ...product1, quantity: 1 },
//         },
//          $inc: {
//                 "cart.totalQuantity": 1,
//                 "cart.totalPrice": product1.price,
//             },
             
//         },
//         { new: true}, 
// );

db.users.findOne({ username: "test","cart.items.id": product1.id });
db.users.findOne({ username: "test" });

db.users.aggregate([
    {
        $match: { username: "sark", "cart.items.id": 1}
    },
    {
        $unwind: {path: "$cart.items"}
    },
    {
        $match: {"cart.items.id": 1}
    },
    {
        $project: {
          "cart.items.totalQuantity" : true,
          "cart.items.totalPrice": true,
        }
    }
]);

// userSchema.statics.increment = async function (username, product) {
//     const user = await this.findOneAndUpdate(
//         { username, "cart.items.id" : product.id },
//         {
//             $inc: {
//                 "cart.totalQuantity": 1,
//                 "cart.items.$.quantity": 1,// $-> we use when we want to update a specific element in an array that matches the query condition
//                 "cart.totalPrice": product.price,
//                 "cart.items.$/price": product.price,
//             },
//         },
//         {
//             new: true,
//         },
//     );
//     return user.cart;
// };