'use client'

import React from 'react';
import styles from './emprestimos.module.css';
import Header from '../components/header/header.jsx';


const Emprestimos = () => {
    return (
        <div>
           
       <Header/>
       <div>
        <h1 className={styles.h01}>Página de Empréstimos</h1>
        </div>



        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Nome:</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder="Nome"
      />
        </div>
        </div>




        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Curso</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder="Curso"
      />
        </div>
        </div>




        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Ferramenta</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder="Ferramenta"
      />
        </div>
        </div>




        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Data do emprestimo</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder="Data do empréstimo"
      />
        </div>
        </div>




        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Data de retorno</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder="Data de retorno"
      />
        </div>
        </div>




        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Local que está retirando a ferramenta</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder=""
      />
        </div>
        </div>




        <div className={styles.divinputs}>
        <div>
        <h2 className={styles.h2}>Local de destino</h2>
        </div>
        <div>
        <input
        className={styles.input}
        placeholder="Local de destino"
      />
        </div>
        </div>

        <div className={styles.bu01} >
        <button className={styles.button} >
          Fazer Empréstimo
        
        </button>
        </div>
        
       </div>
    );
};

export default Emprestimos;