const { query } = require('../config/db');

function whereFrom(filters) {
  const clauses = [];
  const params = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      clauses.push(`${key} = :${key}`);
      params[key] = value;
    }
  });
  return { where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', params };
}

module.exports = { query, whereFrom };
