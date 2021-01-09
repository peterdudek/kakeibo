const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
	subscriptionName: { type: String, required: true },
	paymentAmount: { type: Number, required: true },

});

const Subscription = mongoose.model("Subscription", subsriptionSchema);

module.exports = Subscription;