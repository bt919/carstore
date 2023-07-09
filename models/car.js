const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Decimal128, required: true },
  brand: { type: Schema.Types.ObjectId, required: true },
  type: { type: String },
  description: { type: String, required: true },
  colors: [{ type: String, required: true }],
  hp: { type: Decimal128, required: true },
  torque: { type: Decimal128, required: true },
  engine: { type: String, required: true },
  transmission: { type: String, enum: ["Automatic", "Manual"], required: true },
});

CarSchema.virtual("url").get(function () {
  return `/${this.brand}/${this.name}/${this._id}`;
});

module.exports = mongoose.model("Car", CarSchema);
