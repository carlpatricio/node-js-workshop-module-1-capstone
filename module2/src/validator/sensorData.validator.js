import Joi from "joi";

export const sensorDataValidator = Joi.object({
    location: Joi.string().required().max(25),
    temperature_celsius: Joi.number().required().min(0),
    humidity_percent: Joi.number().required().min(0),
    pressure_hpa: Joi.number().required().min(0)
});