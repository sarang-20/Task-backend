const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = 'mydb1'; 

mongoose.connect(MONGO_URL, {
    dbName: DB_NAME,
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error('Error connecting to database: ' + err);
});
