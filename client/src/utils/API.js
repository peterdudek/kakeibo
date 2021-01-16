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
};
