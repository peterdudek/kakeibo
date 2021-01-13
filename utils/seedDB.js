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

// username: { type: String, required: true },
// 	subscriptionName: { type: String, required: true },
// 	paymentAmount: { type: Number, required: true },
//    date: { type: Date, default: Date.now },


const subscriptionsSeeds = [{
        username: "Admin",
        subscriptionName: "Netflix",
        paymentAmount: "$8.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Hulu",
        paymentAmount: "$5.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Amazon Prime",
        paymentAmount: "$8.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Youtube TV",
        paymentAmount: "$64.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Sling",
        paymentAmount: "$30",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "CBS All Access",
        paymentAmount: "$5.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Showtime",
        paymentAmount: "$9",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Apple TV",
        paymentAmount: "$9",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Disney +",
        paymentAmount: "$6.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Spotify",
        paymentAmount: "$9.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Playstation +",
        paymentAmount: "$6.99",
        date: { type: Date, default: Date.now },
    },
    {
        username: "Admin",
        subscriptionName: "Nintendo Swtich Online",
        paymentAmount: "$3.99",
        date: { type: Date, default: Date.now },
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