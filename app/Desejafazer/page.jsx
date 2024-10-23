import React from 'react';
import App from '../components/card/Card'; // Ajuste o caminho conforme necessário
import styles from './deseja.module.css'; // Importando o CSS Module
import Header from '../components/header/Header.jsx';


const Desejafazer = () => {
    return (
        <div>
            <Header />
            <div className={styles.imageContainer}>
                <img src="./fundosenai.png" alt="Fundo Senai" className={styles.imagem1} />
                <h1 className={styles.cards1}>O que deseja fazer?</h1>
            </div>

            <div className={styles.cardsContainer}>
                <App
                    title={<span style={{ fontSize: '18px' }}>Emprèstimo</span>}
                    link="/opcoesEmprestimos"
                    image="/ferramentas2.png" // Substitua pelo caminho correto da imagem
                />
                <App
                    title={<span style={{ fontSize: '18px' }}>Conferência</span>}
                    link="/OpcoesConferencias"
                    image="/lista.png"
                />
            </div>
        </div>
    );
};


export default Desejafazer;