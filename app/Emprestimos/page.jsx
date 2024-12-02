'use client';

import React, { useState } from 'react';
import styles from './emprestimos.module.css';
import Header from '../components/header/header.jsx';
import {  FaRegCheckCircle } from "react-icons/fa"; // Importando ícones

const Emprestimos = () => {
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [ferramenta, setFerramenta] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [dataRetorno, setDataRetorno] = useState('');
    const [localDestino, setLocalDestino] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Aqui você pode adicionar a lógica para fazer o empréstimo
        // Por exemplo, enviar os dados para uma API

        // Limpar os campos
        setNome('');
        setCurso('');
        setFerramenta('');
        setDataEmprestimo('');
        setDataRetorno('');
        setLocalDestino('');

        // Exibir o modal
        setIsModalVisible(true);
    };

    return (
        <div className={styles.conjunto}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.h01}>Página de Empréstimos</h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.divinputs}>
                        <div>
                            <h2 className={styles.title}>Nome:</h2>
                        </div>
                        <div>
                            <input
                                className={styles.input}
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.divinputs}>
                        <div>
                            <h2 className={styles.title}>Curso</h2>
                        </div>
                        <div>
                            <input
                                className={styles.input}
                                placeholder="Curso"
                                value={curso}
                                onChange={(e) => setCurso(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.divinputs}>
                        <div>
                            <h2 className={styles.title}>Ferramenta</h2>
                        </div>
                        <div>
                            <input
                                className={styles.input}
                                placeholder="Ferramenta"
                                value={ferramenta}
                                onChange={(e) => setFerramenta(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.divinputs}>
                        <div>
                            <h2 className={styles.title}>Data do empréstimo</h2>
                        </div>
                        <div>
                            <input
                                className={styles.input}
                                type='date'
                                value={dataEmprestimo}
                                onChange={(e) => setDataEmprestimo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.divinputs}>
                        <div>
                            <h2 className={styles.title}>Data de retorno</h2>
                        </div>
                        <div>
                            <input
                                type='date'
                                className={styles.input}
                                value={dataRetorno}
                                onChange={(e) => setDataRetorno(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.divinputs}>
                        <div>
                            <h2 className={styles.title}>Local de destino</h2>
                        </div>
                        <div>
                            <select
                                className={styles.input}
                                value={localDestino}
                                onChange={(e) => setLocalDestino(e.target.value)}
                            >
                                <option value="">Selecione um local</option>
                                <option value="oficina_mecanica">Oficina Mecânica de Usinagem</option>
                                <option value="oficina_eletroeletronica">Oficina de Eletro Eletrônica</option>
                                <option value="espaco_maker">Espaço Maker</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.bu01}>
                        <button type="submit" className={styles.submitButton}>
                            Fazer Empréstimo
                        </button>
                    </div>
                </form>
            </div>

            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Ferramenta criada com sucesso</h2>
                        
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

export default Emprestimos;