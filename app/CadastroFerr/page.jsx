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
                        <label>
                            <h2 className={styles.title}>Nome:</h2>
                            <input type="text" className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite aqui..." required />
                        </label>
                    </div>
                    <div>
                        <label>
                            <h2 className={styles.title}>Imagem URL:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={imagem_url}
                                onChange={(e) => setImagemUrl(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <h2 className={styles.title}>Conjunto:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={conjunto}
                                onChange={(e) => setConjunto(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <h2 className={styles.title}>Número:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <h2 className={styles.title}>Patrimônio:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={patrimonio}
                                onChange={(e) => setPatrimonio(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <h2 className={styles.title}>Modelo:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <h2 className={styles.title}>Descrição:</h2>
                            <textarea
                                className={styles.input}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            ></textarea>
                        </label>
                    </div>

                    <div className={styles.input_container}>
                        <label>
                            <h2 className={styles.title}>Selecione o ambiente</h2>
                            <select
                                className={styles.select}
                                value={ambiente}
                                onChange={(e) => setAmbiente(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione um tipo</option>
                                <option value="oficina mecanica de usinagem">Oficina de mecânica de Usinagem</option>
                                <option value="oficna eletro eletronica">Oficna Eletro eletrônica</option>
                                <option value="especo maker">Espaço Maker</option>
                                <option value="manutencao">Manutenção</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.input_container}>
                        <label>
                            <h2 className={styles.title}>Selecione o organizador</h2>
                            <select
                                className={styles.select}
                                value={nome_organizador}
                                onChange={(e) => setNomeOrganizador(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione um organizador</option>
                                <option value="carrinhos">Carrinhos</option>
                                <option value="armarios">Armários</option>
                                <option value="tornos">Tornos</option>
                                <option value="paineis">Painéis</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            <h2 className={styles.title}>Numero do Organizador:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={numero_organizador}
                                onChange={(e) => setNumeroOrganizador(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.input_container}>
                        <label>
                            <h2 className={styles.title}>Selecione o sub-organizador</h2>
                            <select
                                className={styles.select}
                                value={nome_suborganizador}
                                onChange={(e) => setNomeSubOrganizador(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione um sub-organizador</option>
                                <option value="gavetas">Gavetas</option>
                                <option value="prateleiras">Prateleiras</option>
                                <option value="outros">Outros</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            <h2 className={styles.title}>Numero do Sub-organizador:</h2>
                            <input
                                type="text"
                                className={styles.input}
                                value={numero_suborganizador}
                                onChange={(e) => setNumeroSubOrganizador(e.target.value)}
                                placeholder="Digite aqui..."
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <h2 className={styles.title}>Foto de referência do sub-organizador:</h2>
                            <input type="text" className={styles.input} value={foto_url} onChange={(e) => setFotoUrl(e.target.value)} placeholder="Digite aqui..." required />
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
