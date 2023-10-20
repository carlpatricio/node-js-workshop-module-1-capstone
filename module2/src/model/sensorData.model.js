import { model, Schema } from 'mongoose';


const SensorDataSchema = new Schema({
    timestamp: Date,
    location: String,
    temperature_celsius: Number,
    humidity_percent: Number,
    pressure_hpa: Number
});

export const SensorData = model('SensorData', SensorDataSchema);