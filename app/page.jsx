import React from 'react'

import styles from "./page.module.css"

import Header from './components/header/Header'

import Footer from './components/footer/Footer'

export default function Comecar() {
  return (

    <div>
      <Header />
      <><div className={styles.container}>
        <div className={styles.div1}>
          <img src="./clique.png" alt="Clique para começar !" className={styles.imagem1} />
        </div>
      </div>
      </>
      <Footer />
    </div>
    

  )
}

