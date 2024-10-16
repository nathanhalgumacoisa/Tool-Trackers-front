"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import axios from 'axios';

import Dropdown from '../components/dropdown/Dropdown.jsx';
import Header from '../components/header/Header.jsx';

function App() {
  const [locals, setLocals] = useState([])
  const searchParams = useSearchParams();
  const ambiente = searchParams.get('ambiente');

  useEffect(() => {
    async function getOrganizador() {
      if (ambiente) {
        try {
          const response = await axios.get(`http://localhost:3003/localizacoes/lista/${ambiente}`)
          setLocals(response.data.localizacoes)
          console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      }
    }

    getOrganizador();
  }, [ambiente])

  return (
    <div className="App">
      <Header />

      {
        locals.map((l) => (
          <div key={l.id}>
            <p>{l.ambiente}</p>
          </div>
        ))
      }

      <Dropdown title={['Carrinhos']} />
    </div>
  );
}

export default App;