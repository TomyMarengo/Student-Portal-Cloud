import React, {useEffect, useState} from "react";
import {Alert, CircularProgress, Snackbar} from "@mui/material";
import UserFilesTable from "./UserFilesTable";
import UploadFileComponent from "./UploadFileComponent";
import {REQUESTS_URL} from "../../utils/endpoints";

const Files = () => {

  const [userFiles, setUserFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [duplicate, setDuplicate] = useState(null);

  const getOptions = {
    headers: {
      'Content-Type': 'application/pdf',
      'Authorization': `Bearer ${localStorage.getItem('cloud-token')}`
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch(REQUESTS_URL.GET_USER_FILES_URL, getOptions)
      .then(res => res.json())
      .then(res => {
        parseFiles(res)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const parseFiles = files => {
    if(files === null || files === undefined || files.length === 0) {
      setUserFiles([]);
      return;
    }
    setUserFiles(files.map(f => {
      const originalFileName = f.name.split('#')[1];
      return {
        id: originalFileName,
        name: originalFileName.split('.')[0],
        url: f.metadata.mediaLink,
        type: f.name.split('.')[1],
      }
    }));
  }

  const parseFile = file => {
    const originalFileName = file.name.split('#')[1];
    if(userFiles.find(f => f.id === originalFileName)) {
      setDuplicate(originalFileName);
      return;
    }
    setUserFiles([...userFiles, {
      id: originalFileName,
      name: originalFileName.split('.')[0],
      url: file.metadata.mediaLink,
      type: file.name.split('.')[1],
    }]);
  }

  const addNewFile = file => parseFile(file)

  const handleCloseSnackbar = () => setDuplicate(null);

  return (
    <div>
      {
        loading &&
        <div style={{width: 'min-content', margin: '20px 30px'}}>
          <CircularProgress size={50} color={'primary'}/>
        </div>
      }
      {
        !loading &&
        <div style={{margin: '20px 10px'}}>
          {
            userFiles?.length > 0 &&
            <UserFilesTable userFiles={userFiles} setUserFiles={setUserFiles}/>
          }
          {
            (!userFiles || userFiles.length === 0) &&
            <p>No hay archivos subidos aún.</p>
          }
          <UploadFileComponent addNewFile={addNewFile}/>
        </div>
      }
      <Snackbar open={duplicate !== null} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert severity={'info'}>{`El archivo ${duplicate} se sobreescribió exitosamente.`}</Alert>
      </Snackbar>
    </div>
  );
}

export default Files;