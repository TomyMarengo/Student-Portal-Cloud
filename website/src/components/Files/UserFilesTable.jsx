import React, {useEffect} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const UserFilesTable = ({
  userFiles
}) => {

  return (
    <TableContainer component={Paper} sx={{minWidth: 350, maxWidth: 650}}>
      <Table sx={{minWidth: 350, maxWidth: 650}}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Archivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userFiles.map((file, index) => (
              <TableRow key={file.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{file.filename}</TableCell>
                <TableCell>{file.filename}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserFilesTable;