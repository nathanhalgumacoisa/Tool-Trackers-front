import styles from './deseja.module.css';
import React from 'react';

const desejafazer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>O que deseja fazer?</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Empréstimos</button>
          <button className={styles.button}>Conferências</button>
        </div>
      </div>
    </div>
  );
};

export default desejafazer;