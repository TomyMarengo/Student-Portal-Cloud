const {Storage} = require('@google-cloud/storage');
const jwt = require('jsonwebtoken');

const storage = new Storage();
const JWT_KEY = 'cloud-tp-key'; // exportar a process.env

const myBucket = storage.bucket('cloud-student-system-files');

exports.getUserFiles = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if(req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    let code, response;

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
    const options = {destination: 'test.pdf'};

    // Download the file
    const file = await myBucket.file('TP_individual.pdf').download(options);

    res.status(200).body(file);
}