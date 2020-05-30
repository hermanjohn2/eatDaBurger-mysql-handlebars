// Import MySQL connection
const connection = require('./connection.js');

// Helper function that loops through an array thats length is determinded by the parameter
// It then will turn that array into a string to be used in a SQL query
const printQuestionMarks = (num) => {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

// Helper function that converts object key/value pairs to SQL syntax
const objToSql = (ob) => {
  let arr = [];

  for (const key in ob) {
    let value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      arr.push(`${key}=${value}`);
    }
  }
  return arr.toString();
};

// Object that holds all SQL statement functions
const orm = {
  all: (tableInput, cb) => {
    let queryStr = `SELECT * FROM ${tableInput};`;
    connection.query(queryStr, (err, res) => {
      if (err) throw err;

      cb(res);
    });
  },
  create: (table, cols, vals, cb) => {
    let queryStr = `INSERT INTO ${table} (${cols.toString()}) `;
    queryStr += `VALUES (${printQuestionMarks(vals.length)})`;

    connection.query(queryStr, vals, (err, res) => {
      if (err) throw err;

      cb(res);
    });
  },
  update: (table, objColsVals, condition, cb) => {
    let queryStr = `UPDATE ${table}`;
    queryStr += ` SET ${objToSql(objColsVals)}`;
    queryStr += ` WHERE ${condition}`;

    connection.query(queryStr, (err, res) => {
      if (err) throw err;

      cb(res);
    });
  }
};

// Export
module.exports = orm;
