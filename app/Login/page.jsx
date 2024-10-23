"use client"

import React, { useState } from 'react';
import Header from '../components/header/Header.jsx';
import App from '../components/inputs/inputs.jsx';
import styles from './login.module.css';

const Login = () => {
  const [name, setName] = useState('');
  const [nif, setNif] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Name:', name);
    console.log('NIF:', nif);
  };

  return (
    <div className={styles.logincontainer}>
      <Header></Header>

      <h2 className={styles.logintitle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputgroup}>
        <App title="E-mail:"></App>
        </div>
        <div className={styles.inputgroup}>
        <App title="Senha:"></App>
        </div>
        <div className={styles.button}>
        <button type="submit" className={styles.submitbutton}>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;