import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    disciplines: {
        type: [String],
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true // creates the CreatedAt and UpdatedAt values for each instance
    });

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
export default ServiceProvider;