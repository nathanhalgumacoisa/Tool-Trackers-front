
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ferreletro.module.css';
import Header from '../components/header/header.jsx';
import CardFerr from '../components/cardFerramenta/CardFerr';
import FiltroFerr from '../components/filtroFerr/FiltroFerr';
import styles from './ferreletro.module.css';

function FerramentasforUser() {
  const [locals, setLocals] = useState([]);
  const [filteredLocals, setFilteredLocals] = useState([]);

  useEffect(() => {
    getFerramentas();
  }, []);

  async function getFerramentas() {
    try {
      const response = await axios.get(`http://localhost:3003/ferramentas`);
      if (response.data && response.data.ferramentas) {
        setLocals(response.data.ferramentas);
        setFilteredLocals(response.data.ferramentas); // Initialize filteredLocals with all ferramentas
      } else {
        console.log("Nenhuma ferramenta encontrada na resposta.");
      }
    } catch (error) {
      console.log("Erro ao buscar ferramentas:", error);
    }
  }

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            console.log("Resposta do servidor:", response.data);
            
            setLocals(prevLocals => 
                prevLocals.map(ferr => 
                    ferr.ferramenta_id === id ? { ...ferr, disponivel: newStatus } : ferr
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar o status de disponibilidade:", error.response?.data || error.message);
        }
    };

  const handleSearchResults = (results) => {
    setFilteredLocals(results);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.App}>
        <h1 className={styles.h1}>Ferramentas Cadastradas</h1>
        <FiltroFerr onSearchResults={handleSearchResults} />
        {filteredLocals.length > 0 ? (
          filteredLocals.map((ferr) => (
            <div className={styles.ferramentas} key={ferr.ferramenta_id}>
              <CardFerr
                nome={ferr.nome}
                imagem_url={ferr.imagem_url}
                conjunto={ferr.conjunto}
                numero={ferr.numero}
                patrimonio={ferr.patrimonio}
                modelo={ferr.modelo}
                descricao={ferr.descricao}
              />
            </div>
          ))
        ) : (
          <p>Nenhuma ferramenta cadastrada.</p>
        )}
      </div>
    </div>
  );
}

export default FerramentasforUser;