"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cadastroferr.module.css'; // Certifique-se de que o caminho do CSS esteja correto
import Header from '../components/header/Header';
import { App } from '../components/inputs/inputs';


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
        
        <div className={styles.container}>
          <Header/>  
            <h1>Cadastro de Ferramentas</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>

                <div>
                  <App/>

                </div>

                <div>
                    <label>Imagem URL:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={imagemUrl}
                        onChange={(e) => setImagemUrl(e.target.value)}
                        placeholder="Digite a URL da imagem"
                    />
                </div>

                <div>
                    <label>Conjunto:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={conjunto}
                        onChange={(e) => setConjunto(e.target.value)}
                        placeholder="Digite o conjunto"
                    />
                </div>

                <div>
                    <label>Número:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder="Digite o número"
                    />
                </div>

                <div>
                    <label>Patrimônio:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={patrimonio}
                        onChange={(e) => setPatrimonio(e.target.value)}
                        placeholder="Digite o patrimônio"
                    />
                </div>

                <div>
                    <label>Modelo:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        placeholder="Digite o modelo"
                    />
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea
                        className={styles.input}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Digite a descrição"
                    />
                </div>

                <div>
                    <label>Localização ID:</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={localizacaoId}
                        onChange={(e) => setLocalizacaoId(e.target.value)}
                        placeholder="Digite a localização ID"
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Enviar</button>
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