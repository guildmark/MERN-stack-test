var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var listSchema = new Schema({
    type: {type: String, required: true},
    headline: {type: String, required: true},
    content: {type: String, required: false},
    key: {type: Number, unique: true}
});

var List = mongoose.model("List", listSchema);

module.exports = List;