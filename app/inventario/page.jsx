"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import styles from './inventario.module.css';
import CardFerr from '../components/cardFerramenta/CardFerr.jsx';
import CompLoc from '../components/comploc/CompLoc.jsx';

function Ferramentas() {
    const [locals, setLocals] = useState([]);
    const [nome, setNome] = useState('');
    const [imagem_url, setImagemUrl] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [numero, setNumero] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [modelo, setModelo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editingFerrId, setEditingFerrId] = useState(null);
    const [ferrToDelete, setFerrToDelete] = useState(null);
    const [ambiente, setAmbiente] = useState(''); // Adiciona estado para 'ambiente'

    useEffect(() => {
        getFerramentas();
    }, []);

    // Função para obter frramenta
    async function getFerramentas() {
        try {
            const response = await axios.get(`http://localhost:3003/ferramentas`);
            if (response.data && response.data.ferramentas) {
                setLocals(response.data.ferramentas);
                console.log(response.data.ferramentas);
                
            } else {
                console.log("Nenhuma ferramenta encontrada na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar ferramentas:", error);
        }
    }

    async function getOrganizador() {
        if (ambiente) {
            try {
                const response = await axios.get(`http://localhost:3003/localizacoes/lista/${ambiente}`);
                console.log(response.data);
                // Aqui você pode definir o estado se necessário
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getOrganizador(); // Chama a função de obter organizador quando 'ambiente' mudar
    }, [ambiente]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3003/ferramentas/${editingFerrId}`, {
                nome,
                imagem_url,
                conjunto,
                numero,
                patrimonio,
                modelo,
                descricao,
            });

            setEditingFerrId(null);
            setImagemUrl('');
            setConjunto('');
            setNumero('');
            setPatrimonio('');
            setModelo('');
            setDescricao('');
            getFerramentas();
        } catch (error) {
            console.log("Erro ao atualizar ferramenta:", error);
        }
    }

    function editFerr(ferramenta) {
        setNome(ferramenta.nome);
        setImagemUrl(ferramenta.imagem_url);
        setConjunto(ferramenta.conjunto);
        setNumero(ferramenta.numero);
        setPatrimonio(ferramenta.patrimonio);
        setModelo(ferramenta.modelo);
        setDescricao(ferramenta.descricao);
        setEditingFerrId(ferramenta.ferramenta_id);
    }

    function confirmDelete(ferramentaId) {
        setFerrToDelete(ferramentaId);
    }

    async function deleteFerr() {
        if (ferrToDelete) {
            try {
                await axios.delete(`http://localhost:3003/ferramentas/${ferrToDelete}`);
                setLocals((prevLocals) => prevLocals.filter((ferramenta) => ferramenta.ferramenta_id !== ferrToDelete));
                setFerrToDelete(null);
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
                                key={ferr.localizacoes_id}
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
                                    <input className={styles.inputs} type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                    <input className={styles.inputs} type="text" placeholder="Link da imagem" value={imagem_url} onChange={(e) => setImagemUrl(e.target.value)} required />
                                    <input className={styles.inputs} type="text" placeholder="Conjunto" value={conjunto} onChange={(e) => setConjunto(e.target.value)} required />
                                    <input className={styles.inputs} type="text" placeholder="Número do patrimônio" value={patrimonio} onChange={(e) => setPatrimonio(e.target.value)} required />
                                    <input className={styles.inputs} type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                                    <input className={styles.inputs} type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

                                    <button className={styles.buttonseditar} type="submit">Atualizar</button>
                                    <button className={styles.buttonseditar} type="button" onClick={() => setEditingFerrId(null)}>Cancelar</button>
                                </form>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nenhuma ferramenta cadastrada.</p>
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