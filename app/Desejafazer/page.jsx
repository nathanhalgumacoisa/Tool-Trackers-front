// app/Desejafazer/page.jsx
import React from 'react';
import App from '../components/card/Card'; // Ajuste o caminho conforme necessário

const Desejafazer = () => {
    return (
        <div>
            <h1>Deseja Fazer</h1>
            <App /> {/* Aqui você renderiza o componente */}
        </div>
    );
};

export default Desejafazer;