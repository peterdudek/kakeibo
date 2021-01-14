const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
	username: { type: String, required: false },
	subscriptionName: { type: String, required: false },
	paymentAmount: { type: Number, required: false },

});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;