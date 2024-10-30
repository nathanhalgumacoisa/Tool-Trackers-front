"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Dropdown from '../components/dropdown/Dropdown.jsx';
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
    <div className="App">
      <Header />
      {locals.map((l) => (
  <div key={l.localizacao_id}>
    <h3>{l.ambiente}</h3>
    
    {/* Renderizando organizador */}
    <div>
      <h4>Organizador:</h4>
      <p>{l.nome_organizador} {l.numero_organizador}</p>
    </div>
    <div>
      <h4>Sub-Organizador:</h4>
      <p>{l.nome_suborganizador} {l.numero_organizador} {l.foto_url && (
                  <img src={l.foto_url} alt={l.nome_suborganizador} style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
                )}</p>
    </div>

    
  </div>
))}

      <Dropdown title={['Carrinhos']} />
    </div>
  );
}

export default App;