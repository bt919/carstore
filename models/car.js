const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
});

CarSchema.virtual("url").get(function () {
  return `/${this.brand}/${this.name}/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
