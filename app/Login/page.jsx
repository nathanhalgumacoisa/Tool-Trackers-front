"use client"

import React, { useState } from 'react';
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
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name" className="label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome"
            className="input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="nif" className="label">NIF:</label>
          <input
            type="number"
            id="nif"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            placeholder="Digite o número do NIF"
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Login;