import React, {useState} from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper, Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Tooltip
} from "@mui/material";
import {Delete, Download} from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {REQUESTS_URL} from "../../utils/endpoints";

const UserFilesTable = ({
  userFiles,
  setUserFiles
}) => {

  const [error, setError] = useState(null);
  const [loadingById, setLoadingById] = useState(userFiles.map(() => false));
  const [anchorEl, setAnchorEl] = useState(null | HTMLElement);
  const menuOpen = Boolean(anchorEl);

  const setLoadingState = (newState, indexToSet) => {
    const loadingState = loadingById.map((state, index) => index === indexToSet ? newState : state);
    setLoadingById(loadingState);
  }

  const handleDelete = (id, index) => {
    setError(null);
    setLoadingById(loadingById.map((state, idx) => index === idx ? true : loadingById[idx]));
    fetch(REQUESTS_URL.DELETE_USER_FILE_URL, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('cloud-token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fileName: id})
    })
      .then(res => {
        if(res.status !== 200) {
          res.json().then(err => { throw new Error(err.msg) })
          throw new Error();
        }
        return res.json();
      })
      .then(res => {
        setUserFiles(userFiles.filter(f => f.id !== id));
      })
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

  const handleCloseSnackbar = () => setError(null);

  return (
    <TableContainer component={Paper} sx={{minWidth: 300, maxWidth: 650, marginBottom: '40px'}}>
      <Table sx={{minWidth: 300, maxWidth: 650}}>
        <TableHead>
          <TableRow>
            <TableCell>Tipo de archivo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userFiles.map((file, index) => (
              <TableRow key={file.url} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <img src={getIcon(file.type)} width={30} height={30}/>
                </TableCell>
                <TableCell>
                  <Tooltip title={'Click para descargar'}>
                    <a href={file.url}>{file.id}</a>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {
                    loadingById[index] ?
                      <CircularProgress size={25}/> :
                      <Tooltip title={'Eliminar archivo'}>
                        <Button onClick={() => handleDelete(file.id, index)}>
                          <Delete style={{color: 'red'}} />
                        </Button>
                      </Tooltip>
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert severity={'error'}>{error}</Alert>
      </Snackbar>
    </TableContainer>
  );
}

export default UserFilesTable;