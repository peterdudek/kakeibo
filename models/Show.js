const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
	// username: { type: String },
	showName: { type: String },


});


const Show = mongoose.model("Show", showSchema);

module.exports = Show;