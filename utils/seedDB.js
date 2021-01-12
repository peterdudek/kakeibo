const mongoose = require("mongoose");
const db = require("../models");
const { mongoOptions } = require("./config")

// This file empties the Books collection and inserts the books below


mongoose.connect(process.env.ATLAS_URL || "mongodb://localhost/mern",
    mongoOptions
);

const userSeed = {
    username: "Admin",
    email: "admin@contact.us",
    password: "1"
};
const subscriptionsSeeds = [{
        body: "🚀 initial seed",
        username: "Admin"
    },
    {
        body: "👾 another",
        username: "Admin"
    },

];

// remove all comments
// db.Comment.deleteMany({})
db.Subscription.deleteMany({})
    // remove all users
    .then(() => db.User.deleteMany({}))
    // add user
    .then(() => db.User.create(userSeed))
    // add comments seeds
    .then((user) => db.Subscription.create(subscriptionsSeeds[0])
        // add comment ref to user
        .then(({ _id }) => db.User.findOneAndUpdate({ _id: user._id }, { $push: { subscriptions: _id } }, { new: true }))
    )
    .then((user) => db.Subscription.create(subscriptionsSeeds[1])
        // add comment ref to user
        .then(({ _id }) => db.User.findOneAndUpdate({ _id: user._id }, { $push: { subscriptions: _id } }, { new: true }))
    )
    .then(() => {
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });