"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cadastroferr.module.css'; // Certifique-se de que o caminho do CSS esteja correto
import Header from '../components/header/Header';

const CadastroFerr = () => {
    const [nome, setNome] = useState('');
    const [imagem_url, setImagemUrl] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [numero, setNumero] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ambiente, setAmbiente] = useState('');
    
    // Novos estados
    const [nome_organizador, setNomeOrganizador] = useState('');
    const [numero_organizador, setNumeroOrganizador] = useState('');
    const [nome_suborganizador, setNomeSubOrganizador] = useState('');
    const [numero_suborganizador, setNumeroSubOrganizador] = useState('');
    const [foto_url, setFotoUrl] = useState('');
    
    const [organizadores, setOrganizadores] = useState([]);
    const [sub_organizadores, setSubOrganizadores] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchOrganizadores();
    }, []);

    const fetchOrganizadores = async () => {
        try {
            const response = await axios.get('http://localhost:3003/organizador');
            console.log('Dados dos organizadores:', response.data); // Para depuração
            setOrganizadores(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSubOrganizadores = async () => {
        try {
            const response = await axios.get('http://localhost:3003/sub_organizadores');
            console.log('Dados dos sub-organizadores:', response.data); // Para depuração
            setSubOrganizadores(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const ferramentaData = { nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao };
        const localizacaoData = { ambiente }; // Dados para a tabela de localizações

        try {
            await axios.post('http://localhost:3003/ferramentas', ferramentaData);
            await axios.post('http://localhost:3003/organizador', {
                nome: nome_organizador,
                numero: numero_organizador
            });
            await axios.post('http://localhost:3003/sub_organizador', {
                nome: nome_suborganizador,
                numero: numero_suborganizador,
            });
            await axios.post('http://localhost:3003/localizacoes', localizacaoData);

            setSuccessMessage('Cadastrado com sucesso!');
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
        // setOrganizadorId('');
        // setSubOrganizadorId('');
        setAmbiente('');
        setNomeOrganizador('');
        setNumeroOrganizador('');
        setNomeSubOrganizador('');
        setNumeroSubOrganizador('');
        setFotoUrl('');
    };

    return (
        <div className={styles.conjunto}>
            <Header />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <h1>Cadastro de Ferramentas</h1>

                    {/* Campos do formulário */}
                    <div>
                        <label>Nome:
                            <input type="text" className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} required />
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
                                type="text"
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
                            Ambiente:
                            <input
                                type="text"
                                className={styles.input}
                                value={ambiente}
                                onChange={(e) => setAmbiente(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>Nome do Organizador:
                            <input
                                type="text"
                                className={styles.input}
                                value={nome_organizador}
                                onChange={(e) => setNomeOrganizador(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>Numero do Organizador:
                            <input
                                type="text"
                                className={styles.input}
                                value={numero_organizador}
                                onChange={(e) => setNumeroOrganizador(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>Nome do Sub-organizador:
                            <input
                                type="text"
                                className={styles.input}
                                value={nome_suborganizador}
                                onChange={(e) => setNomeSubOrganizador(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>Numero do Sub-organizador:
                            <input
                                type="text"
                                className={styles.input}
                                value={numero_suborganizador}
                                onChange={(e) => setNumeroSubOrganizador(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>Foto de referência do sub-organizador:
                            <input type="text" className={styles.input} value={foto_url} onChange={(e) => setFotoUrl(e.target.value)} required />
                        </label>
                    </div>

                    <div>
                        <button type="submit" className={styles.submitButton}>Enviar</button>
                    </div>
                </div>
            </form>

            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default CadastroFerr;
