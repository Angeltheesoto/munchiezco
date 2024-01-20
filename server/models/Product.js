const mongoose = require("mongoose");

/*
    "image": "",
    "title": "",
    "desc": "",
    "price": "",
    "quantity": ""
*/

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
      require: false,
    },
    title: {
      type: String,
      require: true,
      max: 50,
      min: 0,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    quantity: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
