const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const codeSchema = new Schema({
  creator: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
  },
  html: {
    type: String,
  },
  css: {
    type: String,
  },
  js: {
    type: String,
  },
});
codeSchema.index({ name: 1, creator: 1 }, { unique: true });

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
