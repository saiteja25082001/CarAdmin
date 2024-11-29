// models/Order.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    make: String,
    model: String,
    year: Number,
    mileage: String,
    itemCondition: String,
    availability: String,
    vin: String,
    bodyType: String,
    color: String,
    driveWheelConfiguration: String,
    numberOfDoors: Number,
    fuelType: String,
    vehicleEngine: String,
    vehicleSeatingCapacity: Number,
    vehicleTransmission: String,
    cylinders: Number,
    carFeature: [String],
    carSafetyFeature: [String],
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const bookingModel = mongoose.models.Order || mongoose.model("Booking", bookingSchema);

export default bookingModel;
