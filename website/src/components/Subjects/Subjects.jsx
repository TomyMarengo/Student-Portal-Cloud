import React, {useState} from 'react';
import { useEffect } from 'react';
import {CircularProgress} from "@mui/material";
import SubjectsTable from "./SubjectsTable";
import UserSubjectsGrid from "./UserSubjectsGrid";
import {REQUESTS_URL} from "../../utils/endpoints";

const Subjects = () => {

  const [loading, setLoading] = useState(true);
  const [allSubjects, setAllSubjects] = useState(null);
  const [userSubjects, setUserSubjects] = useState(null);

  const getOptions = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('cloud-token')}`
    }
  }

  useEffect(() => {
    Promise.all([
      getAllSubjects(),
      getUserSubjects(),
    ])
      .then(res => Promise.all([res[0].json(), res[1].json()]))
      .then(res => {
        setAllSubjects(res[0].msg);
        setUserSubjects(res[1].msg);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  //eslint-disable-next-line
  }, []);

  const getAllSubjects = () => fetch(REQUESTS_URL.GET_ALL_SUBJECTS_URL, getOptions);

  const getUserSubjects = () => fetch(REQUESTS_URL.GET_USER_SUBJECTS_URL, getOptions);

  const addSubject = subject => setUserSubjects([...userSubjects, subject])

  const deleteSubject = subject => {
    setUserSubjects(userSubjects.filter(s => s.id !== subject.id));
    setAllSubjects(allSubjects.map(s => {
      if(s.id === subject.id) {
        return {
          ...s,
          isenrolled: false,
        }
      } else {
        return s;
      }
    }))
  }

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
          <h3>Materias en las que usted está inscripto:</h3>
          {
            userSubjects?.length > 0 &&
            <UserSubjectsGrid subjects={userSubjects} deleteSubject={deleteSubject}/>
          }
          {
            userSubjects?.length === 0 &&
            <p>Usted no está inscripto en ninguna materia aún.</p>
          }
        </div>
      }
      {
        !loading &&
        <div style={{margin: '20px 10px'}}>
          <h3>Todas las materias:</h3>
          {
            allSubjects?.length > 0 &&
            <SubjectsTable subjects={allSubjects} addSubject={addSubject} deleteSubject={deleteSubject}/>
          }
          {
              allSubjects?.length === 0 &&
              <p>No hay materias disponibles.</p>
          }
        </div>
      }
    </div>
  );
}

export default Subjects;