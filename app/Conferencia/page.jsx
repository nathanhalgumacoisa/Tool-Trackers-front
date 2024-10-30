"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import { Button, Form, Select, DatePicker, List, message, Checkbox } from 'antd';
import styles from './conferencia.module.css';

const { Option } = Select;

function Conferencias() {
    const [conferencias, setConferencias] = useState([]);
    const [ferramentas, setFerramentas] = useState([]);
    const [localizacoes, setLocalizacoes] = useState([]);
    const [selectedCarrinho, setSelectedCarrinho] = useState(null);
    const [selectedGaveta, setSelectedGaveta] = useState(null);
    const [checkedFerramentas, setCheckedFerramentas] = useState(new Set());
    const [form] = Form.useForm();

    useEffect(() => {
        fetchFerramentas();
        fetchLocalizacoes();
    }, []);

    const fetchFerramentas = async () => {
        try {
            const response = await axios.get('http://localhost:3003/ferramentas');
            setFerramentas(response.data.ferramentas); // Certifique-se de que o formato da resposta é correto
        } catch (error) {
            console.error("Erro ao buscar ferramentas:", error);
            message.error('Erro ao carregar ferramentas.');
        }
    };

    const fetchLocalizacoes = async () => {
        try {
            const response = await axios.get('http://localhost:3003/localizacoes');
            setLocalizacoes(response.data.localizacoes);
        } catch (error) {
            console.error("Erro ao buscar localizações:", error);
            message.error('Erro ao carregar localizações.');
        }
    };

    const handleCarrinhoChange = (carrinho) => {
        setSelectedCarrinho(carrinho);
    };

    const handleCheckboxChange = (ferramentaId) => {
        const newCheckedFerramentas = new Set(checkedFerramentas);
        if (newCheckedFerramentas.has(ferramentaId)) {
            newCheckedFerramentas.delete(ferramentaId);
        } else {
            newCheckedFerramentas.add(ferramentaId);
        }
        setCheckedFerramentas(newCheckedFerramentas);
    };

    const onFinish = async (values) => {
        try {
            await axios.post('http://localhost:3003/conferencias', {
                localizacao_id: selectedGaveta,
                data_conferencia: values.data_conferencia,
            });
            message.success('Conferência criada com sucesso!');
            fetchConferencias();
            form.resetFields();
            setSelectedCarrinho(null);
            setSelectedGaveta(null);
        } catch (error) {
            console.error("Erro ao salvar conferência:", error);
            message.error('Erro ao salvar conferência.');
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1>Gerenciamento de Conferências</h1>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="data_conferencia" label="Data da Conferência"
                        rules={[{ required: true, message: 'Por favor, selecione a data da conferência!' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Carrinho" rules={[{ required: true }]}>
                        <Select onChange={handleCarrinhoChange} placeholder="Selecione um carrinho">
                            <Option value="1">Carrinho 1</Option>
                            <Option value="2">Carrinho 2</Option>
                            <Option value="3">Carrinho 3</Option>
                            <Option value="4">Carrinho 4</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Gaveta" rules={[{ required: true }]}>
                        <Select onChange={setSelectedGaveta} placeholder="Selecione uma gaveta">
                            {selectedCarrinho === "1" && (
                                <>
                                    <Option value="gaveta1">Gaveta 1</Option>
                                    <Option value="gaveta2">Gaveta 2</Option>
                                </>
                            )}
                            {selectedCarrinho === "2" && (
                                <>
                                    <Option value="gaveta3">Gaveta 3</Option>
                                    <Option value="gaveta4">Gaveta 4</Option>
                                </>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Adicionar Conferência</Button>
                    </Form.Item>
                </Form>

                <h2>Ferramentas Disponíveis</h2>
                <List
                    header={<div>Lista de Ferramentas</div>}
                    bordered
                    dataSource={ferramentas}
                    renderItem={ferramenta => (
                        <List.Item
                            actions={[
                                <Checkbox
                                    checked={checkedFerramentas.has(ferramenta.ferramenta_id)}
                                    onChange={() => handleCheckboxChange(ferramenta.ferramenta_id)}
                                />
                            ]}
                        >
                            <List.Item.Meta
                                title={`Ferramenta ID: ${ferramenta.ferramenta_id}`}
                                description={`Nome: ${ferramenta.nome}, 
                                Descrição: ${ferramenta.descricao},
                                Imagem: ${ferramenta.imagem_url},
                                Conjunto: ${ferramenta.conjunto},
                                Número`}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default Conferencias;