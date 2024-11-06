import React, { useState } from 'react';
import { RetweetOutlined, HarmonyOSOutlined, ToolOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const CardFerr = ({ nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao }) => {
  const [isHarmonyAvailable, setIsHarmonyAvailable] = useState(false); // Estado para o ícone HarmonyOS

  // Função para lidar com o clique no ícone HarmonyOS
  const handleHarmonyClick = () => {
    setIsHarmonyAvailable(!isHarmonyAvailable); // Alterna entre disponível e não disponível
  };

  return (
    <Card
      style={{
        width: 300,
        transition: 'background-color 0.3s' // Adiciona uma transição suave
      }}
      cover={
        <img
          alt="example"
          src={imagem_url} // Usar a imagem da ferramenta
        />
      }
      actions={[
        <div 
          onClick={handleHarmonyClick} 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '12px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: isHarmonyAvailable ? 'green' : 'inherit', // Muda a cor de fundo da bolinha
            cursor: 'pointer'
          }}
        >
          <HarmonyOSOutlined 
            style={{ color: isHarmonyAvailable ? 'white' : 'inherit' }} // Muda a cor do ícone
          />
        </div>,
        <CheckCircleOutlined key="check" />,
        <RetweetOutlined key="retweet"/>,
        <ToolOutlined key="tool" />
      ]}
    >
      <Meta
        title={nome} // Usar o nome da ferramenta como título
        description={`Conjunto: ${conjunto}, Tamanho: ${numero}, Patrimônio: ${patrimonio}, Modelo: ${modelo}, Descrição: ${descricao}`} // Exibir outras informações na descrição
      />
    </Card>
  );
};

export default CardFerr;