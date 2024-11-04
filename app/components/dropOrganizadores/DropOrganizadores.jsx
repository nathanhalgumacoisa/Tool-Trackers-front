import React, { useState } from 'react';
import { Select, Row, Col, Collapse } from 'antd';
import styles from './droporganizadores.module.css';

const { Option } = Select;
const { Panel } = Collapse;

const OrganizadorComponent = ({ organizadores }) => {
  const [selectedCarrinhos, setSelectedCarrinhos] = useState(null);
  const [selectedArmarios, setSelectedArmarios] = useState(null);

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        {/* Coluna Carrinhos */}
        <Col span={6}>
          <h3>Carrinhos</h3>
          <Select
            value={selectedCarrinhos}
            onChange={setSelectedCarrinhos}
            style={{ width: '100%' }}
            placeholder="Selecione um carrinho"
          >
            {organizadores.carrinhos.map(org => (
              <Option key={org.numero_organizador} value={org.numero_organizador}>
                {org.numero_organizador}
              </Option>
            ))}
          </Select>
          {selectedCarrinhos && (
            <Collapse style={{ marginTop: '10px' }}>
              {organizadores.carrinhos
                .filter(org => org.numero_organizador === selectedCarrinhos)
                .flatMap(org => 
                  Array.isArray(org.sub_organizadores) && org.sub_organizadores.length > 0
                    ? org.sub_organizadores.map(sub => (
                        <Panel header={`Gaveta ${sub.numero}`} key={sub.numero}>
                          <p>{sub.detalhes || 'Sem detalhes disponíveis.'}</p>
                        </Panel>
                      ))
                    : <Panel header="Nenhuma gaveta disponível" key="no-gavetas">
                        <p>Não há gavetas para este carrinho.</p>
                      </Panel>
                )}
            </Collapse>
          )}
        </Col>

        {/* Coluna Armários */}
        <Col span={6}>
          <h3>Armários</h3>
          <Select
            value={selectedArmarios}
            onChange={setSelectedArmarios}
            style={{ width: '100%' }}
            placeholder="Selecione um armário"
          >
            {organizadores.armarios.map(org => (
              <Option key={org.numero_organizador} value={org.numero_organizador}>
                {org.numero_organizador}
              </Option>
            ))}
          </Select>
          {selectedArmarios && (
            <Collapse style={{ marginTop: '10px' }}>
              {organizadores.armarios
                .filter(org => org.numero_organizador === selectedArmarios)
                .flatMap(org => 
                  Array.isArray(org.sub_organizadores) && org.sub_organizadores.length > 0
                    ? org.sub_organizadores.map(sub => (
                        <Panel header={`Prateleira ${sub.numero}`} key={sub.numero}>
                          <p>{sub.detalhes || 'Sem detalhes disponíveis.'}</p>
                        </Panel>
                      ))
                    : <Panel header="Nenhuma prateleira disponível" key="no-prateleiras">
                        <p>Não há prateleiras para este armário.</p>
                      </Panel>
                )}
            </Collapse>
          )}
        </Col>

        {/* Coluna Tornos */}
        <Col span={6}>
          <h3>Tornos</h3>
          <Select
            value={null} // Pode adicionar lógica aqui se necessário
            onChange={() => {}}
            style={{ width: '100%' }}
            placeholder="Selecione um torno"
          >
            {organizadores.tornos.map(org => (
              <Option key={org.numero_organizador} value={org.numero_organizador}>
                {org.numero_organizador}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Coluna Paineis */}
        <Col span={6}>
          <h3>Paineis</h3>
          <Select
            value={null} // Pode adicionar lógica aqui se necessário
            onChange={() => {}}
            style={{ width: '100%' }}
            placeholder="Selecione um painel"
          >
            {organizadores.paineis.map(org => (
              <Option key={org.numero_organizador} value={org.numero_organizador}>
                {org.numero_organizador}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizadorComponent;