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
            <p>{l.nome_organizador}</p>
            <p>Número do Organizador: {l.numero_organizador}</p>
          </div>

          {/* Renderizando sub-organizadores */}
          {l.sub_organizadores && l.sub_organizadores.length > 0 && (
            <div>
              <h4>Sub-Organizadores:</h4>
              <ul>
                {l.sub_organizadores.map((sub) => (
                  <li key={sub.sub_organizador_id}>
                    {sub.nome_suborganizador} (Número: {sub.numero_suborganizador})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Renderizando imagens */}
          {l.imagens && l.imagens.length > 0 && (
            <div>
              <h4>Imagens:</h4>
              <ul>
                {l.imagens.map((img) => (
                  <li key={img.imagem_id}>
                    <img src={img.url_imagem} alt={img.descricao} style={{ width: '100px' }} />
                    <p>{img.descricao}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <Dropdown title={['Carrinhos']} />
    </div>
  );
}

export default App;