import React, {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";

const Login = ({

}) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if(!!email && !!password) setIsDisabled(false)
    else setIsDisabled(true);
  }, [email, password])


  const handleInputChange = e => {
    const inputName = e.target.name;
    const value = e.target.value;
    if(inputName === 'email') setEmail(value);
    else setPassword(value);
  }

  const handleSubmit = () => {
    fetch('https://southamerica-east1-cloud-student-system.cloudfunctions.net/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => {
        setError(false);
        console.log('res')
      })
      .catch(err => {
        setError(true);
        console.error(err);
      });
  }

  return (
    <div style={{width: '100vw'}}>
      <div style={{width: '50%', height: 400, margin: '50px auto', border: 'solid 1px black', borderRadius: 6, display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: 30, paddingTop: 30}}>
        <h3>Para poder utilizar la plataforma para estudiantes, iniciá sesión primero.</h3>
        <p>Si no tenés cuenta aún, registrate <a href={'/register'}>acá</a>.</p>
        <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px auto'}}>
          <TextField name={'email'} type={'text'} variant={'standard'} placeholder={'Email'} onChange={handleInputChange} fullWidth style={{marginBottom: 30}}/>
          <TextField name={'password'} type={'password'} variant={'standard'} placeholder={'Contraseña'} onChange={handleInputChange} fullWidth style={{marginBottom: 30}}/>
          <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>Iniciar sesión</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;