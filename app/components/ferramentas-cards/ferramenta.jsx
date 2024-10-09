import React from 'react';
import { Card, Flex } from 'antd';
const { Meta } = Card;

const App = () => (
  <Card
    hoverable
    style={{
      width: 240,
      height: 320,
      marginTop: 20,
    }}
    cover={<img alt="foto da ferramenta" src="" />}
  >
    <Meta title="Nome da ferramenta" description="Disponível..." />
    
  </Card>
);
export default App;