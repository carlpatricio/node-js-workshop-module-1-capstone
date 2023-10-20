import mongoose from 'mongoose';
import { SensorData } from '../model/sensorData.model.js';

export const startDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    SensorData.watch().
        on('change', (data) => console.log({ data }))
}