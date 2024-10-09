import styles from './btnVoltar.module.css'

const BtnVoltar = ({rota}) => {
    return(
        <>
            <a href={rota}>
                <button className={styles.btn}>Voltar</button>
            </a>
        </>
    )
}
export default BtnVoltar