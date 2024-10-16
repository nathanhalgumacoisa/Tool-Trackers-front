"use client";

import React, { useState } from 'react';
import { Input } from 'antd';
import styles from '';

const App = ({ title }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <Input
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={title}
      />
    </>
  );
};

export default App;