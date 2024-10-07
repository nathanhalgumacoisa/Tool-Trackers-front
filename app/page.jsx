import React from 'react'
import styles from "./page.module.css"

export default function Comecar() {
  return (
    <div className={styles.container}>
    <div className={styles.div1}>
    <img src={imagem1} alt="Clique para começar !" className={styles.imagem1} />
    </div>
    </div>
  )
}

