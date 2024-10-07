import styles from './btnVoltar.module.css'

const BtnVoltar = ({rota}) => {
    return(
        <div className={styles.container}>
            <button onClick={rota}>Voltar</button>
        </div>
    )
}
export default BtnVoltar