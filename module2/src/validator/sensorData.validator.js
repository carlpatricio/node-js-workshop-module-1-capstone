import Joi from "joi";

export const sensorDataValidator = Joi.object({
    location: Joi.string().required().min(3).max(25),
    temperature_celsius: Joi.number().required().min(0),
    humidity_percent: Joi.number().required().min(0),
    pressure_hpa: Joi.number().required().min(0)
});

export const updateSensorDataValidator = Joi.object({
    location: Joi.string().max(25).optional(),
    temperature_celsius: Joi.number().min(0).optional(),
    humidity_percent: Joi.number().min(0).optional(),
    pressure_hpa: Joi.number().min(0).optional()
});