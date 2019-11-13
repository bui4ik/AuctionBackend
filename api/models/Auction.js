const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  startPrice: {
    type: Number,
    required: true,
  },
  minBid: {
    type: Number,
    required: true
  },
  hostId: {
    type: Schema.Types.ObjectID,
    required: true
  },
  itemId: {
    type: Schema.Types.ObjectID,
    required: true
  },
  users: {
    type: [Schema.Types.ObjectID],
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Auction', auctionSchema);
