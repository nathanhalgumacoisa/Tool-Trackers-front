"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './organizadores.module.css';

import Header from '../components/header/Header.jsx';

function App() {
  const [locals, setLocals] = useState([]);
  const searchParams = useSearchParams();
  const ambiente = searchParams.get('ambiente');

  useEffect(() => {
    async function getOrganizador() {
      if (ambiente) {
        try {
          const response = await axios.get(`http://localhost:3003/localizacoes/lista/${ambiente}`);
          setLocals(response.data.localizacoes);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    getOrganizador();
  }, [ambiente]);

  return (
    <div className={styles.App}>
      <Header />

     
      <table className={styles.table}>
        <thead>
          <tr  className={styles.tr}>
            
            <th>Nome do Organizador</th>
            <th>Número do Organizador</th>
            <th>Nome do Suborganizador</th>
            <th>Número do Suborganizador</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {locals.map(local => (
            <tr key={local.id}>
              <td>{local.id}</td>
              <td>{local.nome_organizador}</td>
              <td>{local.numero_organizador}</td>
              <td>{local.nome_suborganizador}</td>
              <td>{local.numero_suborganizador}</td>
              <td>
                <img src={local.foto_url} alt={local.nome_suborganizador} style={{ width: '50px', height: '50px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;