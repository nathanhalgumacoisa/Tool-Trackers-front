import React, { useState } from 'react';

const NestedDropdown = ({
  nome_organizador,
  numero_organizador,
  nome_suborganizador,
  numero_suborganizador,
  foto_url,
  suborganizers = [], // Garantir que suborganizers seja um array por padrão
}) => {
  const [isOuterOpen, setOuterOpen] = useState(false);
  const [isMiddleOpen, setMiddleOpen] = useState(false);
  const [isInnerOpen, setInnerOpen] = useState(false);

  const toggleOuter = () => setOuterOpen(!isOuterOpen);
  const toggleMiddle = () => setMiddleOpen(!isMiddleOpen);
  const toggleInner = () => setInnerOpen(!isInnerOpen);

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <button onClick={toggleOuter}>{nome_organizador}</button>
        {isOuterOpen && (
          <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
            {nome_organizador === "carrinhos" ? (
              <div>
                {suborganizers.length > 0 ? ( // Verifica se existe algum suborganizador
                  suborganizers.map((sub, index) => (
                    <div key={index}>
                      <p> {nome_suborganizador} ${numero_suborganizador}</p>
                      <img src={sub.foto_url} style={{ width: '50px', height: '50px' }} alt={sub.nome_suborganizador} />
                    </div>
                  ))
                ) : (
                  <p>Não há suborganizadores disponíveis.</p> // Mensagem quando não há suborganizador
                )}
              </div>
            ) : (
              <div>
                <button onClick={toggleMiddle}>{numero_organizador}</button>
                {isMiddleOpen && (
                  <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
                    <div>
                      <button onClick={toggleInner}>
                        {`${nome_suborganizador} ${numero_suborganizador}`}
                      </button>
                      {isInnerOpen && (
                        <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
                          <p>
                            <img src={foto_url} style={{ width: '50px', height: '50px' }} alt={nome_suborganizador} />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NestedDropdown;