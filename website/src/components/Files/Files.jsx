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
    fetch(REQUESTS_URL.GET_USER_FILES_URL, getOptions)
      .then(res => console.log(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {
        loading &&
        <div style={{width: 'min-content', margin: '20px auto'}}>
          <CircularProgress size={50} color={'primary'}/>
        </div>
      }
      {
        !loading &&
        <div style={{margin: '20px 10px'}}>
          {
            userFiles?.length > 0 &&
            <UserFilesTable userFiles={userFiles}/>
          }
          {
            (!userFiles || userFiles.length === 0) &&
            <p>No hay archivos subidos aún.</p>
          }
          <UploadFileComponent/>
        </div>
      }
    </div>
  );
}

export default Files;