import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const App = () => (
  <CardFerramenta
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Nome da ferramenta" description="description" />
    <Meta title="Disponível:" description="em manutenção" />
  </CardFerramenta>
);
export default App;