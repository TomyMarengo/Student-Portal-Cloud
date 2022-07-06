import React, {useState} from 'react';
import {Alert, Button, CircularProgress, Input, Snackbar} from "@mui/material";
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
        .then(res => {
          clearInput();
          addNewFile(res.msg[0]);
        })
        .catch(err => console.error(err))
        .finally(() => setUploadLoading(false));
    }

    const clearInput = () => {
      setFile(null);
      document.getElementById('file-input').value = null;
    }

    const handleCloseSnackbar = () => setError(null);

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '20%', minWidth: 300}}>
            <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleCloseSnackbar}>
              <Alert severity={'error'}>{error}</Alert>
            </Snackbar>
            <Input type={'file'}
                   id={'file-input'}
                   placeholder={'Suba sus archivos aquí'}
                   accept="application/pdf"
                   onChange={handleFileInput}
                   error={error !== null}
            />
            <Button disabled={!file || !!error || uploadLoading}
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

export default UploadFileComponent;