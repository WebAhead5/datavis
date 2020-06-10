
const {Pool}  = require('pg');
require("dotenv").config()

//todo setup environment variables
let connectionString = process.env.DATABASE_URL;

if(!connectionString)
    throw new Error('Env variable DB_URL must be set');

const dbConnection = new Pool({connectionString});
module.exports = dbConnection;
