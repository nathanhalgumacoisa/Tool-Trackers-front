"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/header/Header.jsx';
import OrganizadorComponent from '../components/dropOrganizadores/DropOrganizadores.jsx';

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

  // Filtrando organizadores por tipo
  const organizadores = {
    carrinhos: locals.filter(l => l.nome_organizador === 'carrinhos'),
    armarios: locals.filter(l => l.nome_organizador === 'armarios'),
    tornos: locals.filter(l => l.nome_organizador === 'tornos'),
    paineis: locals.filter(l => l.nome_organizador === 'paineis'),
  };

  return (
    <div className="App">
      <Header />
      
      {/* Componente de Organizadores com dados filtrados */}
      <OrganizadorComponent organizadores={organizadores} />
    </div>
  );
}

export default App;