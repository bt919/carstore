const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  logoURL: { type: String, required: true },
});

BrandSchema.virtual("url").get(function () {
  return `/${this.name}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
