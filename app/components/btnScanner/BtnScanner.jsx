import React from 'react'
import styles from './btnScanner.module.css'
import Link from 'next/link'

const BtnScanner = () => {
  return (
    <div className={styles.btnScanner}>
        <h2>Cadastrar com...</h2>
        <Link href="/scanner">
            <button className={styles.btn}>Escanear QRcode</button>
        </Link>
    </div>
  )
}

export default BtnScanner