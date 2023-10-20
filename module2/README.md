# NodeJS Foundation Workshop
## Module 2 Mini Project

The application will simulate real-time data ingestion, have CRUD functionalities, and send notifications (email or SMS) when sensor data hits certain thresholds. Proper logging, data validation, and error handling will be integral parts of the project.

## Features

- 

## Dependencies

Module 2 uses a number of open source projects to work properly:

- node-cron - is tiny task scheduler in pure JavaScript for node.js based on GNU crontab.
- express - Fast, unopinionated, minimalist web framework for Node.js.
- Joi - used for validation
- dotenv - loads environment variables from a .env file into process.env

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd module2
npm i
```

Create a `.env` file in the root of your project and insert
your key/value pairs in the following format of `KEY=VALUE`:

```sh
NODE_DEVELOPMENT=prod
SERVER_PORT=5858

MONGO_MEMORY_SERVER_PORT=7676
MONGO_MEMORY_SERVER_URI=mongodb://127.0.0.1:54091/module2
MONGODB_URI_PROD=mongodb+srv://<user>:<password>@testcluster.oytwk2v.mongodb.net
```

## Development

Open your favorite Terminal and run these commands.

First Tab (Sensor Simulator):

```sh
yarn start:sensor
```

Second Tab (Main Server App):

```sh
yarn start:dev or yarn start:watch
```
