/* eslint-disable no-nested-ternary */

/**
 * @author Rukundo Eric
 * @class ExecuteQuery
 * @description this class performs the whole Init oparations
 */
class ExecuteQuery {
	/**
   *
   * @param {Class} db - Pool connection
   * @returns {Object} - Response object
   */
	constructor(db) {
		this.db = db
	}

	/**
   *
   * @param {Object} text - Query text
   * @param {Array} params - values
   * @returns {Promise} - Response object
   */
	query(text, params) {
		return new Promise((resolve, reject) => {
			this.db
				.query(text, params)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}
const getColums = (object) => {
	const colsOut = []
	Object.keys(object).forEach((item) => {
		const row = `${item} ${
			object[item].type
				? object[item].type === 'integer' && object[item].autoIncrement
					? 'serial'
					: object[item].type
				: ''
		} ${object[item].primaryKey ? 'PRIMARY KEY' : ''} ${
			object[item].allowNull ? '' : 'NOT NULL'
		} ${object[item].unique ? '' : 'UNIQUE'}`
		colsOut.push(row)
	})
	return colsOut
}
const createTableQuery = (name, colums) => `CREATE TABLE IF NOT EXISTS ${name}(${getColums(colums)})`

module.exports = {
	ExecuteQuery,
	createTableQuery
}
