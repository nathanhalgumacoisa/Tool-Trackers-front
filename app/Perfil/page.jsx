"use client";

import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Spin } from 'antd';
import styles from './perfil.module.css'
import Header from '../components/header/Header';


const { Title, Paragraph } = Typography;

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulando uma chamada a uma API
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        
        // Simulando que a imagem do avatar é obtida de outro lugar ou é fixa
        const userData = {
          name: data.name,
          email: data.email,
          ambienteResponsavel: data.ambiente, //puxar o ambiente
          avatar: 'https://via.placeholder.com/150',
        };

        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div >
        <Header />

        <div className={styles.classe}>
      <Card style={{ width: 300, textAlign: 'center' }}>
        <Avatar size={100} src={user.avatar} />
        <Title level={4}>{user.name}</Title>
        <Paragraph>{user.email}</Paragraph>
        <Paragraph>{user.ambiente}</Paragraph>
      </Card>
      </div>

    </div>
  );
};

export default Perfil;