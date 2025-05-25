import styles from "./css/Content.module.scss";

const Content = ({ content }) => {

    return (
        <div className={`${styles["content"]}`}>
            <p className={`${styles["label"]}`}>Content</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default Content;