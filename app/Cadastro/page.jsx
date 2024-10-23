'use client'
import React from 'react'
import Header from '../components/header/Header'
import styles from './cadastro.module.css'
import Input from 'antd/es/input/Input'
import BtnScanner from '../components/btnScanner/BtnScanner'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numero_nif, setNumero_nif] = useState('');
  const [numero_qrcode, setNumero_qrCode] = useState('');
  const [tipo_usuario, setTipo_usuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [successMensage, setSuccessMensage] = useState('');

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchCadastrar();
  },[]);

  const fetchCadastrar = async () => {
    try{
      const response = await axios.get('http://localhost:3003/usuarios');
      setUsuarios(response.data);
    }catch(error){
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      numero_nif,
      numero_qrcode,
      tipo_usuario
    };
    console.log(data);

    try{
      await axios.post('http://localhost:3003/usuarios', {
        nome,
        email,
        numero_nif,
        numero_qrcode,
        tipo_usuario
      });
      setSuccessMensage('Cadastro realizado com sucesso!');
      clearInputs()
    }catch(error){
      console.error(error);
    }
  };

  const clearInputs = () => {
    setNome('');
    setEmail('');
    setNumero_nif('');
    setNumero_qrCode('');
  }

  return (
    <div>
        <Header />
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.input_container}>
              <label>
                <h2 className={styles.title}>Digite seu nome</h2>
                <Input
                  className={styles.input}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite aqui..."
                  required
                />
              </label>
            </div>

            <div className={styles.input_container}>
              <label>
                <h2 className={styles.title}>Digite seu email</h2>
                <Input
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite aqui..."
                  required
                />
              </label>
            </div>

            <BtnScanner />

            <div className={styles.input_container}>
              <label>
                <h2 className={styles.title}>Cadastrar numero do NIF</h2>
                <Input
                  className={styles.input}
                  value={numero_nif}
                  onChange={(e) => setNumero_nif(e.target.value)}
                  placeholder="Digite aqui..."
                  required
                />
              </label>
            </div>

            <div className={styles.input_container}>
              <label>
                <h2 className={styles.title}>Cadastrar pelo numero do QR Code</h2>
                <Input
                  className={styles.input}
                  value={numero_qrcode}
                  onChange={(e) => setNumero_qrCode(e.target.value)}
                  placeholder="Digite aqui..."
                  required
                />
              </label>
            </div>

            <div className={styles.input_container}>
              <label>
                <h2 className={styles.title}>Selecione o tipo de usuário</h2>
                <select
                  className={styles.select}
                  value={tipo_usuario}
                  onChange={(e) => setTipo_usuario(e.target.value)}
                  required
                >
                    <option value="" disabled>Selecione um tipo</option>
                    <option value="aluno">Aluno</option>
                    <option value="instrutor">Instrutor</option>
                    <option value="administracao">Administração</option>
                    <option value="manutencao">Manutenção</option>
                </select>
              </label>
            </div>

            <button type='submit' className={styles.btn_cadastro}>Cadastrar</button>
          </div>
        </form>
        {successMensage && <p className={styles.success}>{successMensage}</p>}
    </div>
  )
}