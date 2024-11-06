
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ferreletro.module.css';
import Header from '../components/header/header.jsx';
import CardFerr from '../components/cardFerramenta/CardFerr';

function FerramentasforUser() {
    const [locals, setLocals] = useState([]);

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

    const handleUpdateStatus = (id, newStatus) => {
        setLocals(prevLocals => 
            prevLocals.map(ferr => 
                ferr.ferramenta_id === id ? { ...ferr, disponivel: newStatus } : ferr
            )
        );
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.App}>
                <h1 className={styles.h1}>Ferramentas Cadastradas</h1>
                {locals.length > 0 ? (
                    locals.map((ferr) => (
                        <div className={styles.ferramentas} key={ferr.ferramenta_id}>
                            <CardFerr
                                id={ferr.ferramenta_id} // Passa o ID da ferramenta
                                nome={ferr.nome}
                                imagem_url={ferr.imagem_url}
                                conjunto={ferr.conjunto}
                                numero={ferr.numero}
                                patrimonio={ferr.patrimonio}
                                modelo={ferr.modelo}
                                descricao={ferr.descricao}
                                disponivel={ferr.disponivel} // Passa o status de disponibilidade
                                onUpdateStatus={handleUpdateStatus} // Passa a função de atualização
                            />
                        </div>
                    ))
                ) : (
                    <p>Nenhuma ferramenta cadastrada.</p>
                )}
            </div>
        </div>
    );
}

export default FerramentasforUser;
