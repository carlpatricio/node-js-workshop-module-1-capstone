import mongoose from 'mongoose';
import { SensorData } from '../model/sensorData.model.js';
import { HUMIDITY_EMAIL_TEXT, HUMIDITY_THRESHOLD } from './constants.js';
import { logger } from './logger.js';
import { sendEmail } from './mail.js';

export const startDatabase = async () => {
    const mongoUri = await getServerURI();
    /**
     * Database connect
     */
    try {
        await mongoose.connect(`${mongoUri}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info(`Database connected using this URI: ${mongoUri}`)
        SensorData.watch().on('change', handleDatachanges)
    }
    catch (e) {
        logger.error(`Database connection err: ${mongoUri} - ${e.message}`)
    }
}

export const getServerURI = async () => {
    const { NODE_ENV: env, MONGODB_DB_NAME: dbName } = process.env
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
    logger.info('Checking humidity percentage....')
    if (humidityPercent > HUMIDITY_THRESHOLD) {
        const html = `Humidity Percent hit <b>${humidityPercent}</b> above our ${HUMIDITY_THRESHOLD} threshold`;
        const res = await sendEmail({
            text: HUMIDITY_EMAIL_TEXT,
            to: process.env.RECEIVER_EMAIL,
            text: "test",
            html
        });

        logger.info(`Humidity Percent Threshold email notif sent`);
        return res;
    }
    logger.info(`Humidity Percentage is normal ${humidityPercent}`);
}