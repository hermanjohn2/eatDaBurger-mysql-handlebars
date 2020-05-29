const connection = require('./connection.js');

const printQuestionMarks = (num) => {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

// console.log(printQuestionMarks(5));

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

// let test = {
//   name: 'John Herman',
//   age: 30,
//   isHappy: true
// };

// console.log(objToSql(test));

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

    console.log(queryStr);

    connection.query(queryStr, vals, (err, res) => {
      if (err) throw err;

      cb(res);
    });
  },
  update: (table, objColsVals, condition, cb) => {
    let queryStr = `UPDATE ${table}`;
    queryStr += ` SET ${objToSql(objColsVals)}`;
    queryStr += ` WHERE ${condition}`;

    console.log(queryStr);

    connection.query(queryStr, (err, res) => {
      if (err) throw err;

      cb(res);
    });
  },
  delete: (table, condition, cb) => {
    let queryStr = `DELETE FROM ${table} `;
    queryStr += `WHERE ${condition}`;

    connection.query(queryStr, (err, res) => {
      if (err) throw err;

      cb(res);
    });
  }
};

module.exports = orm;
