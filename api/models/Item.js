const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  userId: {
    type: Schema.Types.ObjectID,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  onAuction: {
    type: Boolean,
    default: false
  },
  isSold: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Item', itemSchema);
