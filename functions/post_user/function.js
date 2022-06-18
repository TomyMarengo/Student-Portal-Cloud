const {Pool} = require('pg')

const credentials = {
  "host":"10.0.0.3",
  "database":"postgres",
  "port":"5432",
  "user":"postgres",
  "password":"testing1234"
}

const pool = new Pool(credentials);

exports.postUser = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if(req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  pool.connect((error, client, release) => {
    if(error) {
      res.status(500).json({msg: 'Error getting pg client'})
      return;
    }
    const {username, email} = req.body;
    let response;
    let code;
    const query = `INSERT INTO users(username, email) VALUES ('${username}', '${email}');`;
    client.query(query)
    .then(res => {
      response = 'User added correctly';
      code = 200;
    })
    .catch(err => {
      response = err;
      code = 422;
    })
    .finally(() => {
      client.release();
      res.status(code).json({msg: response});
    });
  });
}