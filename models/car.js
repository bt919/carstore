const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: Schema.Types.ObjectId, required: true, ref: "Brand" },
  description: { type: String, required: true },
  hp: { type: Number, required: true },
});

CarSchema.virtual("url").get(function () {
  return `/${this.brand}/${this.name}/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
