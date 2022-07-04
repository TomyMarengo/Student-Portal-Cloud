const {Storage} = require('@google-cloud/storage');
const jwt = require('jsonwebtoken');
const fs  = require('fs');

const storage = new Storage();

const JWT_KEY = 'cloud-tp-key'; // exportar a process.env

exports.addUserFile = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if(req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  let authHeader = req.headers['Authorization'];
  if(!authHeader) authHeader = req.headers['authorization']; // case sensitivity for HTTP/2 standard
  if(!authHeader) {
    res.status(403).json({msg: 'Unauthorized.'});
    return;
  }

  const userToken = authHeader.split('Bearer ')[1];
  if(!jwt.verify(userToken, JWT_KEY)) {
    res.status(403).json({msg: `Invalid token: ${userToken}`});
    return;
  }

  const {id} = jwt.decode(userToken);
  console.log(req.body.file);
  const filePath = `${id}/${req.body.filename}`;
  console.log(filePath);
  fs.writeFile(filePath, req.body.file, async (err) =>  {
    if(err) return res.status(500).json({msg: 'File upload error. Try again later.'});
    const bucketName = 'cloud-student-system-files';
    await storage.bucket(bucketName).upload(filePath, {
      destination: filePath,
    });

    res.status(200).json({msg: `${req.body.filename} uploaded to ${bucketName}`});
  });

}