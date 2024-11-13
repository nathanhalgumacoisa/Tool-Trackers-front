"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './organizadores.module.css';
import Header from '../components/header/Header.jsx';

function App() {
  const [locals, setLocals] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [expandedCarrinhos, setExpandedCarrinhos] = useState(false);
  const [expandedArmarios, setExpandedArmarios] = useState(false);
  const [expandedTornos, setExpandedTornos] = useState(false);
  const [expandedPaineis, setExpandedPaineis] = useState(false);
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

  const handleNumOrganizadorClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], sub: !prev[id]?.sub, img: false }
    }));
  };

  const handleImgOrganizadorClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], img: !prev[id]?.img }
    }));
    if (!expanded[id]?.img) {
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
          <select></select>
          <h2 className={styles.h2} onClick={() => setExpandedCarrinhos(!expandedCarrinhos)}>Carrinhos</h2>
          {expandedCarrinhos && locals
            .filter(local => local.nome_organizador === 'carrinhos')
            .map((local, index) => (
              <div key={`carrinho-${index}-${local.organizador_id}`} className={styles.mapItem}>
                <p onClick={() => handleNumOrganizadorClick(local.id)} className={styles.mapText}>
                  {local.numero_organizador}
                </p>
                {expanded[local.id]?.sub && (
                  <p onClick={() => handleImgOrganizadorClick(local.id)} className={styles.mapText}>
                    {local.nome_suborganizador} {local.numero_suborganizador}
                  </p>
                )}
                {expanded[local.id]?.img && (
                  <img src={local.foto_url} className={styles.mapImage} />
                )}
              </div>
            ))}
        </div>

        <div className={styles.h2Container}>
          <h2 className={styles.h2} onClick={() => setExpandedArmarios(!expandedArmarios)}>Armários</h2>
          {expandedArmarios && locals
            .filter(local => local.nome_organizador === 'armarios')
            .map((local, index) => (
              <div key={`armario-${index}-${local.organizador_id}`} className={styles.mapItem}>
                <p onClick={() => handleNumOrganizadorClick(local.id)} className={styles.mapText}>
                  {local.numero_organizador}
                </p>
                {expanded[local.id]?.sub && (
                  <p onClick={() => handleImgOrganizadorClick(local.id)} className={styles.mapText}>
                    {local.nome_suborganizador} {local.numero_suborganizador}
                  </p>
                )}
                {expanded[local.id]?.img && (
                  <img src={local.foto_url} className={styles.mapImage} />
                )}
              </div>
            ))}
        </div>

        <div className={styles.h2Container}>
          <h2 className={styles.h2} onClick={() => setExpandedTornos(!expandedTornos)}>Tornos</h2>
          {expandedTornos && locals
            .filter(local => local.nome_organizador === 'tornos')
            .map((local, index) => (
              <div key={`torno-${index}-${local.organizador_id}`} className={styles.mapItem}>
                <p onClick={() => handleNumOrganizadorClick(local.id)} className={styles.mapText}>
                  {local.numero_organizador}
                </p>
                {expanded[local.id]?.sub && (
                  <p onClick={() => handleImgOrganizadorClick(local.id)} className={styles.mapText}>
                    {local.nome_suborganizador} {local.numero_suborganizador}
                  </p>
                )}
                {expanded[local.id]?.img && (
                  <img src={local.foto_url} className={styles.mapImage} />
                )}
              </div>
            ))}
        </div>

        <div className={styles.h2Container}>
          <h2 className={styles.h2} onClick={() => setExpandedPaineis(!expandedPaineis)}>Paineis</h2>
          {expandedPaineis && locals
            .filter(local => local.nome_organizador === 'paineis')
            .map((local, index) => (
              <div key={`painel-${index}-${local.organizador_id}`} className={styles.mapItem}>
                <p onClick={() => handleNumOrganizadorClick(local.id)} className={styles.mapText}>
                  {local.numero_organizador}
                </p>
                {expanded[local.id]?.sub && (
                  <p onClick={() => handleImgOrganizadorClick(local.id)} className={styles.mapText}>
                    {local.nome_suborganizador} {local.numero_suborganizador}
                  </p>
                )}
                {expanded[local.id]?.img && (
                  <img src={local.foto_url} className={styles.mapImage} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;