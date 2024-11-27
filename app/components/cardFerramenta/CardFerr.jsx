import React, { useState, useEffect } from 'react';
import { RetweetOutlined, HarmonyOSOutlined, ToolOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import axios from 'axios';
import styles from './cardferr.module.css'; // Importando o CSS modular
import { Divider } from 'antd';

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
    disponivel,
    em_manutencao,
    onUpdateStatus
}) => {
    const [isBorrowed, setIsBorrowed] = useState(disponivel === 'f');
    const [isUnderMaintenance, setIsUnderMaintenance] = useState(em_manutencao === 't');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsBorrowed(disponivel === 't');
        setIsUnderMaintenance(em_manutencao === 't');
    }, [disponivel, em_manutencao]);

    const handleToggleAvailability = async () => {
        setLoading(true);
        const newStatus = isBorrowed ? 'f' : 't';

        try {
            await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            setIsBorrowed(newStatus === 't');
            onUpdateStatus(id, newStatus);
            message.success(`Status atualizado para ${newStatus === 't' ? 'disponível' : 'indisponível'}.`);
        } catch (error) {
            message.error('Erro ao atualizar o status.');
        } finally {
            setLoading(false);
        }
    };

    const handleRetweetClick = async () => {
        if (isUnderMaintenance || loading) return;

        const newStatus = 'f';

        try {
            await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            setIsBorrowed(false);
            onUpdateStatus(id, newStatus);
            setIsUnderMaintenance(false);
            message.success('Ferramenta emprestada com sucesso.');
        } catch (error) {
            message.error('Erro ao atualizar o status.');
        }
    };

    const handleToolClick = async () => {
        if (isBorrowed || loading) return;

        const newStatus = 'f';

        try {
            await axios.put(`http://localhost:3003/ferramentas/disponivel/${id}`, { disponivel: newStatus });
            setIsUnderMaintenance(true);
            setIsBorrowed(false);
            onUpdateStatus(id, newStatus);
            message.success('Ferramenta em manutenção.');
        } catch (error) {
            message.error('Erro ao atualizar o status.');
        }
    };

    return (
        <Card className={styles.card} hoverable>
            <img alt="example" src={imagem_url} className={styles.cardImage} />
            <div className={styles.text}>
                <p className={styles.p}>
                {nome}
                </p>
                {`Conjunto: ${conjunto}, Tamanho: ${numero}, Patrimônio: ${patrimonio}, Modelo: ${modelo}, Descrição: ${descricao}`}
            </div>
            <Divider style={{  borderColor: '#f0ffff' }}/>
            <div className={styles.cardActions}>
   
            
                <div
                    onClick={handleToggleAvailability}
                    className={`${styles.cardAction} ${isBorrowed ? styles.available : styles.unavailable}`}
                >
                    <HarmonyOSOutlined 
                    style={{ color: 'black' }}/>
                </div>
                <CheckCircleOutlined key="check" />
                <RetweetOutlined
                    key="retweet"
                    onClick={handleRetweetClick}
                    style={{ color: isBorrowed ? 'black' : 'red' }}
                />
                <ToolOutlined
                    key="tool"
                    onClick={handleToolClick}
                    className={isUnderMaintenance ? styles.maintenance : ''}
                />
            </div>
        </Card>
    );
};

export default CardFerr;