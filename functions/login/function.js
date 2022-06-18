const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const credentials = {
  "host":"10.0.0.3",
  "database":"postgres",
  "port":"5432",
  "user":"postgres",
  "password":"testing1234"
}

const pool = new Pool(credentials);

exports.login = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if(req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  pool.connect(async (error, client, release) => {
    if(error) {
      res.status(500).json({msg: 'Error getting pg client'})
      return;
    }
    const {email, password} = req.body;
    let response;
    let code;
    const query = `SELECT id, full_name, password FROM users WHERE email='${email}';`;
    client.query(query)
    .then(async res => {
      if(res.rowCount == 0) {
        response = 'Las credenciales de acceso son incorrectas';
        code = 401;
      } else {
        const {id, full_name, db_password} = res.rows[0];
        const samePasswords = await bcrypt.compare(password, db_password);
        if(!samePasswords) {
          response = 'Las credenciales de acceso son incorrectas';
          code = 401;
        } else {
          const token = jwt.sign({
            id,
            email,
            fullName: full_name
          });
          response = token;
          code = 200;
        }
      }
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