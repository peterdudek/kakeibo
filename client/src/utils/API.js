import axios from "axios";

export default {
  // Gets all subscriptions
  getSubscriptions: function() {
    return axios.get("/api/subscriptions");
  },
  // Gets the comment with the given id
  getComment: function(id) {
    return axios.get("/api/subscriptions/" + id);
  },
  // Deletes the comment with the given id
  deleteSubscription: function(id) {
    return axios.delete("/api/subscriptions/" + id);
  },
  // Saves a comment to the database
  saveSubscription: function(subscriptionData) {
    return axios.post("/api/subscriptions", subscriptionData);
  }
};
