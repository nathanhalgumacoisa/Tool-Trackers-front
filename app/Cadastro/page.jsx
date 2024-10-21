import React from 'react'
import App from '../components/inputUser/InputsUser'
import Header from '../components/header/Header'
import styles from './cadastro.module.css'
import Scanner from '../Scanner/page.jsx'
import Link from 'next/link'

export default function Cadastro() {
  return (
    <div>
        <Header />
        <div className={styles.container}>
          <App title="Nome"></App>
          <div className={styles.btnScanner}>
            <p>Cadastrar com...</p>
            <Link href="/scanner">
              <button>Escanear QRcode</button>
            </Link>
          </div>
          <App title="Cadastrar numero do NIF"></App>
          <App title="Cadastrar numero QRcode do aluno"></App>
        </div>
    </div>
  )
}