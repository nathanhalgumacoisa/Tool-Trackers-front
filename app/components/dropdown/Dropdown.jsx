import React from 'react';
import { Dropdown, Space } from 'antd'; // Certifique-se de importar os componentes corretos
import { DownOutlined } from '@ant-design/icons';
import styles from './dropdown.module.css'; // Importe o arquivo CSS

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

const App = () => (

  <div className={styles.App}>
    <div className={styles.Container}>
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()} className={styles.dropdown_link}>
        <Space>
          Carrinho 01
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
    </div>
  </div>
);

export default App;