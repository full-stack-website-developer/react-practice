import styles from "./css/Personalization.module.scss";

const Personalization = () => {
    return (
        <div className={`${styles["personalization-container"]}`}>
            <p className={`${styles["label"]}`}>Personalization</p>
            <textarea 
                rows={3} 
                placeholder="You can change Only the stone color to a different color from our available color chart. No Custom Text. If no color selected default colors will be applied."
            >
            </textarea>
        </div>
    )
}

export default Personalization;