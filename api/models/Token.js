const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectID,
    required: true
  }
});

module.exports = mongoose.model('Token', tokenSchema);
