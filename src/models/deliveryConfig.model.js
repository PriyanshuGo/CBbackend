import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pincode: { type: String, required: true },
});

const deliveryConfigSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    city: { type: String, required: true },
    areas: [areaSchema],
    deliveryCharge: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const DeliveryConfig = mongoose.model("DeliveryConfig", deliveryConfigSchema);
export default DeliveryConfig;
