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
    const [carrinhos, setCarrinhos] = useState([]); // Estado para carrinhos
    const [gavetas, setGavetas] = useState([]); // Estado para gavetas
    const [selectedCarrinho, setSelectedCarrinho] = useState(null);
    const [selectedGaveta, setSelectedGaveta] = useState(null);
    const [checkedFerramentas, setCheckedFerramentas] = useState(new Set());
    const [form] = Form.useForm();
    const ambiente = ''; // Defina ambiente de acordo com sua lógica

    useEffect(() => {
        fetchFerramentas();
        fetchCarrinhos(); // Busca os carrinhos ao montar o componente
        getOrganizador();
    }, []);

    const fetchFerramentas = async () => {
        try {
            const response = await axios.get('http://localhost:3003/ferramentas');
            setFerramentas(response.data.ferramentas);
        } catch (error) {
            console.error("Erro ao buscar ferramentas:", error);
            message.error('Erro ao carregar ferramentas.');
        }
    };

    const fetchCarrinhos = async () => {
        try {
            const response = await axios.get('http://localhost:3003/carrinhos'); // Ajuste para o endpoint correto
            setCarrinhos(response.data.carrinhos); // Verifique se a resposta contém `carrinhos`
        } catch (error) {
            console.error("Erro ao buscar carrinhos:", error.response ? error.response.data : error.message);
            message.error('Erro ao carregar carrinhos.');
        }
    };

    const fetchGavetas = async (carrinhoId) => {
        try {
            const response = await axios.get(`http://localhost:3003/sub_organizadores/${carrinhoId}`); // Ajuste para o endpoint correto
            setGavetas(response.data.gavetas); // Verifique se a resposta contém `gavetas`
        } catch (error) {
            console.error("Erro ao buscar gavetas:", error.response ? error.response.data : error.message);
            message.error('Erro ao carregar gavetas.');
        }
    };

    const getOrganizador = async () => {
        if (ambiente) {
            try {
                const response = await axios.get(`http://localhost:3003/localizacoes/lista/${ambiente}`);
                setLocalizacoes(response.data.localizacoes);
            } catch (error) {
                console.error("Erro ao buscar localizações:", error);
            }
        }
    };

    const handleCarrinhoChange = (carrinho) => {
        setSelectedCarrinho(carrinho);
        fetchGavetas(carrinho); // Busca gavetas quando um carrinho é selecionado
    };

    const handleCheckboxChange = (ferramentaId) => {
        const newCheckedFerramentas = new Set(checkedFerramentas);
        newCheckedFerramentas.has(ferramentaId) ? newCheckedFerramentas.delete(ferramentaId) : newCheckedFerramentas.add(ferramentaId);
        setCheckedFerramentas(newCheckedFerramentas);
    };

    const onFinish = async (values) => {
        try {
            await axios.post('http://localhost:3003/conferencias', {
                localizacao_id: selectedGaveta,
                data_conferencia: values.data_conferencia,
            });
            message.success('Conferência criada com sucesso!');
            fetchConferencias(); // Defina essa função para atualizar a lista de conferências
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
                            {carrinhos.length > 0 ? (
                                carrinhos.map(carrinho => (
                                    <Option key={carrinho.id} value={carrinho.id}>
                                        {carrinho.nome} {/* Ajuste conforme as propriedades do seu carrinho */}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>Nenhum carrinho disponível</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Gaveta" rules={[{ required: true }]}>
                        <Select onChange={setSelectedGaveta} placeholder="Selecione uma gaveta">
                            {gavetas.length > 0 ? (
                                gavetas.map(gaveta => (
                                    <Option key={gaveta.id} value={gaveta.id}>
                                        {gaveta.nome} {/* Ajuste conforme as propriedades da sua gaveta */}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>Nenhuma gaveta disponível</Option>
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
                                description={`Nome: ${ferramenta.nome}, Descrição: ${ferramenta.descricao}, Imagem: ${ferramenta.imagem_url}, Conjunto: ${ferramenta.conjunto}, Número: ${ferramenta.numero}, Patrimônio: ${ferramenta.patrimonio}, Modelo: ${ferramenta.modelo}`}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default Conferencias;