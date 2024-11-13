"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cadastroferr.module.css'; 
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
    const [nome_organizador, setNomeOrganizador] = useState('');
    const [numero_organizador, setNumeroOrganizador] = useState('');
    const [nome_suborganizador, setNomeSubOrganizador] = useState('');
    const [numero_suborganizador, setNumeroSubOrganizador] = useState('');
    const [foto_url, setFotoUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        fetchOrganizadores();
        fetchSubOrganizadores();
    }, []);
    
    const fetchOrganizadores = async () => {
        try {
            const response = await axios.get('http://localhost:3003/organizador');
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
    
        try {
            // Primeiro, cria a localização
            const data = {
                ambiente,
                organizador_id: ambiente === "oficina mecanica de usinagem" ? 1 :
                                ambiente === "oficina eletro eletronica" ? 2 :
                                ambiente === "especo maker" ? 3 : 4,
                slug: ambiente === "oficina mecanica de usinagem" ? "ofm" :
                      ambiente === "oficina eletro eletronica" ? "oee" :
                      ambiente === "especo maker" ? "em" : "manut",
            };
    
            // Criação da localização
            const response = await axios.post('http://localhost:3003/localizacoes', data);
            const createdLocalizacaoId = response.data.localizacao_id; // Verifique se o ID está sendo retornado
    
            // Agora cria a ferramenta
            await axios.post('http://localhost:3003/ferramentas', {
                nome, 
                imagem_url, 
                conjunto, 
                numero, 
                patrimonio, 
                modelo, 
                descricao, 
                localizacao_id: createdLocalizacaoId // Utilize o ID da localização
            });
    
            // Criação do organizador e sub-organizador
            await axios.post('http://localhost:3003/organizador', {
                nome_organizador,
                numero_organizador
            });
            await axios.post('http://localhost:3003/sub_organizador', {
                nome_suborganizador,
                numero_suborganizador,
            });
    
            setSuccessMessage('Cadastrado com sucesso!');
            clearInputs();
        } catch (error) {
            console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
        }
    };

    const handleNext = () => {
        if (currentStep < stepInputs.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className={styles.conjunto}>
            <Header />
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Ferramentas</h1>
                <div className={styles.container}>
                    {/* Renderizando os inputs da etapa atual */}
                    {stepInputs[currentStep].map((input, index) => (
                        <div key={index}>
                            <label className={styles.titulos}>
                                <h2 className={styles.title}>{input.label}:</h2>
                                {input.type === 'textarea' ? (
                                    <textarea
                                        className={styles.input}
                                        value={input.value}
                                        onChange={(e) => input.setter(e.target.value)}
                                        placeholder="Digite aqui..."
                                        required={input.required}
                                    />
                                ) : input.type === 'select' ? (
                                    <select
                                        className={styles.select}
                                        value={input.value}
                                        onChange={(e) => input.setter(e.target.value)}
                                        required={input.required}
                                    >
                                        <option value="" disabled>Selecione</option>
                                        {input.options.map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={input.type}
                                        className={styles.input}
                                        value={input.value}
                                        onChange={(e) => input.setter(e.target.value)}
                                        placeholder="Digite aqui..."
                                        required={input.required}
                                    />
                                )}
                            </label>
                        </div>
                    ))}

                    
                </div>
                <div className={styles.botoes}>
                        {currentStep > 0 && (
                            <button type="button" onClick={handlePrevious} className={styles.navButton2}>
                                Anterior
                            </button>
                        )}
                        {currentStep < stepInputs.length - 1 ? (
                            <button type="button" onClick={handleNext} className={styles.navButton1}>
                                Próximo
                            </button>
                        ) : (
                            <button type="submit" className={styles.submitButton}>
                                Enviar
                            </button>
                        )}
                    </div>
            </form>

            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default CadastroFerr;