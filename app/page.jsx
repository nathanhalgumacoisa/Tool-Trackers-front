import React from 'react';
import styles from "./page.module.css";
import Header from './components/header/Header';
import Link from 'next/link'; // Importando o Link do Next.js

export default function Comecar() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.div1}>
          <Link href="/Login"> 
            <img src="./clique.png" alt="Clique para começar !" className={styles.imagem1} />
          </Link>
          <Link href="/Desejafazer"> 
          <h1 className={styles.text}>Clique pra começar</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
