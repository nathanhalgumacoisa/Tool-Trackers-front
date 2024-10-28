import React from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './comploc.module.css';

const CompLoc = ({ 
  ambiente, 
  nome_organizador, 
  numero_organizador, 
  nome_suborganizador, 
  numero_suborganizador, 
  title = 'Localização' // Valor padrão para title
}) => {
  // Criação dos itens do dropdown
  const items = [
    {
      label: `Ambiente: ${ambiente}`,
      key: '0',
    },
    {
      label: `Organizador: ${nome_organizador}`,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: `Número do organizador: ${numero_organizador}`,
      key: '2',
    },
    {
      label: `Nome do sub-organizador: ${nome_suborganizador}`,
      key: '3',
    },
    {
      label: `Número do sub-organizador: ${numero_suborganizador}`,
      key: '4',
    },
  ];

  return (
    <div className={styles.App} >
      <div className={styles.Container} >
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className={styles.title}>
              {title}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default CompLoc;