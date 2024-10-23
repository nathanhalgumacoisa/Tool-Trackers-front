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
    const [organizadorId, setOrganizadorId] = useState('');
    const [subOrganizadorId, setSubOrganizadorId] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [organizador, setOrganizadores] = useState([]);
    const [sub_rganizador, setSubOrganizadores] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCadastrarFerr();
        fetchOrganizadores();
    }, []);

    const fetchCadastrarFerr = async () => {
        try {
            const response = await axios.get('http://localhost:3003/ferramentas');
            setFerramentas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOrganizadores = async () => {
        try {
            const response = await axios.get('http://localhost:3003/organizador');
            setOrganizadores(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSubOrganizadores = async (organizadorId) => {
        try {
            const response = await axios.get(`http://localhost:3003/sub_organizador?organizador_id=${organizadorId}`);
            setSubOrganizadores(response.data);
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
            organizador_id,
            suborganizador_id
        };
        
        try {
            await axios.post('http://localhost:3003/ferramentas', data);
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
        setOrganizadorId('');
        setSubOrganizadorId('');
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
                            Organizador:
                            <select
                                className={styles.input}
                                value={organizadorId}
                                onChange={(e) => {
                                    setOrganizadorId(e.target.value);
                                    fetchSubOrganizadores(e.target.value);
                                }}
                                required
                            >
                                <option value="">Selecione um organizador</option>
                                {organizador.map((org) => (
                                    <option key={org.id} value={org.id}>{org.nome}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Sub-Organizador:
                            <select
                                className={styles.input}
                                value={subOrganizadorId}
                                onChange={(e) => setSubOrganizadorId(e.target.value)}
                                required
                            >
                                <option value="">Selecione um sub-organizador</option>
                                {subOrganizadores.map((subOrg) => (
                                    <option key={subOrg.id} value={subOrg.id}>{subOrg.nome}</option>
                                ))}
                            </select>
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