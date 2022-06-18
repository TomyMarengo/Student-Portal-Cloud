import React, {useState} from 'react';
import {Alert, Button, Snackbar, TextField} from "@mui/material";

const Register = ({

}) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = e => {
    const inputName = e.target.name;
    const value = e.target.value;
    if(inputName === 'name') setName(value);
    if(inputName === 'email') setEmail(value);
    if(inputName === 'password') setPassword(value);
    else setPasswordCheck(value);
  }

  const arePasswordsEqual = () => password === passwordCheck;

  const handleSubmit = () => {
    if(!arePasswordsEqual()) {
      setError(true);
      setErrorMessage('Las contraseñas deben coincidir');
      return;
    }
    fetch('')
      .then(res => {
        setError(false);
        console.log('res')
      })
      .catch(err => {
        setError(true);
        setErrorMessage(err);
        console.error(err);
      });
  }

  return (
    <div style={{width: '100vw'}}>
      <div style={{width: '50%', height: 550, margin: '50px auto', border: 'solid 1px black', borderRadius: 6, display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: 30, paddingTop: 30}}>
        <h3>Bienvenido a la plataforma para estudiantes</h3>
        <p>Si ya tenés cuenta, iniciá sesión <a href={'/login'}>acá</a>.</p>
        {
          error &&
          <Snackbar open={error}>
            <Alert severity="error" sx={{ width: '100%' }}>{errorMessage}</Alert>
          </Snackbar>
        }
        <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px auto'}}>
          <TextField name={'name'} type={'text'} variant={'standard'} placeholder={'Ingresá tu nombre completo'} onChange={handleInputChange} fullWidth style={{marginBottom: 30}}/>
          <TextField name={'email'} type={'text'} variant={'standard'} placeholder={'Ingresá tu email'} onChange={handleInputChange} fullWidth style={{marginBottom: 30}}/>
          <TextField name={'password'} type={'password'} variant={'standard'} placeholder={'Ingresá tu contraseña'} onChange={handleInputChange} fullWidth style={{marginBottom: 30}}/>
          <TextField name={'password-check'} type={'password'} variant={'standard'} placeholder={'Repetí tu contraseña'} onChange={handleInputChange} fullWidth style={{marginBottom: 30}}/>
          <Button onClick={handleSubmit} disabled={isDisabled}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}

export default Register;