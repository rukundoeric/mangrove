/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const pg = require('pg')
const Datatypes = require('./Datatypes')
const Constaints = require('./Constraints')
const table = require('./Data_Definition/Tables')

const { Pool } = pg
/**
 * @author Rukundo Eric
 * @class Postgres
 * @description this class performs the whole Mangrove module oparations
 */
class Postgres {
	/**
   *
   * @param {Object} dbConfig - Data object
   * @returns {Object} - Response object
   */
	constructor(dbConfig) {
		this.dbConfig = dbConfig
		this.conConfig = dbConfig.conConfig
		this.DataTypes = Datatypes
		this.Constaints = Constaints
		this.createTable = new table(this.conConfig).createTable
		// this.dropTable = new table(this.dbConfig).dropTable;
	}

	/**
   *
   * @param {Function} callback - Callback Function
   * @returns {Object} - Response object
   */
	async connect(callback) {
		return new Pool(this.conConfig).connect(err => callback(err))
	}

	/**
   *
   * @param {String} file - File path
   * @returns {Object} - Response object
   */
	async import(file) {
		return require(file)(this)
	}
}

module.exports = Postgres
