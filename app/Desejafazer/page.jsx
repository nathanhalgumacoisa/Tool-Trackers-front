
import React from 'react';
import App from '../components/card/Card'; 
import styles from './deseja.module.css'; 
import Header from '../components/header/Header.jsx';


const Desejafazer = () => {
    return (
        <div  >
            <div className={styles.div1}>
            <Header />
            </div>
            <div className={styles.imageContainer}>
                <img src="./fundosenai.png" alt="Fundo Senai" className={styles.imagem1} />
                <h1 className={styles.cards1}>O que deseja fazer?</h1>
            </div>


        
        <div className={styles.cards}>
            <div className={styles.cardsContainer}>
                <App
                    title={<span style={{ fontSize: '18px' }}>Empréstimos</span>}
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

        </div>
    );
};


export default Desejafazer;