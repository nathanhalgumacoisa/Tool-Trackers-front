import React, { useState } from 'react';

const filtroUser = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    
    const usuarios = [
        { nome: 'Alice', email: 'alice@example.com' },
        { nome: 'Bob', email: 'bob@example.com' },
        { nome: 'Charlie', email: 'charlie@example.com' },
        { nome: 'David', email: 'david@example.com' },
    ];

    const filtrarUsuarios = () => {
        return usuarios.filter(usuario => {
            const nomeMatch = nome ? usuario.nome.toLowerCase().includes(nome.toLowerCase()) : true;
            const emailMatch = email ? usuario.email.toLowerCase().includes(email.toLowerCase()) : true;
            return nomeMatch && emailMatch;
        });
    };

    return (
        <div>
            <h1>Filtrar Usuários</h1>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <h2>Resultados:</h2>
            <ul>
                {filtrarUsuarios().map((usuario, index) => (
                    <li key={index}>
                        {usuario.nome} - {usuario.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default filtroUser;