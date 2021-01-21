const db = require("../models");
const axios = require("axios");

// Defining methods for the subscriptionsController

module.exports = {
  findAll: function (req, res) {
    console.log("Helloo!!!!")
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/basic',
      params: {
        country: 'us',
        service: 'netflix',
        type: 'movie',
        genre: '18',
        page: '1',
        language: 'en'
      },
      headers: {
        'x-rapidapi-key': 'f8d236ea2fmsh9302102012b2447p1c24d0jsnf3561bc132e8',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
  
      console.log(response);
      // return (response.data.results[0].originalTitle);
      res.json(response.data)

      
    }).catch(function (error) {
      console.error(error);
    });

    console.log(req.user)
    // db.Show
    //   .find({})
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },

  // findOne: function (req, res) {
  //   console.log(req.user)
  //   db.User
  //     .find({
  //       _id: req.user._id
  //     })
  //     .populate("subscription")
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  // findById: function (req, res) {
  //   console.log(req.params.id)
  //   db.Subscription
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  // create: function (req, res) {
  //   // const boddy = req.subscriptionName
  //   // if no user on the session
  //   if (!req.user) return res.status(401).end('user isnt authenticated')
  //   // console.log("Here: ", req.body)
  //   db.Subscription
  //     // .createIndex({ email: 1 }, { unique: true })
  //     // subscriptionSchema.index({ username: 1, subscriptionName: 1, paymentAmount: 1 }, { unique: true });  
  //     // .createIndexes({ username: 1, subscriptionName: 1, paymentAmount: 1 }, { unique: true }) 
  //     .create(req.body)
  //     // .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { subscription: _id } }, { new: true }))
  //     .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { subscription: _id } }, { new: true }))
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  

};