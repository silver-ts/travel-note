const { Schema, model } = require('mongoose');

// GeoJSON point schema
// Read more: https://mongoosejs.com/docs/geojson.html
const PointSchema = new Schema({
  country: String,
  place: String,
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: ['Number'],
    required: true,
  },
});

// Log entry schema
const LogEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  location: {
    type: PointSchema,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const LogEntry = model('log', LogEntrySchema);

module.exports = LogEntry;
