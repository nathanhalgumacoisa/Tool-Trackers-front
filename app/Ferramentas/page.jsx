'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                setFilteredLocals(response.data.ferramentas); // Inicializa filteredLocals com todas as ferramentas
            } else {
                console.log("Nenhuma ferramenta encontrada na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar ferramentas:", error);
        }
    }

    const handleUpdateStatus = (id, newStatus) => {
        // Atualiza o estado local com o novo status
        setLocals(prevLocals =>
            prevLocals.map(ferr =>
                ferr.ferramenta_id === id ? { ...ferr, disponivel: newStatus } : ferr
            )
        );
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
              <div className={styles.ferramentasGrid}>
                  {filteredLocals.map((ferr) => (
                      <CardFerr
                          key={ferr.ferramenta_id}
                          id={ferr.ferramenta_id} 
                          nome={ferr.nome}
                          imagem_url={ferr.imagem_url}
                          conjunto={ferr.conjunto}
                          numero={ferr.numero}
                          patrimonio={ferr.patrimonio}
                          modelo={ferr.modelo}
                          descricao={ferr.descricao}
                          disponivel={ferr.disponivel}
                          onUpdateStatus={handleUpdateStatus}
                      />
                  ))}
              </div>
          ) : (
              <p>Nenhuma ferramenta cadastrada.</p>
          )}
      </div>
  </div>
    );
}

export default FerramentasforUser;