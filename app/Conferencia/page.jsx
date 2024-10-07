import styles from './conferencia.module.css';
import React from 'react';


const conferencia = () => {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1>Conferências</h1>
          <p>Em qual setor você gostaria de fazer a conferência?</p>
          <div style={styles.buttonContainer}>
            <button style={styles.button}>Mecânica de Usinagem</button>
            <button style={styles.button}>Elétrica</button>
            <button style={styles.button}>Espaço Maker</button>
            <button style={styles.button}>Sala de Manutenção</button>
          </div>
        </div>
      </div>
    );
  };


  export default conferencia;