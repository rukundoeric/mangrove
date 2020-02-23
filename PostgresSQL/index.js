const pg = require("pg");
const Datatypes = require("./Datatypes");
const Constaints = require("./Constraints");
const table = require('./Data_Definition/Tables');
const { Pool } = pg;

class Postgres {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.conConfig = dbConfig.conConfig;
    this.DataTypes = Datatypes;
    this.Constaints = Constaints;
    this.createTable = new table(this.conConfig).createTable;
    // this.dropTable = new table(this.dbConfig).dropTable;
  }
  async connect(callback) {
    return new Pool(this.conConfig).connect(err => callback(err));
  }
  async import(file) {
    return require(file)(this);
  }
}

module.exports = Postgres;
