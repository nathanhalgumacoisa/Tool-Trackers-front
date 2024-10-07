import styles from './header.module.css'

const Header = () => {
    
    return(
        <div className={styles.container}>
            <img src="https://desenvolveitapevi.wordpress.com/wp-content/uploads/2016/02/logo-senai1.png" alt="logo senai" className={styles.img} />
        </div>
    )
} 
export default Header