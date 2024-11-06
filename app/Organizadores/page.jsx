"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './organizadores.module.css';
import Header from '../components/header/Header.jsx';
import NestedDropdown from '../components/dropOrganizadores/DropOrganizadores';

function App() {
  const [locals, setLocals] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Estado para controlar qual organizador foi clicado
  const [expandedSubId, setExpandedSubId] = useState(null); // Estado para controlar qual organizador foi clicado
  const [expandedImgId, setExpandedImgId] = useState(null); // Estado para controlar qual organizador foi clicado
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

  const handleOrganizadorClick = (id) => {
    setExpandedId(expandedId === id ? null : id); // Alterna o estado ao clicar
  };
  const handleNumOrganizadorClick = (id) => {
    setExpandedSubId(expandedSubId === id ? null : id); // Alterna o estado ao clicar
  };
  const handleImgOrganizadorClick = (id) => {
    setExpandedImgId(expandedImgId === id ? null : id); // Alterna o estado ao clicar
  };

  return (
    <div className={styles.App}>
      <Header />

      <div className={styles.table}>
          {locals.map(local => (
            <div key={local.id}>
              {/* <p onClick={() => handleOrganizadorClick(local.id)} style={{ cursor: 'pointer' }}>
                {local.nome_organizador}
              </p>
              <p onClick={() => handleNumOrganizadorClick(local.id)} style={{ cursor: 'pointer' }}>
  {expandedId === local.id ? local.numero_organizador : null}
</p>
<p onClick={() => handleImgOrganizadorClick(local.id)} style={{ cursor: 'pointer' }}>
  {expandedSubId === local.id ? `${local.nome_suborganizador} ${local.numero_suborganizador}` : null}
</p>
              <p>
              {expandedImgId === local.id ?  <img src={local.foto_url}  style={{ width: '50px', height: '50px' }} /> : null}
               
              </p> */}
              <NestedDropdown  nome_organizador={local.nome_organizador} numero_organizador={local.numero_organizador} 
              nome_suborganizador={local.nome_suborganizador} numero_suborganizador={local.numero_suborganizador}  
              foto_url={local.foto_url}/>
            </div>
          ))}
       
      </div>
    </div>

    
  );
}

export default App;