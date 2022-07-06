import React, {useState} from 'react';
import {Button, CircularProgress, Input} from "@mui/material";
import {REQUESTS_URL} from "../../utils/endpoints";
import {supportedTypes} from "../../utils/supportedFileTypes";

const UploadFileComponent = ({
  addNewFile
}) => {

    const [uploadLoading, setUploadLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);

    const handleFileInput = evt => {
      setError(null);
      const file = evt.target.files[0];
      const fileType = file.type;
      if(!supportedTypes.includes(fileType)) {
        setError('El tipo de archivo no está soportado. Debe ser PNG, JPG, JPEG o PDF.');
        return;
      }
      setFile(file);
    }

    const uploadFile = () => {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      fetch(REQUESTS_URL.ADD_USER_FILE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('cloud-token')}`,
        },
        body: formData,
      })
        .then(res => res.json())
        .then(res => addNewFile(res.msg[0]))
        .catch(err => console.error(err))
        .finally(() => setUploadLoading(false));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '20%', minWidth: 300}}>
            {
                error !== null &&
                <p style={{color: 'red'}}>{error}</p>
            }
            <Input type={'file'}
                   id={'file-input'}
                   placeholder={'Suba sus archivos aquí'}
                   accept="application/pdf"
                   onChange={handleFileInput}
                   error={error !== null}
            />
            <Button disabled={!file || !!error}
                    style={{width: '50%', margin: '15px auto'}}
                    onClick={uploadFile}
                    variant={'contained'}
            >
              {
                uploadLoading ?
                  <CircularProgress size={20} style={{color: 'white'}}/> :
                  'Subir archivo'
              }
            </Button>
        </div>
    );
}
/*

const bucket = storage.bucket('cloud-student-system-files');
  const blob = bucket.file(req.body.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on('error', err => {
    console.error(err);
    return res.status(500).json({msg: err});
  });
  blobStream.on('finish', () => {
    return res.status(200).json({msg: `https://storage.googleapis.com/${bucket.name}/${blob.name}`});
  });
  blobStream.end(req.body.file.buffer);
 */

export default UploadFileComponent;