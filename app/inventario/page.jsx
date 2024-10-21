"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import styles from './inventario.module.css';

function Ferramentas() {
    const [locals, setLocals] = useState([]); // Estado para armazenar usuários
    const [nome, setNome] = useState('');
    const [imagem_url, setImagemUrl] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [numero, setNumero] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacaoId, setLocalizacaoId] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [editingFerrId, setEditingFerrId] = useState(null); // Estado para o usuário em edição
    const [ferrToDelete, setFerrToDelete] = useState(null); // Estado para o usuário a ser excluído

    useEffect(() => {
        getFerramentas(); // Chamada da função para obter usuários na montagem do componente
    }, []);

    // Função para obter frramenta
    async function getFerramentas() {
        try {
            const response = await axios.get(`http://localhost:3003/ferramentas`);
            if (response.data && response.data.ferramentas) {
                setLocals(response.data.ferramentas); // Armazenando os usuários no estado
            } else {
                console.log("Nenhum ferramenta encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar ferramentas:", error);
        }
    }

    // Função para atualizar um ferramentas
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3003/ferramentas/${editingFerrId}`, {
                nome,
                imagem_url: imagem_url,
                conjunto : conjunto,
                numero : numero,
                patrimonio : patrimonio,
                modelo : modelo,
                descricao : descricao,
                localizacao_id: localizacaoId
            });
        
            setEditingFerrId(null); // Reseta o id de edição
            setImagemUrl('');
            setConjunto('');
            setNumero('');
            setPatrimonio('');
            setModelo('');
            setDescricao('');
            setLocalizacaoId('');
            setFerramentas('');
            setSuccessMessage('');
            getFerramentas();
        } catch (error) {
            console.log("Erro ao atualizar ferramenta:", error);
        }
    }

    // Função para iniciar a edição de um usuário
    function editFerr(ferramenta) {
        setImagemUrl(ferramenta.imagem_url);
        setConjunto(ferramenta.conjunto);
        setNumero(ferramenta.numero);
        setPatrimonio(ferramenta.patrimonio);
        setModelo(ferramenta.modelo);
        setDescricao(ferramenta.descricao);
        setLocalizacaoId(ferramenta.localizacaoId);
        setFerramentas(ferramenta.ferramentas);
        setSuccessMessage(ferramenta.successMessage);
        setEditingFerrId(ferramenta.ferramenta_id); // Define o usuário que está sendo editado
    }

    // Função para abrir o modal de confirmação
    function confirmDelete(ferramentaId) {
        setFerrToDelete(ferramentaId); // Define o usuário a ser excluído
    }

    // Função para excluir um ferramenta
    async function deleteFerr() {
        if (ferrToDelete) {
            try {
                await axios.delete(`http://localhost:3003/ferramentas/${ferrToDelete}`);
                // Atualiza a lista de ferraments localmente, removendo a ferramenta excluída
                setLocals((prevLocals) => prevLocals.filter((ferramenta) => ferramenta.ferramenta_id !== ferrToDelete));
                setFerrToDelete(null); // Reseta a ferramenta a ser excluída
            } catch (error) {
                console.log("Erro ao excluir ferramenta:", error);
            }
        }
    }

    return (
        <div>
            <Header />
            <div className={styles.App}>
                {locals.length > 0 ? (
                    locals.map((ferr) => (
                        <div className={styles.ferramentas} key={ferr.ferramenta_id}>
                            <h3>Nome: {ferr.nome}</h3>
                            <h4>Link da imagem: {ferr.imagem_url}</h4>
                            <h4>Conjunto: {ferr.conjunto}</h4>
                            <h4>Número (tamanho): {ferr.numero}</h4>
                            <h4>Número do patrimônio: {ferr.patrimonio}</h4>
                            <h4>Modelo: {ferr.modelo}</h4>
                            <h4>Descrição: {ferr.descricao}</h4>
                            <h4>Localização id: {ferr.localizacaoId}</h4>
                            
                            <button onClick={() => editFerr(ferr)}>Editar</button>
                            <button onClick={() => confirmDelete(ferr.ferramenta_id)}>Excluir</button>

                            {editingFerrId === ferr.ferramenta_id && (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Link da imagem"
                                        value={imagem_url}
                                        onChange={(e) => setImagemUrl(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Conjunto"
                                        value={conjunto}
                                        onChange={(e) => setConjunto(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Número do patrimônio"
                                        value={patrimonio}
                                        onChange={(e) => setPatrimonio(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Modelo"
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Localização ID"
                                        value={localizacaoId}
                                        onChange={(e) => setLocalizacaoId(e.target.value)}
                                        required
                                    />
                                    
                                    <button type="submit">Atualizar</button>
                                    <button type="button" onClick={() => setEditingFerrId(null)}>Cancelar</button>
                                </form>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nenhum ferramenta cadastrado.</p>
                )}
            </div>

            {ferrToDelete !== null && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h4>Você tem certeza que deseja excluir esta ferramenta?</h4>
                        <button onClick={deleteFerr}>Sim</button>
                        <button onClick={() => setFerrToDelete(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ferramentas;