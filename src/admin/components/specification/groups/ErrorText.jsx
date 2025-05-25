import styles from "./ErrorText.module.scss"

const ErrorText = ({children}) => {
    return (
        <div className={`${styles.error} text-danger`}>
            {children}
        </div>
    )
}


export default ErrorText