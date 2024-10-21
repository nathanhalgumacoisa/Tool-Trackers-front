"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import styles from './gerenciamentousuarios.module.css';

function Usuarios() {
    const [locals, setLocals] = useState([]); // Estado para armazenar usuários
    const [nome, setNome] = useState(''); 
    const [tipoUsuario, setTipoUsuario] = useState(''); 
    const [numeroNif, setNumeroNif] = useState(''); 
    const [numeroQrCode, setNumeroQrCode] = useState(''); 
    const [editingUserId, setEditingUserId] = useState(null); // Estado para o usuário em edição
    const [userToDelete, setUserToDelete] = useState(null); // Estado para o usuário a ser excluído

    useEffect(() => {
        getUsuarios(); // Chamada da função para obter usuários na montagem do componente
    }, []);

    // Função para obter usuários
    async function getUsuarios() {
        try {
            const response = await axios.get(`http://localhost:3003/usuarios`);
            if (response.data && response.data.usuarios) {
                setLocals(response.data.usuarios); // Armazenando os usuários no estado
            } else {
                console.log("Nenhum usuário encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar usuários:", error);
        }
    }

    // Função para atualizar um usuário
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3003/usuarios/${editingUserId}`, { 
                nome, 
                tipo_usuario: tipoUsuario,
                numero_nif: numeroNif,
                numero_qrcode: numeroQrCode
            });
            setEditingUserId(null); // Reseta o id de edição
            setNome(''); 
            setTipoUsuario(''); 
            setNumeroNif(''); 
            setNumeroQrCode(''); 
            getUsuarios(); 
        } catch (error) {
            console.log("Erro ao atualizar usuário:", error);
        }
    }

    // Função para iniciar a edição de um usuário
    function editUser(user) {
        setNome(user.nome);
        setTipoUsuario(user.tipo_usuario);
        setNumeroNif(user.numero_nif); 
        setNumeroQrCode(user.numero_qrcode); 
        setEditingUserId(user.user_id); // Define o usuário que está sendo editado
    }

    // Função para abrir o modal de confirmação
    function confirmDelete(userId) {
        setUserToDelete(userId); // Define o usuário a ser excluído
    }

    // Função para excluir um usuário
    async function deleteUser() {
        if (userToDelete) {
            try {
                await axios.delete(`http://localhost:3003/usuarios/${userToDelete}`);
                // Atualiza a lista de usuários localmente, removendo o usuário excluído
                setLocals((prevLocals) => prevLocals.filter((user) => user.user_id !== userToDelete));
                setUserToDelete(null); // Reseta o usuário a ser excluído
            } catch (error) {
                console.log("Erro ao excluir usuário:", error);
            }
        }
    }

    return (
        <div>
            <Header />
            <div className={styles.App}>
                <h1 className={styles.h1}>Usuários Cadastrados</h1>
                {locals.length > 0 ? (
                    locals.map((l) => (
                        <div className={styles.usuarios} key={l.user_id}>
                            <h3 className={styles.h3}>Nome: {l.nome}</h3>
                            <h4 className={styles.h4}>Tipo: {l.tipo_usuario}</h4>
                            <h4 className={styles.h4}>Número do NIF: {l.numero_nif}</h4>
                            <h4 className={styles.h4}>Número do QRCODE: {l.numero_qrcode}</h4>
                            <button className={styles.editarbutton} onClick={() => editUser(l)}>Editar</button>
                            <button className={styles.excluirbutton} onClick={() => confirmDelete(l.user_id)}>Excluir</button>

                            {editingUserId === l.user_id && (
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
                                        placeholder="Tipo de Usuário"
                                        value={tipoUsuario}
                                        onChange={(e) => setTipoUsuario(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Número do NIF"
                                        value={numeroNif}
                                        onChange={(e) => setNumeroNif(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Número do QRCODE"
                                        value={numeroQrCode}
                                        onChange={(e) => setNumeroQrCode(e.target.value)}
                                        required
                                    />
                                    <button className={styles.buttonseditar} type="submit">Atualizar</button>
                                    <button className={styles.buttonseditar} type="button" onClick={() => setEditingUserId(null)}>Cancelar</button>
                                </form>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nenhum usuário cadastrado.</p>
                )}
            </div>

            {userToDelete !== null && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h4>Você tem certeza que deseja excluir este usuário?</h4>
                        <button onClick={deleteUser}>Sim</button>
                        <button onClick={() => setUserToDelete(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usuarios;