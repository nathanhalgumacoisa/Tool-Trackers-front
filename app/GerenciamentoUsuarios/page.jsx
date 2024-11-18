"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header/Header.jsx';
import styles from './gerenciamentousuarios.module.css';
import { Switch } from 'antd';

// const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

function Usuarios() {
    const [locals, setLocals] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        const savedLocals = localStorage.getItem('usuarios');
        if (savedLocals) {
            setLocals(JSON.parse(savedLocals));
        } else {
            getUsuarios();
        }
    }, []);

    async function getUsuarios() {
        try {
            const response = await axios.get(`http://localhost:3003/usuarios`);
            if (response.data && response.data.usuarios) {
                setLocals(response.data.usuarios);
                localStorage.setItem('usuarios', JSON.stringify(response.data.usuarios));
            } else {
                console.log("Nenhum usuário encontrado na resposta.");
            }
        } catch (error) {
            console.log("Erro ao buscar usuários:", error);
        }
    }

    const toggleUserActivation = async (userId, isActive) => {
        try {
            const user = locals.find(u => u.user_id === userId);
            const response = await axios.put(`http://localhost:3003/usuarios/${userId}`, {
                ativo: !isActive,
                nome: user.nome,
                email: user.email,
                tipo_usuario: user.tipo_usuario,
            });

            const updatedUsers = locals.map((user) =>
                user.user_id === userId ? { ...user, ativo: !isActive } : user
            );
            setLocals(updatedUsers);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsers));
        } catch (error) {
            console.error("Erro ao atualizar status do usuário:", error);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3003/usuarios/${editingUserId}`, {
                nome,
                email,
            });

            const updatedUser = {
                user_id: editingUserId,
                nome,
                email,
                tipo_usuario: tipoUsuario,
            };

            setLocals((prevLocals) =>
                prevLocals.map((user) =>
                    user.user_id === editingUserId ? updatedUser : user
                )
            );

            resetForm();
        } catch (error) {
            console.log("Erro ao atualizar usuário:", error);
        }
    }

    function editUser(user) {
        setNome(user.nome);
        setEmail(user.email);
        setTipoUsuario(user.tipo_usuario);
        setEditingUserId(user.user_id);
    }

    function resetForm() {
        setEditingUserId(null);
        setNome('');
        setEmail('');
        setTipoUsuario('');
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
                            <h4 className={styles.h4}>Email: {l.email}</h4>
                            <h4 className={styles.h4}>Tipo: {l.tipo_usuario}</h4>

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
                                        type="email"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input className={styles.inputs}
                                        type="text"
                                        placeholder="Tipo de Usuário"
                                        value={tipoUsuario}
                                        onChange={(e) => setTipoUsuario(e.target.value)}
                                        required
                                    />
                                    <button className={styles.buttonseditar} type="submit">Atualizar</button>
                                    <button className={styles.buttonseditar} type="button" onClick={resetForm}>Cancelar</button>
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