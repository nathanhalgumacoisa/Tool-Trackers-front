import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const CardFerr = ({ nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao }) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={imagem_url} // Usar a imagem da ferramenta
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      title={nome} // Usar o nome da ferramenta como título
      description={`Conjunto: ${conjunto}, Tamanho: ${numero}, Patrimônio: ${patrimonio}, Modelo: ${modelo}, Descrição: ${descricao}`} // Exibir outras informações na descrição
    />
  </Card>
);

export default CardFerr;