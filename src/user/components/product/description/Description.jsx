import styles from "./css/Description.module.scss";

const Paragraph = ({ description }) => {

    return (
        <div className={`${styles["content"]}`}>
            <h2 className="text-start ms-0">Description</h2>
            <div dangerouslySetInnerHTML={{ __html: description }}/>
            <hr />
        </div>
    )
}

export default Paragraph;