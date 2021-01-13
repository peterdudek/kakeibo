const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
	username: { type: String, required: true },
	subscriptionName: { type: String, required: true },
	paymentAmount: { type: String, required: true },

});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;