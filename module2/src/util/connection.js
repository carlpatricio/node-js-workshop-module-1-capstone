import mongoose from 'mongoose';
import { SensorData } from '../model/sensorData.model.js';
import { HUMIDITY_EMAIL_TEXT, HUMIDITY_THRESHOLD } from './constants.js';
import { sendEmail } from './mail.js';

export const startDatabase = async () => {
    const mongoUri = await getServerURI();
    /**
     * Database connect
     */
    mongoose.connect(`${mongoUri}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    /**
     * on open connection
     */
    mongoose.connection.on('open', () => {
        console.log(`Database connected using this URI: ${mongoUri}`)

        SensorData.watch().
            on('change', handleDatachanges)
    })
    /**
     * on close connection
     */
    mongoose.connection.on('close', () => {
        console.log("mongodb connection close");
    })
}

export const getServerURI = async () => {
    const { NODE_DEVELOPMENT: env, MONGODB_DB_NAME: dbName } = process.env
    switch (env) {
        case 'dev':
            const rawURI = process.env[`MONGODB_URI_${env.toUpperCase()}`].split('?')
            /**
             * insert db name on mongo db repl set uri
             */
            return `${rawURI[0]}${dbName}?${rawURI[1]}`;
        default:
            return `${process.env[`MONGODB_URI_${env.toUpperCase()}`]}/${dbName}`;
    }
}

const handleDatachanges = async (data) => {
    const { humidity_percent } = data.fullDocument;

    handleHumidity(humidity_percent);
    /**
     * TODO: add more sensor data handling
     * refer to handleHumidity
     */
}

const handleHumidity = async (humidityPercent) => {
    console.log('Checking humidity percentage....')
    if (humidityPercent > HUMIDITY_THRESHOLD) {
        const html = `Humidity Percent hit <b>${humidityPercent}</b> above our`;
        const res = await sendEmail({
            text: HUMIDITY_EMAIL_TEXT,
            to: process.env.RECEIVER_EMAIL,
            text: "test",
            html
        });

        console.log(`Humidity Percent Threshold email notif sent`);
        return;
    }
    console.log(`Humidity Percentage is normal ${humidityPercent}`);
}