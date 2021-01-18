const { createPool } = require('promise-mysql')

const db = createPool({
  host: 'localhost',
  database: 'guildBank',
  user: 'root',
  password: 'root'
})

module.exports = db
