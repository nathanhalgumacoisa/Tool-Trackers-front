import React, { useState } from 'react';
import axios from 'axios';
import styles from './filtroFerr.module.css';

const FiltroFerr = ({ onSearchResults }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3003/ferramentas', {
        params: {
          searchText: searchText
        }
      });

      if (response.data && response.data.ferramentas) {
        const filteredResults = response.data.ferramentas.filter(ferr => 
          Object.values(ferr).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
          )
        );
        onSearchResults(filteredResults);
      } else {
        onSearchResults([]);
        console.log("Nenhuma ferramenta encontrada na resposta.");
      }
    } catch (error) {
      console.error('Erro ao buscar ferramentas:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Pesquisar ferramentas..."
          className={styles.nav_search}
        />
        <button onClick={handleSearch} className={styles.btn_search}>
          <img src="/lupa.png" alt="Pesquisar" className={styles.searchIcon} />
        </button>
      </div>
    </div>
  );
};

export default FiltroFerr;