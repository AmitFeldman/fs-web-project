import {Schema, model} from 'mongoose';

const LocationSchema = new Schema({
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Location = model('locations', LocationSchema);

export default Location;
