import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Subjects from "./components/Subjects/Subjects";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import {createTheme, ThemeProvider} from "@mui/material";
import Files from "./components/Files/Files";

const theme = createTheme({
  typography: {
    fontFamily: ['Mukta', 'sans-serif'].join(',')
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path={'/'} component={<Subjects/>}/>
          <PrivateRoute exact path={'/files'} component={<Files/>}/>
          <Route exact path={'/login'} component={Login}/>
          <Route exact path={'/register'} component={Register}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
