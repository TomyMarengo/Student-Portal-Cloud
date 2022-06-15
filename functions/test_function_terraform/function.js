const {Pool} = require('pg')

const credentials = {
  "host":"cloud-student-system:southamerica-east1:cloud-student-system-sql-2",
  "database":"postgres",
  "port":"5432",
  "user":"postgres",
  "password":"testing1234"
}

const pool = new Pool(credentials);

exports.testFunction = async (req, res) => {
  const results = await pool.query('SELECT * FROM users');
  pool.end();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({msg: results});
}