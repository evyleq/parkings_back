const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = Schema(
  {
    parking: {
      type: Schema.Types.ObjectId,
      ref: 'Parking',
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Log = (module.exports = mongoose.model('Log', LogSchema));
