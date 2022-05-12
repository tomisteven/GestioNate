import React from 'react';
import ReactDOM from 'react-dom';



/* css */
import './index.css';
import "./Provider.css";
import "./Orders.css";
import "./Turn.css";
import "./Task.css";
import "./navVertical.css";

import Login from './Login';
import App from './App';
import Password from './Password';
import  Panel  from './Panel';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Auth0Provider} from "@auth0/auth0-react";



const _domain = process.env.REACT_APP_AUTH_DOMAIN;
const _clientId = process.env.REACT_APP_CLIENT_AUTH;


ReactDOM.render(

  <React.StrictMode>
    <Auth0Provider domain={_domain} clientId={_clientId} redirectUri={window.location.origin}>
    
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Panel />} /> */}
        <Route path="/" element={<Panel /> } />
        <Route path="/*" element={<App /> } />
      </Routes>
    </BrowserRouter>

    </Auth0Provider>
    
    
  </React.StrictMode>
  ,

  document.getElementById('root')
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
