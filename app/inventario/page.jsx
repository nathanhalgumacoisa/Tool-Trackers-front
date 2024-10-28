"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import styles from './inventario.module.css';
import CardFerr from '../components/cardFerramenta/CardFerr.jsx';
import CompLoc from '../components/comploc/CompLoc.jsx';

function Ferramentas() {
    const [locals, setLocals] = useState([]); // Estado para armazenar usuários
    const [nome, setNome] = useState('');
    const [imagem_url, setImagemUrl] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [numero, setNumero] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    // const [localizacaoId, setLocalizacaoId] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [editingFerrId, setEditingFerrId] = useState(null); // Estado para o usuário em edição
    const [ferrToDelete, setFerrToDelete] = useState(null); // Estado para o usuário a ser excluído

    useEffect(() => {
        getFerramentas(); // Chamada da função para obter usuários na montagem do componente
    }, []);
    const [locali, setLocalis] = useState([]);
    const searchParams = useSearchParams();
    const ambiente = searchParams.get('ambiente');
  
    useEffect(() => {
      async function getOrganizador() {
        if (ambiente) {
          try {
            const response = await axios.get(`http://localhost:3003/localizacoes/lista/${ambiente}`);
            setLocals(response.data.localizacoes);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
      }
  
      getOrganizador();
    }, [ambiente]);
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
    async function getAmbiente() {
        try {
            const response = await axios.get(`http://localhost:3003/localizacoes`);
            if (response.data && response.data.localizacoes) {
                setLocals(response.data.localizacoes); // Armazenando os usuários no estado
            } else {
                console.log("Nenhum ambiente encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar ambiente:", error);
        }
    }
    async function getOrganizador() {
        try {
            const response = await axios.get(`http://localhost:3003/organizador`);
            if (response.data && response.data.organizador) {
                setLocals(response.data.organizador); // Armazenando os usuários no estado
            } else {
                console.log("Nenhum organizador encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar organizador:", error);
        }
    }
    async function getSubOrganizador() {
        try {
            const response = await axios.get(`http://localhost:3003/sub_organizador`);
            if (response.data && response.data.sub_organizador) {
                setLocals(response.data.sub_organizador); // Armazenando os usuários no estado
            } else {
                console.log("Nenhum sub_organizador encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar sub_organizador:", error);
        }
    }

    // Função para atualizar um ferramentas
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3003/ferramentas/${editingFerrId}`, {
                nome: nome,
                imagem_url: imagem_url,
                conjunto : conjunto,
                numero : numero,
                patrimonio : patrimonio,
                modelo : modelo,
                descricao : descricao,
                // localizacao_id: localizacaoId
            });
        
            setEditingFerrId(null); // Reseta o id de edição
            setImagemUrl('');
            setConjunto('');
            setNumero('');
            setPatrimonio('');
            setModelo('');
            setDescricao('');
            // setLocalizacaoId('');
            setFerramentas('');
            setSuccessMessage('');
            getFerramentas();
        } catch (error) {
            console.log("Erro ao atualizar ferramenta:", error);
        }
    }

    // Função para iniciar a edição de um usuário
    function editFerr(ferramenta) {
        setNome(ferramenta.nome);
        setImagemUrl(ferramenta.imagem_url);
        setConjunto(ferramenta.conjunto);
        setNumero(ferramenta.numero);
        setPatrimonio(ferramenta.patrimonio);
        setModelo(ferramenta.modelo);
        setDescricao(ferramenta.descricao);
        // setLocalizacaoId(ferramenta.localizacaoId);
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
                <h1 className={styles.h1}>Ferramentas Cadastradas</h1>
                {locals.length > 0 ? (
  locals.map((ferr) => (
    <div className={styles.ferramentas} key={ferr.ferramenta_id}>
      <CardFerr
        nome={ferr.nome}
        imagem_url={ferr.imagem_url}
        conjunto={ferr.conjunto}
        numero={ferr.numero}
        patrimonio={ferr.patrimonio}
        modelo={ferr.modelo}
        descricao={ferr.descricao}
      />
    <CompLoc
        ambiente={ferr.ambiente}
        nome_organizador={ferr.nome_organizador}
        numero_organizador={ferr.numero_organizador}
        nome_suborganizador={ferr.nome_suborganizador}
        numero_suborganizador={ferr.numero_suborganizador}
    />
      <button className={styles.editarbutton} onClick={() => editFerr(ferr)}>Editar</button>
      <button className={styles.excluirbutton} onClick={() => confirmDelete(ferr.ferramenta_id)}>Excluir</button>

      {editingFerrId === ferr.ferramenta_id && (
        <form className={styles.formeditar} onSubmit={handleSubmit}>
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Link da imagem"
                                        value={imagem_url}
                                        onChange={(e) => setImagemUrl(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Conjunto"
                                        value={conjunto}
                                        onChange={(e) => setConjunto(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Número do patrimônio"
                                        value={patrimonio}
                                        onChange={(e) => setPatrimonio(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Modelo"
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        required
                                    />
                                    
                                    <button className={styles.buttonseditar} type="submit">Atualizar</button>
                                    <button className={styles.buttonseditar} type="button" onClick={() => setEditingFerrId(null)}>Cancelar</button>
                                </form>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nenhum ferramenta cadastrada.</p>
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