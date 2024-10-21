import React from 'react'
import App from '../components/inputUser/InputsUser'
import Header from '../components/header/Header'
import styles from './cadastro.module.css'
import BtnScanner from '../components/btnScanner/BtnScanner'
import Link from 'next/link'

export default function Cadastro() {
  return (
    <div>
        <Header />
        <div className={styles.container}>
          <App title="Digite o seu nome"></App>
          <BtnScanner />
          <App title="Cadastrar numero do NIF"></App>
          <App title="Cadastrar numero QRcode do aluno"></App>
        </div>
    </div>
  )
}