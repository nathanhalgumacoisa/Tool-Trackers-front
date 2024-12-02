import React from 'react'
import styles from './header.module.css'
import Link from 'next/link'

const Header = () => {
    
    return(
        <div className={styles.container}> 
            <img src="https://desenvolveitapevi.wordpress.com/wp-content/uploads/2016/02/logo-senai1.png" alt="logo senai" className={styles.img} />
            <div className={styles.menu}>
                <div className={styles.text_container_ferr}>
                    <Link href="/CadastroFerr"><p>Cadastro de Ferramentas</p></Link>
                </div>
                 <div className={styles.text_container}>
                    <Link href="/Cadastro"><p>Cadastro Usuário</p></Link>
                </div> 
                <div className={styles.text_container}>
                    <Link href="/Desejafazer"><p>Deseja Fazer</p></Link>
                </div>
                <div className={styles.text_container}>
                    <Link href="/Ferramentas"><p>Ferramentas</p></Link>
                </div>   
            </div>
        </div>
    )
} 
export default Header