"use client";

import { Card } from 'antd';
import { useRouter } from 'next/navigation'; 
import styles from './card.module.css'; 

const App = ({ title, link, image }) => {
    const router = useRouter(); 

    const handleClick = () => {
        router.push(link); // Redireciona para a página especificada
    };

    return (
        <Card
            className={styles.card}
            style={{ width: 250, height: 250, borderRadius: 30, marginLeft: 60 }}
            onClick={handleClick} // Adicionando um manipulador de clique
        >
            <p className={styles.title1}>{title}</p>
            <img src={image} alt={title} className={styles.cardImage} />
        </Card>
    );
};

export default App;