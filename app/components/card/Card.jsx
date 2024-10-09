// app/components/card/Card.jsx
// app/components/card/Card.jsx
"use client"; // Adicione isso no topo do seu arquivo

import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/navigation'; // Importando useRouter
import styles from './card.module.css'; // Importando o CSS Module

const App = ({ title, link }) => {
    const router = useRouter(); // Inicializando o router

    const handleClick = () => {
        router.push(link); // Redireciona para a página especificada
    };

    return (
        <Card
            className={styles.card}
            style={{ width: 200 }}
            onClick={handleClick} // Adicionando um manipulador de clique
        >
            <p className={styles.title1}>{title}</p>
        </Card>
    );
};

export default App;