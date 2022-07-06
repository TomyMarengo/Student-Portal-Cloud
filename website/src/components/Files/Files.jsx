import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import UserFilesTable from "./UserFilesTable";
import UploadFileComponent from "./UploadFileComponent";
import {REQUESTS_URL} from "../../utils/endpoints";

const Files = () => {

  const [userFiles, setUserFiles] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const originalFileName = f.name.split('-')[1];
      return {
        id: originalFileName,
        name: originalFileName.split('.')[0],
        url: f.metadata.mediaLink,
        type: f.name.split('.')[1],
      }
    }));
  }

  const parseFile = file => {
    const originalFileName = file.name.split('-')[1];
    setUserFiles([...userFiles, {
      id: originalFileName,
      name: originalFileName.split('.')[0],
      url: file.metadata.mediaLink,
      type: file.name.split('.')[1],
    }]);
  }

  const addNewFile = file => parseFile(file)

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
    </div>
  );
}

export default Files;