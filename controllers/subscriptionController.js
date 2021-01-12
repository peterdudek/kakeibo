const db = require("../models");

// Defining methods for the subscriptionController

module.exports = {
  findAll: function(req, res) {
    db.Subscription
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
     console.log(req.params.id)
    db.Subscription
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
     // if no user on the session
     if(!req.user) return res.status(401).end('user isnt authenticated')

     db.Subscription
      .create({...req.body, email: req.user.email})
      .then(({_id}) => db.User.findOneAndUpdate({_id: req.user._id}, { $push: { Subscriptions: _id } }, { new: true }))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
     db.Subscription
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
     db.Subscription
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};