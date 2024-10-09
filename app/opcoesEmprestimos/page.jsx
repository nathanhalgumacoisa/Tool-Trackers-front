import App from '../components/card/Card'; // Ajuste o caminho conforme necessário
import styles from './opcoesemprest.module.css'; // Importando o CSS Module

const OpcoesEmprestimos = () => {
    
    return (
        <div>
            <h1 className={styles.cards1}>O que deseja fazer ?</h1>
            <div className={styles.cardsContainer}> {/* Contêiner flexível para os cards */}
                <App title="Oficina Mecânica de Usinagem" link="/Organizadores?ambiente=Oficina" /> {/* Primeiro card */}
                <App title="Oficina Eletro Eletrônica" link="/Organizadores?ambiente=oee" /> {/* Segundo card */}
                <App title="Espaço Maker" link="/Organizadores?ambiente=em" /> {/* Primeiro card */}
                <App title="Manutenção" link="/Organizadores?ambiente=manut" /> {/* Primeiro card */}

            </div>
        </div>
    );
};

export default OpcoesEmprestimos;
