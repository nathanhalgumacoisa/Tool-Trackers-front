"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './organizadores.module.css';
import Header from '../components/header/Header.jsx';
import CardFerr from '../components/cardFerramenta/CardFerr';

function Organizadores() {
  const [locals, setLocals] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [expandedCarrinhos, setExpandedCarrinhos] = useState(false);
  const [expandedArmarios, setExpandedArmarios] = useState(false);
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

  const handleNumOrganizadorClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], sub: !prev[id]?.sub }
    }));
  };

  const handleImgOrganizadorClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], img: !prev[id]?.img }
    }));
  };

  const handleFerramentasClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], ferr: !prev[id]?.ferr }
    }));
    console.log("cricou");
  };


  return (
    <div className={styles.container} key="app-container">
      <Header />
      <div className={styles.localsContainer}>
        
      <div className={styles.selectedCarrinho}>
  <div className={styles.h2Container}>
    <select 
      className={styles.h2} 
      onClick={() => setExpandedCarrinhos(!expandedCarrinhos)} 
      onChange={handleSelectChange}
      value={selectedCarrinho}
    >
      <option value="">Carrinhos</option>
      {expandedCarrinhos && locals
        .filter(local => local.nome_organizador === 'carrinhos')
        .map((local, index) => (
          <option 
            key={`carrinho-${index}-${local.organizador_id}`} 
            value={local.id}
          >
            {local.numero_organizador}
          </option>
        ))}
    </select>

    {/* Exibição do Carrinho Selecionado */}
    {selectedCarrinho && (
      <div className={styles.selectedCarrinho}>
        <p onClick={() => handleNumOrganizadorClick(selectedCarrinho)}>
          Carrinho selecionado: {selectedCarrinho}
        </p>
      </div>
    )}

    {/* Exibição do Suborganizador se `expanded` estiver ativo */}
    {expanded[selectedCarrinho]?.sub && locals
      .filter(local => local.id === selectedCarrinho)
      .map((local) => (
        <p 
          key={`suborganizador-${local.id}`}
          onClick={() => handleImgOrganizadorClick(local.id)} 
          className={styles.mapText}
        >
          {local.nome_suborganizador} {local.numero_suborganizador}
        </p>
      ))}
  </div>
</div>
        {/* Seção Armários */}
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
                  <img
                    onClick={() => handleFerramentasClick(local.id)}
                    style={{ cursor: 'pointer' }}
                    src={local.foto_url}
                    className={styles.mapImage}
                    alt="Imagem do organizador"

                  />
                )}
                {expanded[local.id]?.ferr && (
                 <CardFerr
                 
                 nome={local.nome}
                 imagem_url={local.imagem_url}
                 conjunto={local.conjunto}
                 numero={local.numero}
                 patrimonio={local.patrimonio}
                 modelo={local.modelo}
                 descricao={local.descricao}
               />
                )}
              </div>
            ))}
        </div>

        {/* Seção Tornos */}
        <div className={styles.h2Container}>
          <h2 className={styles.h2} onClick={() => setExpanded((prev) => ({ ...prev, tornos: !prev.tornos }))}>Tornos</h2>
          {expanded.tornos && locals
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
                  <img
                    onClick={() => handleFerramentasClick(local.id)}
                    style={{ cursor: 'pointer' }}
                    src={local.foto_url}
                    className={styles.mapImage}
                    alt="Imagem do organizador"

                  />
                )}
                {expanded[local.id]?.ferr && (
                 <CardFerr
                 
                 nome={local.nome}
                 imagem_url={local.imagem_url}
                 conjunto={local.conjunto}
                 numero={local.numero}
                 patrimonio={local.patrimonio}
                 modelo={local.modelo}
                 descricao={local.descricao}
               />
                )}
              </div>
            ))}
        </div>

        {/* Seção Paineis */}
        <div className={styles.h2Container}>
          <h2 className={styles.h2} onClick={() => setExpanded((prev) => ({ ...prev, paineis: !prev.paineis }))}>Paineis</h2>
          {expanded.paineis && locals
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
                  <img
                    onClick={() => handleFerramentasClick(local.id)}
                    style={{ cursor: 'pointer' }}
                    src={local.foto_url}
                    className={styles.mapImage}
                    alt="Imagem do organizador"

                  />
                )}
                {expanded[local.id]?.ferr && (
                 <CardFerr
                 
                 nome={local.nome}
                 imagem_url={local.imagem_url}
                 conjunto={local.conjunto}
                 numero={local.numero}
                 patrimonio={local.patrimonio}
                 modelo={local.modelo}
                 descricao={local.descricao}
               />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Organizadores;