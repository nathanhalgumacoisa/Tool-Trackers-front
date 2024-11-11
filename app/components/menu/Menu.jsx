import React from "react";
import styles from "./menu.module.css"
import Link from 'next/link'

const Menu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.container}>
              <Link href="/CadastroFerr"><p>Cadastro de Ferramentas</p></Link>
            </div>
            <div className={styles.container}>
              <Link href="/Cadastro"><p>Cadastro Usuário</p></Link>
            </div> 
            <div className={styles.container}>
              <Link href="/Desejafazer"><p>Deseja Fazer</p></Link>
            </div>
            <div className={styles.container}>
                <Link href="/Ferramentas"><p>Ferramentas</p></Link>
            </div>   
        </div>
    );
};

export default Menu;