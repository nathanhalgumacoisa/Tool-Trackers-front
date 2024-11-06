import React from 'react';
import { RetweetOutlined, HarmonyOSOutlined, ToolOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import axios from 'axios';

const { Meta } = Card;

const CardFerr = ({ 
    id,
    nome, 
    imagem_url, 
    conjunto, 
    numero, 
    patrimonio, 
    modelo, 
    descricao, 
    disponivel, // Status de disponibilidade
    onUpdateStatus // Função para atualizar o status
}) => {
    const handleHarmonyClick = async () => {
        const newStatus = !disponivel; // Inverte o status de disponibilidade

        try {
            await axios.put(`http://localhost:3003/ferramentas/${id}/disponivel`, { disponivel: newStatus });
            message.success(`Status de disponibilidade atualizado para ${newStatus ? 'disponível' : 'não disponível'}.`);
            onUpdateStatus(id, newStatus); // Atualiza o estado no componente pai
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
                    src={imagem_url}
                />
            }
            actions={[
                <div 
                    onClick={handleHarmonyClick} 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '11px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: disponivel ? 'green' : 'red', // Cor da bolinha baseada no status
                        cursor: 'pointer'
                    }}
                >
                    <HarmonyOSOutlined 
                        style={{ color: 'white' }} 
                    />
                </div>,
                <CheckCircleOutlined key="check" />,
                <RetweetOutlined key="retweet"/>,
                <ToolOutlined key="tool" />
            ]}
        >
            <Meta
                title={nome}
                description={`Conjunto: ${conjunto}, Tamanho: ${numero}, Patrimônio: ${patrimonio}, Modelo: ${modelo}, Descrição: ${descricao}`}
            />
        </Card>
    );
};

export default CardFerr;