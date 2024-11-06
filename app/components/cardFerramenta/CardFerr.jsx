import React from 'react';
import { RetweetOutlined, HarmonyOSOutlined, ToolOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import axios from 'axios';

const { Meta } = Card;

const CardFerr = ({ 
    id, // Adiciona o ID da ferramenta
    nome, 
    imagem_url, 
    conjunto, 
    numero, 
    patrimonio, 
    modelo, 
    descricao, 
    disponivel, // Estado de disponibilidade recebido como prop
    onUpdateStatus // Função para atualizar o status recebida como prop
}) => {
    const handleHarmonyClick = async () => {
        const newStatus = !disponivel; // Inverte o status de disponibilidade

        try {
            await axios.put(`http://localhost:3003/ferramentas/${id}/disponivel`, { disponivel: newStatus });
            message.success(`Status de disponibilidade atualizado para ${newStatus ? 'disponível' : 'não disponível'}.`);
            onUpdateStatus(id, newStatus); // Chama a função para atualizar o estado no componente pai
        } catch (error) {
            console.error("Erro ao atualizar o status de disponibilidade:", error);
            message.error('Erro ao atualizar o status.');
        }
    };

    return (
        <Card
            style={{
                width: 300,
                transition: 'background-color 0.3s'
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
                        width: '11px', // Aumenta o tamanho para melhorar a usabilidade
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: disponivel ? 'green' : 'red', // Muda a cor de fundo da bolinha
                        cursor: 'pointer'
                    }}
                >
                    <HarmonyOSOutlined 
                        style={{ color: 'white' }} // Cor do ícone
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