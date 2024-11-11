"use client";

import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';

import styles from './perfil.module.css';
import Header from '../components/header/Header';

const { Title,  } = Typography;

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();

        const userData = {
          name: data.name,
          email: 'data.email',
          ambienteResponsavel: 'Ambiente de Desenvolvimento', // vai pegar do back
        };

        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.classe}>
        {user && (
          <Card>
            
            <Title level={4}>{user.email}</Title  >
            
          </Card>
        )}
      </div>
    </div>
  );
};

export default Perfil;