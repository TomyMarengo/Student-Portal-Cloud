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
  const {filename, data} = req.body;
  const filePath = `${id}/${filename}`;
  const dataLength = Object.keys(data).length;
  const dataArray = new Uint8Array(dataLength);
  for(let i = 0 ; i < dataLength ; i++) {
    dataArray[i] = Object.values(data)[i];
  }
  fs.writeFile(filePath, dataArray, async (err) =>  {
    if(err) return res.status(500).json({msg: 'File upload error. Try again later.'});
    const bucketName = 'cloud-student-system-files';
    await storage.bucket(bucketName).upload(filePath, { destination: filePath });
    return res.status(200).json({msg: `${filename} uploaded to ${bucketName}`});
  });
}
