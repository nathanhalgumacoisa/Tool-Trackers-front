import React, { useState } from 'react';
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
    const [isBorrowed, setIsBorrowed] = useState(disponivel); // Status de empréstimo
    const [isUnderMaintenance, setIsUnderMaintenance] = useState(false); // Status de manutenção
    
    const handleHarmonyClick = async () => {
        const newStatus = !isBorrowed; // Inverte o status de disponibilidade

        try {
            await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            message.success(`Status de disponibilidade atualizado para ${newStatus ? 'disponível' : 'indisponível'}.`);
            setIsBorrowed(newStatus); // Atualiza o estado local
            onUpdateStatus(id, newStatus); // Atualiza o estado no componente pai
            if (newStatus === false) setIsUnderMaintenance(false); // Reseta o status de manutenção
        } catch (error) {
            console.error("Erro ao atualizar o status de disponibilidade:", error);
            message.error('Erro ao atualizar o status.');
        }
    };

    const handleRetweetClick = async () => {
        if (isUnderMaintenance) return; // Não permite mudar se já estiver em manutenção

        const newStatus = false; // Define o status como indisponível

        try {
            await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            message.success('Status de disponibilidade atualizado para indisponível devido ao empréstimo.');
            setIsBorrowed(newStatus); // Atualiza o estado local
            onUpdateStatus(id, newStatus); // Atualiza o estado no componente pai
            setIsUnderMaintenance(false); // Reseta o status de manutenção
        } catch (error) {
            console.error("Erro ao atualizar o status de disponibilidade:", error);
            message.error('Erro ao atualizar o status.');
        }
    };

    const handleToolClick = async () => {
        if (isBorrowed) return; // Não permite mudar se já estiver emprestado

        const newStatus = false; // Define o status como indisponível

        try {
            await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            message.success('Status de disponibilidade atualizado para indisponível devido à manutenção.');
            setIsUnderMaintenance(true); // Atualiza o estado local
            onUpdateStatus(id, newStatus); // Atualiza o estado no componente pai
            setIsBorrowed(false); // Reseta o status de empréstimo
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
                        backgroundColor: isBorrowed ? 'green' : 'red', // Cor da bolinha baseada no status
                        cursor: 'pointer'
                    }}
                >
                    <HarmonyOSOutlined 
                        style={{ color: 'white' }} 
                    />
                </div>,
                <CheckCircleOutlined key="check" />,
                <RetweetOutlined 
                    key="retweet"
                    onClick={handleRetweetClick}
                    style={{ color: isBorrowed ? 'black' : 'red' }} // Altera a cor baseado no status
                />,
                <ToolOutlined 
                    key="tool" 
                    onClick={handleToolClick}
                    style={{ color: isUnderMaintenance ? 'yellow' : 'black' }} // Altera a cor baseado no status de manutenção
                />
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