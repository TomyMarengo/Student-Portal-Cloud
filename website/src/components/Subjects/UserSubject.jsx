import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import {REQUESTS_URL} from "../../utils/endpoints";

const UserSubject = ({
  subject,
  deleteSubject,
}) => {

  const [loading, setLoading] = useState(false);

  const deleteUserSubject = () => {
    setLoading(true);
    fetch(`${REQUESTS_URL.DELETE_USER_SUBJECT_URL}?subjectId=${subject.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('cloud-token')}` }
    })
      .then(() => deleteSubject(subject))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <Box sx={{minWidth: 300}} style={{marginRight: 20}}>
      <Card variant={'outlined'}>
        <CardContent>
          <Typography sx={{fontSize: 20, fontWeight: 'bold'}} gutterBottom>
            {subject.name}
          </Typography>
        </CardContent>
        <CardActions>
          {
            loading ?
            <Button size={'small'} disabled>
              <CircularProgress size={25} color={'primary'}/>
            </Button> :
            <Button size={'small'} onClick={deleteUserSubject}>Desanotarse</Button>
          }
        </CardActions>
      </Card>
    </Box>
  );
}

export default UserSubject;