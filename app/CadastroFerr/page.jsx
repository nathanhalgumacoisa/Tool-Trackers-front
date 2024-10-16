"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cadastroferr.module.css'; // Certifique-se de que o caminho do CSS esteja correto
import Header from '../components/header/Header';
import App from '../components/inputs/inputs.jsx';



const CadastroFerr = () => {
    const [nome, setNome] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [numero, setNumero] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacaoId, setLocalizacaoId] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const apiURL = "http://192.168.15.138:3000";

    useEffect(() => {
        fetchCadastrarFerr();
    }, []);

    const fetchCadastrarFerr = async () => {
        try {
            const response = await axios.get(`${apiURL}/CadastroFerr`);
            setFerramentas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nome,
            imagemUrl,
            conjunto,
            numero,
            patrimonio,
            modelo,
            descricao,
            localizacaoId
        };

        try {
            await axios.post(`${apiURL}/CadastroFerr`, data);
            setSuccessMessage('Cadastrado com sucesso!');
            fetchCadastrarFerr();
            clearInputs();
        } catch (error) {
            console.error(error);
        }
    };

    const clearInputs = () => {
        setNome('');
        setImagemUrl('');
        setConjunto('');
        setNumero('');
        setPatrimonio('');
        setModelo('');
        setDescricao('');
        setLocalizacaoId('');
    };
      
    return (
        
        <div className={styles.conjunto}>
          <Header/>  
           
            <form onSubmit={handleSubmit}>
                <div className={styles.container}> 
                     <h1>Cadastro de Ferramentas</h1>
                <div>
                 <App title="Nome:" className={styles.input}></App>

                </div>


                <div>
                 <App title="Imagem URL:" subtitle="digite algo" className={styles.input}></App>

                </div>


                <div>
                 <App title="Conjunto:" className={styles.input}></App>

                </div>

                <div>
                 <App title="Número:" className={styles.input}></App>

                </div>

                <div>
                 <App title="Patrimônio:" className={styles.input}></App>

                </div>


                <div>
                 <App title="Modelo:" className={styles.input}></App>

                </div>

                <div>
                 <App title="Descrição:" className={styles.input}></App>

                </div>

                <div>
                 <App title="Localização ID:" className={styles.input}></App>

                </div> </div>
                    
               
               <div>

                <button type="submit" className={styles.submitButton}>Enviar</button>  </div>
            </form>

            <h2>Ferramentas Cadastradas:</h2>
            

            <ul>
                {ferramentas.map((ferramenta, index) => (
                    <li key={index}>
                        <strong>Nome:</strong> {ferramenta.nome} <br />
                        <strong>Imagem URL:</strong> {ferramenta.imagemUrl} <br />
                        <strong>Conjunto:</strong> {ferramenta.conjunto} <br />
                        <strong>Número:</strong> {ferramenta.numero} <br />
                        <strong>Patrimônio:</strong> {ferramenta.patrimonio} <br />
                        <strong>Modelo:</strong> {ferramenta.modelo} <br />
                        <strong>Descrição:</strong> {ferramenta.descricao} <br />
                        <strong>Localização ID:</strong> {ferramenta.localizacaoId} <br />
                    </li>
                ))}
            </ul>
            
            
        </div>
        
    );
};

export default CadastroFerr;