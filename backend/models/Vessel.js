const { Schema, model } = require('mongoose');


const VesselSchema = new Schema({   
    Bale: {
        type: String,
        required: true
    },
    Beam_m: {
        type: String,
        required: true
    },
    Builder: {
        type: String,
        required: true
    },
    Classification_Society: {
        type: String,
        required: true
    },
    Crude_Oil_bbl: {
        type: String,
        required: true
    },
    Distance__Time: {
        type: String,
        required: true
    },
    Draught_m: {
        type: String,
        required: true
    },
    Flag: {
        type: String,
        required: true
    },
    Gas_m3: {
        type: String,
        required: true
    },
    Grain: {
        type: String,
        required: true
    },
    Gross_Tonnage: {
        type: String,
        required: true
    },
    Homeport: {
        type: String,
        required: true
    },
    IMO_number: {
        type: String,
        required: true
    },
    Lat: {
        type: Number,
        required: true
    },
    Length_Overall_m: {
        type: String,
        required: true
    },
    Lon: {
        type: Number,
        required: true
    },
    Manager: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
        required: true
    },
    Place_of_Built: {
        type: String,
        required: true
    },
    Predicted_ETA: {
        type: String,
        required: true
    },
    Registered_Owner: {
        type: String,
        required: true
    },
    Ship_type: {
        type: String,
        required: true
    },
    Source: {
        type: String,
        required: true
    },
    Summer_Deadweight_t: {
        type: String,
        required: true
    },
    TEU: {
        type: String,
        required: true
    },
    Vessel_Name: {
        type: String,
        required: true
    },
    Yard: {
        type: String,
        required: true
    },
    Year_of_Built: {
        type: String,
        required: true
    },
});

module.exports = model('Vessel', VesselSchema );