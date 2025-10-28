import DeliveryConfig from "../models/deliveryConfig.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

// Admin can add or update delivery config
export const upsertDeliveryConfig = async (req, res, next) => {
  try {
    const { state, city, areas, deliveryCharge, isActive } = req.body;

    const config = await DeliveryConfig.findOneAndUpdate(
      { state, city },
      { areas, deliveryCharge, isActive },
      { upsert: true, new: true }
    );

    return apiResponse(res, 200, config, "Delivery configuration updated");
  } catch (err) {
    next(err);
  }
};

// Fetch all delivery configurations
export const getDeliveryConfigs = async (req, res, next) => {
  try {
    const configs = await DeliveryConfig.find({ isActive: true });
    return apiResponse(res, 200, configs, "Active delivery areas fetched");
  } catch (err) {
    next(err);
  }
};

// Check if a particular pincode is serviceable
export const checkDeliveryAvailability = async (req, res, next) => {
  try {
    const { pincode } = req.query;
    const found = await DeliveryConfig.findOne({
      "areas.pincode": pincode,
      isActive: true,
    });

    if (!found) return next(apiError(404, "Delivery not available for this area"));

    return apiResponse(res, 200, found, "Delivery available");
  } catch (err) {
    next(err);
  }
};
