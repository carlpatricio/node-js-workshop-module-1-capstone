import mongoose from 'mongoose';
import { SensorData } from '../model/sensorData.model.js';

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

const handleDatachanges = (data) => {
    const { fullDocument } = data;

    console.log({ fullDocument })
}