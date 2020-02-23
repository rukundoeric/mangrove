const query = require("../Query/index");

const { createTableQuery } = query;

class Tables {
  constructor(conConfig) {
    this.conConfig = conConfig;
  }
  async createTable(name, colums) {
    await this.conConfig["db"].query(createTableQuery(name, colums));
  }
  async drop() {}
  async modify() {}
}
module.exports = Tables;
