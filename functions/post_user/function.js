const {Pool} = require('pg')

const credentials = {
  "host":"cloud-student-system:southamerica-east1:cloud-student-system-sql-2",
  "database":"postgres",
  "port":"5432",
  "user":"postgres",
  "password":"testing1234"
}

const pool = new Pool(credentials);

exports.postUser = async (req, res) => {
  const {username, email} = req.body;
  let response;
  let code;
  pool.query(`INSERT INTO users(username, email) VALUES (${username}, ${email});`)
  .then(res => {
    response = res;
    code = 200;
  })
  .catch(err => {
    response = res;
    code = 422;
  })
  .finally(() => {
    pool.end();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(code).json({msg: response});
  });
}