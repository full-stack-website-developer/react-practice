import styles from "./css/EmptyMessage.module.scss";

const EmptyMessage = ({text}) => {
    return (
        <h5 className={`${styles["empty-message"]}`}>{text}</h5>
    )
}

export default EmptyMessage;