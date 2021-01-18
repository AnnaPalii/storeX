const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	username: { type: String, required: true },
	body: { type: String, required: true },
	zipcode: { type: String, required: true },
	date: { type: Date, default: Date.now },
	status: [
		{
			// type: Schema.Types.ObjectId,
			// ref: "Status"
			startDate: { type: Date},
			endDate: {type: Date},
			requestingUser: {type: String},
			requestingUserId: {type: String},
			requested: {type: Boolean, default: false }
		}

	]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
