import React from 'react'

import styles from "./page.module.css"

import Header from './components/header/Header'


export default function Comecar() {
  return (

    <div>
      <Header />
      <><div className={styles.container}>
        <div className={styles.div1}>
          <img src="./clique.png" alt="Clique para começar !" className={styles.imagem1} />
        </div>
      </div>
        <div>

        </div></>

    <div className={styles.container}>
      <Header />
    <div className={styles.div1}>
    <img src={imagem1} alt="Clique para começar !" className={styles.imagem1} />
    </div>

    </div>
  )
}

