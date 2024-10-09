// app/components/card/Card.jsx
"use client"; // Adicione isso no topo do seu arquivo

import React from 'react';
import { Card, List } from 'antd';
import styles from './card.module.css'; // Importando o CSS Module

const data = [
    {
        title: 'Empréstimo',
    },
    {
        title: 'Conferência',
    },
];

const App = () => (
    <List
        className={styles.listContainer} // Aplicando o estilo ao container
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
            <List.Item className={styles.listItem}> {/* Aplicando estilo ao item */}
                <Card title={<span className={styles.cardTitle}>{item.title}</span>} className={styles.card}></Card> {/* Aplicando estilo ao Card */}
            </List.Item>
        )}
    />
);

export default App;