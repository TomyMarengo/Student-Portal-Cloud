const {Pool} = require('pg')

const credentials = {
  "host":"10.0.0.3",
  "database":"postgres",
  "port":"5432",
  "user":"postgres",
  "password":"testing1234"
}

const pool = new Pool(credentials);

exports.testFunction = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  let code, response;
  pool.connect((error, client, release) => {
    if(error) {
      res.status(500).json({msg: 'Error getting pg client'});
      return;
    }
    client.query('SELECT * FROM users')
    .then(res => {
      code = 200;
      response = res.rows;
    })
    .catch(err => {
      code = 400;
      response = err;
    })
    .finally(() => {
      client.release();
      res.status(code).json({msg: response});
    });
  });
}