import React, { useState } from 'react';
import axios from 'axios';

const FiltroFerr = ({ onSearchResults }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3003/ferramentas', {
        params: {
          disponivel: searchText,
        }
      });

      if (response.data && response.data.ferramentas) {
        const filteredResults = response.data.ferramentas.filter(ferr => ferr.nome.toLowerCase().includes(searchText.toLowerCase()));
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
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Pesquisar ferramentas..."
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default FiltroFerr;