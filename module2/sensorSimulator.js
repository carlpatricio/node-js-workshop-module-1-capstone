import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';
import { SensorData } from './src/model/sensorData.model.js';
import { getServerURI } from './src/util/connection.js';
// Load environment variables
dotenv.config();

const startDB = async () => {
    const mongoUri = await getServerURI();
    console.log({ mongoUri })
    // Connect to your MongoDB database
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
startDB();

// Function to generate random sensor data
function generateSensorData() {
    const data = new SensorData({
        timestamp: new Date(), // current time
        location: `Location${Math.floor(Math.random() * 3) + 1}`, // random location
        temperature_celsius: (Math.random() * 15) + 20, // random temperature between 20 and 35
        humidity_percent: Math.floor(Math.random() * 100), // random humidity
        pressure_hpa: Math.floor(Math.random() * 50) + 970 // random pressure between 970 and 1020
    });
    return data;
}

// Scheduled task for sensor data simulation
// This cron job is set to run every 10 minutes. You can adjust the timing as needed.
cron.schedule('* * * * *', async function () {

    try {
        // Create new sensor data
        const newSensorData = await generateSensorData();

        // Save this data to your database
        await newSensorData.save();
        console.log(`Generating simulated sensor data... ${new Date()}`);
    }
    catch (err) {
        console.log({ err })
    }
});

// Keep the script running
setInterval(() => { }, 1000);
