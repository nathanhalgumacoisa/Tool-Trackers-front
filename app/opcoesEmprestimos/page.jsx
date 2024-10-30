import App from '../components/card/Card'; // Ajuste o caminho conforme necessário
import styles from './opcoesemprest.module.css'; // Importando o CSS Module
import Header from '../components/header/Header.jsx';

const OpcoesEmprestimos = () => {
    
    return (
        <div>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.div1}>
            <img src="./fundosenai.png" alt="Fundo Senai" className={styles.imagem1} />
            </div>

            <h1 className={styles.cards1}>O que deseja fazer ?</h1>
            <div className={styles.cardsContainer}> {/* Contêiner flexível para os cards */}
                <div>
                <App title="Oficina Mecânica de Usinagem" link="/Organizadores?ambiente=ofm" /> {/* Primeiro card */}
                <App title="Oficina Eletro Eletrônica" link="/Organizadores?ambiente=oee" /> {/* Segundo card */}
                </div>
                <div>
                <App title="Espaço Maker" link="/Organizadores?ambiente=em" /> {/* Primeiro card */}
                <App title="Manutenção" link="/Organizadores?ambiente=manut" /> {/* Primeiro card */}
                </div>
            </div>
        </div>
    );
};

export default OpcoesEmprestimos;
