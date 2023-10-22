import { Router } from 'express';
import { SensorData } from '../model/index.js';
import { PAGE_LIMIT, SENSOR_DATA_PROJECTION } from '../util/constants.js';

const sensorDataRouter = Router();
/**
 * fetch all sensor data
 */
sensorDataRouter.get('/sensorData/', async (req, res, next) => {
    try {
        const data = await SensorData
            .find({}, SENSOR_DATA_PROJECTION.join(' '))
            .lean();
        req.responsePayload = {
            code: 200,
            message: 'Data retrieved!',
            data
        }
        next()
    }
    catch (err) {
        next(err);
    }
});
/**
 * fetching of data with pagination
 */
sensorDataRouter.get('/sensorData/page/:pageNumber', async (req, res, next) => {
    try {
        const { pageNumber: page } = req.params;
        const pageNumber = parseInt(page ?? 1);
        const skip = (pageNumber - 1) * PAGE_LIMIT
        /**
         * arr of field to be selected in query
         */
        const data = await SensorData
            .find({}, SENSOR_DATA_PROJECTION.join(' '))
            .lean()
            .skip(skip)
            .limit(PAGE_LIMIT);
        req.responsePayload = {
            code: 200,
            message: 'Data retrieved!',
            data: {
                pagintedData: data,
                pageNumber,
                pageLimit: PAGE_LIMIT
            }
        }
        next()
    }
    catch (err) {
        next(err);
    }
});

sensorDataRouter.get('/sensorData/id/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        /**
         * arr of field to be selected in query
         */
        const data = await SensorData.findById(id, SENSOR_DATA_PROJECTION);

        if (!data) {
            res.status(404)
            throw new Error(`Data not found with this id ${id}`)
        }

        req.responsePayload = {
            code: 200,
            message: 'Data retrieved!',
            data
        }
        next()
    }
    catch (err) {
        next(err);
    }
});

export { sensorDataRouter };

