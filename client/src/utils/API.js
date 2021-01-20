import axios from "axios";

export default {
  // Gets all subscriptions
  getSubscriptions: function() {
    return axios.get("/api/subscriptions");
  },

  getUserSubscriptions: function() {
    return axios.get("/api/subscriptions/user");
  },
  // Gets the subscription with the given id
  getSubscription: function(id) {
    return axios.get("/api/subscriptions/" + id);
  },
  // Deletes the subscription with the given id
  deleteSubscription: function(id) {
    return axios.delete("/api/subscriptions/" + id);
  },
  // Saves a subscription to the database
  saveSubscription: function(subscriptionData) {
    return axios.post("/api/subscriptions", subscriptionData);
  },
    // Saves a subscription to the database
    // saveSubscription2: function(subscriptionData) {
    //   return axios.post("/api/subscriptions/", subscriptionData);
    // }

  
  // retrieve API logo
  // requestLogo: function (subscriptionName) {
  //   return axios.get(`https://logo.clearbit.com/${subscriptionName}`);
  // },

  // // Saves Logo to the DB
  // saveLogo: function (LogoData) {
  //   return axios.post("/api/Logos", LogoData);
  // },
  // // Gets saved Logos from DB
  // getLogos: function () {
  //   return axios.get("/api/Logos");
  // },
  // // Gets Logo with the given ID
  // getLogo: function (id) {
  //   return axios.get("/api/Logos/" + id);
  // },
  // // Deletes Logo with the given ID
  // deleteLogo: function (id) {
  //   return axios.delete("/api/Logos/" + id);
  // }

};

  

