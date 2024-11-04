import React from "react";
import styles from "./menu.module.css"

const Menu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.container}>
              <p>Cadastro de Ferramentas</p>
              <p>Cadastro Usuário</p>
            </div>
            <div className={styles.container}>
             <p>Conferência</p>
             <p>Empréstimo</p>
            </div>   
        </div>
    );
};

export default Menu;