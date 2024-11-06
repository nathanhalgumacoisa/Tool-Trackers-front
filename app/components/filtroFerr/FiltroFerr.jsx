import React, { useState, useEffect } from 'react';
import styles from './filtroFerr.module.css'
import axios from 'axios';

const FiltroFerr = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3003/ferramentas', {
        params: {
          disponivel: searchText, 
        }
      });
      if (response.data && response.data.ferramentas) {
        setSearchResults(response.data.ferramentas);
      } else {
        setSearchResults([]); 
        console.log("Nenhuma ferramenta encontrada na resposta.");
      }
    } catch (error) {
      console.error('Erro ao buscar ferramentas:', error);
    }
  };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    } else {
      setSearchResults([]); 
    }
  }, [searchText]);

  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <input
          className={styles.nav_search}
          type="text"
          placeholder="Pesquisar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className={styles.btn_search} onClick={handleSearch}>Buscar</button>
      </div>
      <ul className={styles.results}>
        {searchResults.map(ferr => (
          <li className={styles.li} key={ferr.ferramenta_id}>{ferr.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default FiltroFerr;