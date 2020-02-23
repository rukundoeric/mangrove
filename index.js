const path = require('path');
const pg = require('pg');
const Postgres = require('./PostgresSQL/index');
const MySql = require('./MySQL/index');
const { Pool } = pg;

let dbConfig
try {
    dbConfig = require(`${process.cwd()}/.mangroverc`)
} catch (err) {
    dbConfig = { 'connection':  `${process.cwd()}/mangrove/connection` } // Default configuration
}
const env = process.env.NODE_ENV || 'development';
dbConfig.conConfig = require(path.join(dbConfig['connection'], 'config.js'))[env]
if(dbConfig.conConfig.database.toLowerCase() === 'postgres'){
  dbConfig.conConfig = {...dbConfig.conConfig, db: new Pool(dbConfig.conConfig)}
  module.exports = new Postgres(dbConfig);
} else {
  module.exports = new MySql(dbConfig);
}

