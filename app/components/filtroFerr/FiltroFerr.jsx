import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FiltroFerr = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3003/ferramentas', {
        params: {
          nome: searchText,
          conjunto: searchText,
          numero: searchText,
          patrimonio: searchText,
          modelo: searchText,
          disponivel: searchText,
          conferido: searchText,
          emprestado: searchText,
          manutencao: searchText,
          localizacao_id: searchText,
        }
      });
      if (response.data && response.data.ferramentas) {
        setSearchResults(response.data.ferramentas);
      } else {
        console.log("Nenhuma ferramenta encontrada na resposta.");
      }
    } catch (error) {
      console.error('Erro ao buscar ferramentas:', error);
    }
  };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, [searchText]); // Executar a busca sempre que "searchText" for alterado

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {searchResults.map(ferramenta => (
          <li key={ferramenta.id}>{ferramenta.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default FiltroFerr;