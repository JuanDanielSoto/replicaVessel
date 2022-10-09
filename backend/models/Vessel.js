const { Schema, model } = require('mongoose');


const VesselSchema = new Schema({
    Bale: {
      type: String,
      required: false
    },
    coords: {
      type: Boolean,
      required: false
    },
    photoReal: {
      type: Boolean,
      required: false
    },
    Beam_m: {
      type: String,
      required: false
    },
    Builder: {
      type: Number,
      required: false
    },
    Built: {
      type: String,
      required: false
    },
    Classification_Society: {
      type: String,
      required: false
    },
    Crude_Oil_bbl: {
      type: String,
      required: false
    },
    DWT: {
      type: Number,
      required: false
    },
    Distance__Time: {
      type: String,
      required: false
    },
    Draught_m: {
      type: String,
      required: false
    },
    Flag: {
      type: String,
      required: false
    },
    GT: {
      type: Number,
      required: false
    },
    Gas_m3: {
      type: String,
      required: false
    },
    Grain: {
      type: String,
      required: false
    },
    Gross_Tonnage: {
      type: String,
      required: false
    },
    Homeport: {
      type: String,
      required: false
    },
    IMO_number: {
      type: String,
      required: false
    },
    Lat: {
      type: Number,
      required: false
    },
    Length_Overall_m: {
      type: String,
      required: false
    },
    Lon: {
      type: Number,
      required: false
    },
    Manager: {
      type: String,
      required: false
    },
    Photo: {
      type: String,
      required: false
    },
    Place_of_Built: {
      type: String,
      required: false
    },
    Predicted_ETA: {
      type: String,
      required: false
    },
    Registered_Owner: {
      type: String,
      required: false
    },
    Ship_type: {
      type: String,
      required: false
    },
    Size_m: {
      type: String,
      required: false
    },
    Source: {
      type: String,
      required: false
    },
    Summer_Deadweight_t: {
      type: String,
      required: false
    },
    TEU: {
      type: String,
      required: false
    },
    Vessel_Name: {
      type: String,
      required: false
    },
    Yard: {
      type: String,
      required: false
    },
    Year_of_Built: {
      type: Number,
      required: false
    }
});

module.exports = model('Vessel', VesselSchema );