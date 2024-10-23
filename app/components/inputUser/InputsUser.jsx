"use client";

import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './inputUser.module.css';

const App = ({ title, set }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={styles.input_container}>
        <h2 className={styles.title}>{title}</h2>
        <Input
          className={styles.input}
          value={inputValue}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite aqui..."
          required
        />
      </div>
    </>
  );
};

export default App;