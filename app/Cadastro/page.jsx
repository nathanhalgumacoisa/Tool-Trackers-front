'use client'
import React from 'react'
import App from '../components/inputUser/InputsUser'
import Header from '../components/header/Header'
import styles from './cadastro.module.css'
import BtnScanner from '../components/btnScanner/BtnScanner'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Cadastro() {
  const [name, setName] = useState('');
  const [nif, setNif] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchCadastrar();
  },[]);

  const fetchCadastrar = async () => {
    try{
      const response = await axios.get('http://localhost:3000/api/usuarios');
      setUsuarios(response.data);
    }catch(error){
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    
  }
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