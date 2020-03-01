const query = require('../Query/index')

const { createTableQuery } = query

/**
 * @author Rukundo Eric
 * @class Table
 * @description this class performs the whole Tables oparations
 */
class Tables {
	/**
   *
   * @param {Object} conConfig - Data object
   * @returns {Object} - Response object
   */
	constructor(conConfig) {
		this.conConfig = conConfig
	}

	/**
   *
   * @param {Object} name - Data object
   * @param {Function} colums - Callback Function
   * @returns {Object} - Response object
   */
	async createTable(name, colums) {
		await this.conConfig.db.query(createTableQuery(name, colums))
	}
}
module.exports = Tables
