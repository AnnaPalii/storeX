const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    startDate: { type: Date},
    endDate: {type: Date},
    requestingUser: {type: String},
    requestingUserId: {type: String},
    requested: {type: Boolean, default: false }
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;