"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import styles from './gerenciamentousuarios.module.css';
import { Switch } from 'antd';

function Usuarios() {
    const [locals, setLocals] = useState([]); // Estado para armazenar usuários
    const [nome, setNome] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [numeroNif, setNumeroNif] = useState('');
    const [numeroQrCode, setNumeroQrCode] = useState('');
    const [editingUserId, setEditingUserId] = useState(null); // Estado para o usuário em edição

    useEffect(() => {
        const savedLocals = localStorage.getItem('usuarios');
        if (savedLocals) {
             setLocals(JSON.parse(savedLocals)); 
         } else {
        getUsuarios(); 
         }
    }, []);

    // Função para obter usuários
    async function getUsuarios() {
        try {
            const response = await axios.get(`http://localhost:3003/usuarios`);
            console.log("Usuários recebidos:", response.data);
            if (response.data && response.data.usuarios) {
                setLocals(response.data.usuarios);
            } else {
                console.log("Nenhum usuário encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar usuários:", error);
        }
    }

    // Após adicionar um novo usuário, chame getUsuarios
    const addUsuario = async (novoUsuario) => {
        await axios.post(`http://localhost:3003/usuarios`, novoUsuario);
        getUsuarios(); // Atualiza a lista após adicionar
    };

    // Função para atualizar a ativação do usuário
    const toggleUserActivation = async (userId, isActive) => {
        try {
            await axios.put(`http://localhost:3003/usuarios/${userId}`, { ativo: !isActive });
            const updatedUsers = locals.map((user) =>
                user.user_id === userId ? { ...user, ativo: !isActive } : user
            );
            setLocals(updatedUsers);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsers)); // Atualiza o localStorage
        } catch (error) {
            console.log("Erro ao atualizar status do usuário:", error);
        }
    };

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


            // Atualiza o estado local após a edição
            const updatedUsers = locals.map(user =>
                user.user_id === editingUserId
                    ? { ...user, nome, tipo_usuario: tipoUsuario, numero_nif: numeroNif, numero_qrcode: numeroQrCode }
                    : user
            );

            setLocals(updatedUsers);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsers)); // Atualiza o localStorage

            // Resetar campos e editar estado
            setEditingUserId(null); // Reseta o id de edição
            setNome('');
            setTipoUsuario('');
            setNumeroNif('');
            setNumeroQrCode('');
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

    return (
        <div>
            <Header />
            <div className={styles.App}>
                <h1 className={styles.h1}>Usuários Cadastrados</h1>
                {locals.length > 0 ? (
                    locals.map((l) => (
                        <div
                            className={`${styles.usuarios} ${!l.ativo ? styles.desativado : ''}`}
                            key={l.user_id}
                        >
                            <h3 className={styles.h3}>Nome: {l.nome}</h3>
                            <h4 className={styles.h4}>Tipo: {l.tipo_usuario}</h4>
                            <h4 className={styles.h4}>Número do NIF: {l.numero_nif}</h4>
                            <h4 className={styles.h4}>Número do QRCODE: {l.numero_qrcode}</h4>

                            <Switch
                                checked={l.ativo}
                                onChange={() => toggleUserActivation(l.user_id, l.ativo)}
                            />

                            <img
                                src="/editar.png"
                                alt="Editar"
                                className={styles.editarImagem}
                                onClick={() => editUser(l)}
                                style={{ cursor: 'pointer' }}
                            />

                            {!l.ativo && (
                                <p className={styles.mensagemInativo}>Usuário está inativo.</p>
                            )}


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
        </div>
    );
}

export default Usuarios;