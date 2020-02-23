class ExecuteQuery {
  constructor(db) {
    this.db = db;
  }
  query(text, params) {
    return new Promise((resolve, reject) => {
      this.db
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
const getColums = object => {
  let colsOut = [];
  Object.keys(object).forEach(item => {
    let row = `${item} ${
      object[item]["type"]
        ? object[item]["type"] === "integer" && object[item]["autoIncrement"]
          ? "serial"
          : object[item]["type"]
        : ""
    } ${object[item]["primaryKey"] ? "PRIMARY KEY" : ""} ${
      object[item]["allowNull"] ? "" : "NOT NULL"
    } ${object[item]["unique"] ? "" : "UNIQUE"}`;
    colsOut.push(row);
  });
  return colsOut;
};
const createTableQuery = (name, colums) =>
  `CREATE TABLE IF NOT EXISTS ${name}(${getColums(colums)})`;

    const CREATE_USER_TABLE =
  `CREATE TABLE IF NOT EXISTS
    users(
      id UUID PRIMARY KEY,
      firstName VARCHAR(128) NOT NULL,
      lastNAme VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      profilePicture varchar(128),
      createdOn TIMESTAMP,
      modifiedOn TIMESTAMP,
      verified BOOLEAN  NOT NULL
    )`;
module.exports = {
  ExecuteQuery,
  createTableQuery
};