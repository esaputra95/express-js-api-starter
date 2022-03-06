const Sequelize = require("sequelize");
const config = require('./config.json');
const Op = Sequelize.Op;
const { host, dialec, database, username, password } = config.development;

// CONNNECT TO DB
const Db = new Sequelize(database, username, password, {
  host: host,
  dialect: dialec
});

module.exports = { Db, Op} ;