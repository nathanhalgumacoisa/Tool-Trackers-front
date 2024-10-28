"use client"; 

import React from 'react';
import { Switch } from 'antd';
import styles from './switch.module.css'; // Importando o CSS Module

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const App = () => (
  <div className={styles.container}>
    <Switch defaultChecked onChange={onChange} />
  </div>
);

export default App;