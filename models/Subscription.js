const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
	username: { type: String, required: true },
	subscriptionName: { type: String, required: true },
	paymentAmount: { type: Number, required: true },
	logo: { type: String }

});

// subscriptionSchema.index({ username: 1, type: -1 });
// subscriptionSchema.index({ username: 1, subscriptionName: 1, paymentAmount: 1 }, { unique: true });  

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;