const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dev_db_url =
  "mongodb+srv://admin:goblinsob9@cluster0.9icyhlu.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

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
