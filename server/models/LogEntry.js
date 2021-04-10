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

// Personal data collection for each user
const UserLogEntriesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  logs: [ { type: Schema.Types.ObjectId, ref: 'log' } ],
}, {
  timestamps: true,
});

const LogEntry = model('log', LogEntrySchema);
const UserLogEntries = model('userLog', UserLogEntriesSchema);

module.exports = { LogEntry, UserLogEntries };
