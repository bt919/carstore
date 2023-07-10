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

const BrandSchema = new Schema({
  name: { type: String, required: true },
  cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  logoURL: { type: String, required: true },
});

BrandSchema.virtual("url").get(function () {
  return `/${this.name}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
