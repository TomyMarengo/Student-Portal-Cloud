import React, {useState} from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {Delete, Download} from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {REQUESTS_URL} from "../../utils/endpoints";

const UserFilesTable = ({
  userFiles,
  setUserFiles
}) => {

  const [loadingById, setLoadingById] = useState(userFiles.map(() => false));
  const [anchorEl, setAnchorEl] = useState(null | HTMLElement);
  const menuOpen = Boolean(anchorEl);

  const setLoadingState = (newState, indexToSet) => {
    const loadingState = loadingById.map((state, index) => index === indexToSet ? newState : state);
    setLoadingById(loadingState);
  }

  const handleDelete = (id, index) => {
    setLoadingById(loadingById.map((state, idx) => index === idx ? true : loadingById[idx]));
    fetch(REQUESTS_URL.DELETE_USER_FILE_URL, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('cloud-token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fileName: id})
    })
      .then(res => setUserFiles(userFiles.filter(f => f.id !== id)))
      .catch(err => console.error(err))
      .finally(() => {
        setAnchorEl(null);
        setLoadingById(loadingById.map((state, idx) => index === idx ? false : loadingById[idx]));
      });
  }

  const getIcon = type => {
    switch (type) {
      case 'png':
        return '/assets/png.png'
      case 'jpg':
      case 'jpeg':
        return '/assets/jpg.png'
      default:
        return '/assets/pdf.png'
    }
  }

  return (
    <TableContainer component={Paper} sx={{minWidth: 350, maxWidth: 650, marginBottom: '40px'}}>
      <Table sx={{minWidth: 350, maxWidth: 650}}>
        <TableHead>
          <TableRow>
            <TableCell>Tipo de archivo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userFiles.map((file, index) => (
              <TableRow key={file.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <img src={getIcon(file.type)} width={30} height={30}/>
                </TableCell>
                <TableCell>
                  <a href={file.url}>{file.id}</a>
                </TableCell>
                <TableCell>
                  {
                    loadingById[index] ?
                      <CircularProgress size={25}/> :
                      <Button onClick={() => handleDelete(file.id, index)}>
                        <Delete style={{color: 'red'}} />
                      </Button>
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserFilesTable;