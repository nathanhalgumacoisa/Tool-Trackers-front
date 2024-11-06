import React, { useState } from 'react';

const NestedDropdown = () => {
  const [isOuterOpen, setOuterOpen] = useState(false);
  const [isMiddleOpen, setMiddleOpen] = useState(false);
  const [isInnerOpen, setInnerOpen] = useState(false);

  const toggleOuter = () => setOuterOpen(!isOuterOpen);
  const toggleMiddle = () => setMiddleOpen(!isMiddleOpen);
  const toggleInner = () => setInnerOpen(!isInnerOpen);

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <button onClick={toggleOuter}>{`${nome_organizador}`}</button>
        {isOuterOpen && (
          <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
            <div>
              <button onClick={toggleMiddle}>{`${numero_organizador}`}</button>
              {isMiddleOpen && (
                <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
                  <div>
                    <button onClick={toggleInner}>{`${local.nome_suborganizador} ${local.numero_suborganizador}`}</button>
                    {isInnerOpen && (
                      <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '10px' }}>
                        <p>{<img src={local.foto_url}  style={{ width: '50px', height: '50px' }} />}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NestedDropdown;