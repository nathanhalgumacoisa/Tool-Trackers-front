"use client";
// app/components/card/Card.jsx

import { Card } from 'antd';
import { useRouter } from 'next/navigation'; // Importando useRouter
import styles from './card.module.css'; // Importando o CSS Module

const App = ({ title, link, image }) => {
    const router = useRouter(); // Inicializando o router

    const handleClick = () => {
        router.push(link); // Redireciona para a página especificada
    };

    return (
        <Card
            className={styles.card}
            style={{ width: 250, height: 250 }}
            onClick={handleClick} // Adicionando um manipulador de clique
        >
            <p className={styles.title1}>{title}</p>
            <img src={image} alt={title} className={styles.cardImage} />
        </Card>
    );
};

export default App;