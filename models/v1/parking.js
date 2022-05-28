const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
  },
});

const Parking = (module.exports = mongoose.model('Parking', ParkingSchema));
