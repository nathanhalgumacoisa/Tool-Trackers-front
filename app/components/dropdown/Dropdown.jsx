import React from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './dropdown.module.css';

const items = [
  {
    label: <a href="https://www.antgroup.com">Gaveta 01</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">Gaveta 02</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Gaveta 03',
    key: '3',
  },
];

const App = ({ title }) => (
  <div className={styles.App}>
    <div className={styles.Container}>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()} className={styles.dropdown_link}>
          <Space className={styles.title}>
            {title} {/* Utilizando a prop title aqui */}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  </div>
);

// Definindo valor padrão para a prop title
App.defaultProps = {
  title: 'Carrinhos', // Valor padrão
};

export default App;