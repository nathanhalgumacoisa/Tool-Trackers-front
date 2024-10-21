"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cadastroferr.module.css'; // Certifique-se de que o caminho do CSS esteja correto
import Header from '../components/header/Header';
import App from '../components/inputs/inputs.jsx';



const CadastroFerr = () => {
    const [nome, setNome] = useState('');
    const [imagem_url, setImagemUrl] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [numero, setNumero] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacaoId, setLocalizacaoId] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    // const apiURL = "http://192.168.15.138:3003";

    useEffect(() => {
        fetchCadastrarFerr();
    }, []);

    const fetchCadastrarFerr = async () => {
        try {
            const response = await axios.get('http://localhost:3003/ferramentas');
            setFerramentas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nome,
            imagem_url,
            conjunto,
            numero,
            patrimonio,
            modelo,
            descricao,
            localizacaoId
        };
        console.log(data)

        try {
            await axios.post('http://localhost:3003/ferramentas', {
                nome,
                imagem_url,
                conjunto,
                numero,
                patrimonio,
                modelo,
                descricao,
                localizacaoId
            });
            setSuccessMessage('Cadastrado com sucesso!');
            //fetchCadastrarFerr();
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
            <Header />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <h1>Cadastro de Ferramentas</h1>

                    <div>
                        <label>
                            Nome:
                            <input
                                type="text"
                                className={styles.input}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Imagem URL:
                            <input
                                type="text"
                                className={styles.input}
                                value={imagem_url}
                                onChange={(e) => setImagemUrl(e.target.value)}
                                placeholder="digite algo"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Conjunto:
                            <input
                                type="text"
                                className={styles.input}
                                value={conjunto}
                                onChange={(e) => setConjunto(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Número:
                            <input
                                type="number"
                                className={styles.input}
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Patrimônio:
                            <input
                                type="text"
                                className={styles.input}
                                value={patrimonio}
                                onChange={(e) => setPatrimonio(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Modelo:
                            <input
                                type="text"
                                className={styles.input}
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Descrição:
                            <textarea
                                className={styles.input}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            ></textarea>
                        </label>
                    </div>

                    <div>
                        <label>
                            Localização ID:
                            <input
                                type="text"
                                className={styles.input}
                                value={localizacaoId}
                                onChange={(e) => setLocalizacaoId(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" className={styles.submitButton}>Enviar</button>
                </div>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );

};

export default CadastroFerr;