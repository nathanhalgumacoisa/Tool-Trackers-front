"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cadastroferr.module.css';
import Header from '../components/header/Header';
import {  FaRegCheckCircle } from "react-icons/fa"; // Importando ícones

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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const stepInputs = [
        [
            { label: "Nome", value: nome, setter: setNome, type: "text", required: true },
            { label: "Imagem URL", value: imagem_url, setter: setImagemUrl, type: "text", required: true },
            { label: "Conjunto", value: conjunto, setter: setConjunto, type: "text", required: true },
            { label: "Número", value: numero, setter: setNumero, type: "text", required: true },
        ],
        [
            { label: "Patrimônio", value: patrimonio, setter: setPatrimonio, type: "text", required: true },
            { label: "Modelo", value: modelo, setter: setModelo, type: "text", required: true },
            { label: "Descrição", value: descricao, setter: setDescricao, type: "textarea", required: true },
            {
                label: "Selecione o Ambiente",
                value: ambiente,
                setter: setAmbiente,
                type: "select",
                options: ["Oficina mecanica de usinagem", "Oficina eletro eletrônica", "Espaço maker", "Manutencao"],
                required: true
            },
        ],
        [
            { label: "Selecione o Organizador", value: nome_organizador, setter: setNomeOrganizador, type: "select", options: ["carrinhos", "armarios", "tornos", "paineis"], required: true },
            { label: "Número do Organizador", value: numero_organizador, setter: setNumeroOrganizador, type: "text", required: true },
            { label: "Selecione o Sub-organizador", value: nome_suborganizador, setter: setNomeSubOrganizador, type: "select", options: ["gavetas", "prateleiras", "outros"], required: true },
            { label: "Número do Sub-organizador", value: numero_suborganizador, setter: setNumeroSubOrganizador, type: "text", required: true },
            { label: "Foto de referência do sub-organizador", value: foto_url, setter: setFotoUrl, type: "text", required: true },
        ]
    ];

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
        
        // Lógica de envio dos dados...
        
        // Limpar os estados dos inputs
        setNome('');
        setImagemUrl('');
        setConjunto('');
        setNumero('');
        setPatrimonio('');
        setModelo('');
        setDescricao('');
        setAmbiente('');
        setNomeOrganizador('');
        setNumeroOrganizador('');
        setNomeSubOrganizador('');
        setNumeroSubOrganizador('');
        setFotoUrl('');
        
        // Retornar ao primeiro passo
        setCurrentStep(0);
        
        // Exibir mensagem de sucesso
        setIsModalVisible(true);
        
        // Focar no primeiro input após limpar
        setTimeout(() => {
            const firstInput = document.querySelector(`input[type="text"], textarea, select`);
            if (firstInput) {
                firstInput.focus();
            }
        }, 0);
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
                <div className={styles.container}>
                <h1 className={styles.h11}>Cadastro de Ferramentas</h1>
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
                                        <option value="" disabled className={styles.opcoes}>Selecione</option>
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
                </div>
                
            </form>

            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Ferramenta criada com sucesso</h2>
                        <FaRegCheckCircle style={{ color: 'green', fontSize: '100px', margin: '20px' }} />
                        <button onClick={() => setIsModalVisible(false)} className={styles.closeButton}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CadastroFerr;