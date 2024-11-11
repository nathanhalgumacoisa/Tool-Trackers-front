"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './organizadores.module.css';
import Header from '../components/header/Header.jsx';

function App() {
  const [locals, setLocals] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [expandedSubId, setExpandedSubId] = useState(null);
  const [expandedImgId, setExpandedImgId] = useState(null);
  const [expandedCarrinhos, setExpandedCarrinhos] = useState(false); // Estado para controlar a exibição de "Carrinhos"
  const [ferramentas, setFerramentas] = useState([]);
  const searchParams = useSearchParams();
  const ambiente = searchParams.get('ambiente');

  useEffect(() => {
    async function getOrganizador() {
      if (ambiente) {
        try {
          const response = await axios.get(`http://localhost:3003/localizacoes/lista/${ambiente}`);
          setLocals(response.data.localizacoes);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getOrganizador();
  }, [ambiente]);
  const handleCarrinhosClick = () => {
    setExpandedCarrinhos(!expandedCarrinhos); // Alterna o estado ao clicar em "Carrinhos"
  };
  const getFerramentas = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/ferramentas`);
      if (response.data && response.data.ferramentas) {
        setFerramentas(response.data.ferramentas);
      } else {
        console.log("Nenhuma ferramenta encontrada na resposta.");
      }
    } catch (error) {
      console.log("Erro ao buscar ferramentas:", error);
    }
  };

  const handleOrganizadorClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleNumOrganizadorClick = (id) => {
    setExpandedSubId(expandedSubId === id ? null : id);
  };

  const handleImgOrganizadorClick = (id, fotoUrl) => {
    setExpandedImgId(expandedImgId === id ? null : id);
    if (expandedImgId !== id) {
      getFerramentas(id);
    } else {
      setFerramentas([]);
    }
  };

  return (
    <div className={styles.container} key="app-container">
      <Header />


      <div className={styles.localsContainer}>

        <div className={styles.h2Container}>
        <h2 className={styles.h2} onClick={handleCarrinhosClick} style={{ cursor: 'pointer' }}>
            Carrinhos
          </h2>
          <h2 className={styles.h2}>Armários</h2>
          <h2 className={styles.h2}>Tornos</h2>
          <h2 className={styles.h2}>Paineis</h2>
        </div>
        
        {expandedCarrinhos && locals
          .filter(local => local.nome_organizador === 'carrinhos') // Filtra apenas os organizadores "carrinhos"
        .map((local, index) => (
          <div key={`org-${index}-${local.organizador_id}`}>
{/* <p onClick={() => handleOrganizadorClick(local.id)} style={{ cursor: 'pointer' }}>
                {local.nome_organizador}
              </p> */}
              <p onClick={() => handleNumOrganizadorClick(local.id)} style={{ cursor: 'pointer' }}>
              {local.numero_organizador}
</p>
<p onClick={() => handleImgOrganizadorClick(local.id)} style={{ cursor: 'pointer' }}>
  {expandedSubId === local.id ? `${local.nome_suborganizador} ${local.numero_suborganizador}` : null}
</p>
              <p>
              {expandedImgId === local.id ?  <img src={local.foto_url}  style={{ width: '50px', height: '50px' }} /> : null}
               
              </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
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

            //   <p
            //   key={`org-${index}-${local.organizador_id}`}
            //   onClick={() => handleOrganizadorClick(local.organizador_id)}
            //   style={{ cursor: 'pointer' }}
            // >
            //   {local.nome_organizador}
            // </p>

            // <p
            //   key={`num-${index}-${local.organizador_id}`}
            //   onClick={() => handleNumOrganizadorClick(local.organizador_id)}
            //   style={{ cursor: 'pointer' }}
            // >
            //   {expandedId === local.organizador_id ? local.numero_organizador : null}
            // </p>

            // <p
            //   key={`sub-${index}-${local.sub_organizador_id}`}
            //   onClick={() => handleImgOrganizadorClick(local.sub_organizador_id)}
            //   style={{ cursor: 'pointer' }}
            // >
            //   {expandedSubId === local.sub_organizador_id ? `${local.nome_suborganizador} ${local.numero_suborganizador}` : null}
            // </p>

            // <p key={`img-${index}-${local.sub_organizador_id}`}>
            //   {expandedImgId === local.sub_organizador_id ? (
            //     <img
            //       key={`img-actual-${index}-${local.sub_organizador_id}`}
            //       src={local.foto_url}
            //       style={{ width: '50px', height: '50px' }}
            //       alt={`Organizador ${local.nome_organizador}`}
            //     />
            //   ) : null}
            // </p>