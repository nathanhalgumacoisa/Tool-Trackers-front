import styles from './salamec.module.css';
import React from 'react';


const salaMec = () => {
    return (
      <div style={styles.container}>
    
        <div style={styles.content}>
          <h1>Mecânica de Usinagem</h1>
          <p>Qual organizador deseja conferir?</p>
          <div style={styles.selectContainer}>
            <div className={styles.buttonContainer}>
               <button className={styles.button}>Carrinhos</button>
               <button className={styles.button}>Tornos</button>
               <button className={styles.button}>Armários</button>
            </div>
            
          </div>
        </div>
      </div>
    );
  };


  export default salaMec;






//   <select style={styles.select}>
//               <option value="carrinhos">Carrinhos</option>
//               <option value="tornos">Tornos</option>
//               <option value="armarios">Armários</option>
//             </select>