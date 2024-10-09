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
     <img src="./chave-inglesa.png" alt="ícone" style={{ width: '15%', height: '15%', marginTop: '10%' }} />
     <img src="./contorno-do-circulo.png" alt="ícone" style={{ width: '13%', height: '13%', marginTop: '5%', marginLeft: '10%' }} />

  </Card>
);
export default App;