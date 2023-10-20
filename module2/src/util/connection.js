import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { SensorData } from '../model/sensorData.model.js';

export const startDatabase = async () => {
    const mongoUri = await getServerURI();
    console.log(`Database connected using this URI: ${mongoUri}`)
    mongoose.connect(`${mongoUri}`);
    mongoose.connection.on('open', () => {
        console.log("mongodb connection open");
    })
    SensorData.watch().
        on('change', (data) => console.log({ data }))
}

const getServerURI = async () => {
    const { NODE_DEVELOPMENT: env, MONGO_MEMORY_SERVER_PORT } = process.env
    switch (env) {
        case 'dev':
            console.log(MONGO_MEMORY_SERVER_PORT)
            const mongod = await MongoMemoryReplSet.create({
                replSet: { count: 1, name: 'module2' },
                instanceOpts: [{
                    port: parseInt(MONGO_MEMORY_SERVER_PORT)
                }],

            });

            return mongod.getUri();
        default:
            return `${process.env[`MONGODB_URI_${env.toUpperCase()}`]}/module2`;
    }
}