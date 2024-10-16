import React from 'react';
import App from '../components/card/Card'; // Ajuste o caminho conforme necessário
import styles from './deseja.module.css'; // Importando o CSS Module

const Desejafazer = () => {
    return (
        <div>
            <h1 className={styles.cards1}>O que deseja fazer ?</h1>
            <div className={styles.cardsContainer}> {/* Contêiner flexível para os cards */}
                <App title="Empréstimo" link="/opcoesEmprestimos" /> {/* Primeiro card */}
                <App title="Conferência" link="/opcoesConferencia" /> {/* Segundo card */}
            </div>
        </div>
    );
};


export default Desejafazer;