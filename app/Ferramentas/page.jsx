"use client"
// import Card from '../components/ferramentas-cards/ferramenta.jsx'
import styles from './ferreletro.module.css';
import React from 'react';
import axios from 'axios';
import Header from '../components/header/header.jsx';
import { useState, useEffect } from 'react';




function FerramentasforUser () {
  const [locals, setLocals] = useState([]);
  const [nome, setNome] = useState('');
  const [imagem_url, setImagemUrl] = useState('');
  const [conjunto, setConjunto] = useState('');
  const [numero, setNumero] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [modelo, setModelo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    getFerramentas();
}, []);

async function getFerramentas() {
  try {
      const response = await axios.get(`http://localhost:3003/ferramentas`);
      if (response.data && response.data.ferramentas) {
          setLocals(response.data.ferramentas);
      } else {
          console.log("Nenhuma ferramenta encontrada na resposta.");
      }
  } catch (error) {
      console.log("Erro ao buscar ferramentas:", error);
  }
}


    return (
      <div className={styles.container}>
       <Header/>
       <div className={styles.App}>
                <h1 className={styles.h1}>Ferramentas Cadastradas</h1>
                {locals.length > 0 ? (
                    locals.map((ferr) => (
                        <div className={styles.ferramentas} key={ferr.ferramenta_id}>
                            <CardFerr
                                nome={ferr.nome}
                                imagem_url={ferr.imagem_url}
                                conjunto={ferr.conjunto}
                                numero={ferr.numero}
                                patrimonio={ferr.patrimonio}
                                modelo={ferr.modelo}
                                descricao={ferr.descricao}
                            />
        
                        </div>
                    ))
                ) : (
                    <p>Nenhuma ferramenta cadastrada.</p>
                )}
            </div>
    
      </div>
    );
  };




  export default FerramentasforUser;
