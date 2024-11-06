import React from "react";
import styles from "./menu.module.css"
import Link from 'next/link'

const Menu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.container}>
              <p>Cadastro de Ferramentas</p>
            </div>
            <div className={styles.container}>
              <p>Cadastro Usuário</p>
            </div>
            <div className={styles.container}>
              <p>Conferência</p>
            </div>
            <div className={styles.container}>
              <p>Empréstimo</p>
            </div>   
        </div>
    );
};

export default Menu;