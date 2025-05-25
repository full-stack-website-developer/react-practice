import { useNavigate } from "react-router-dom";
import styles from "./css/Tags.module.scss";

const Tags = ({ tags }) => {
    const navigate = useNavigate();
    
    function handleTagPage(tag) {
        navigate(`/tag/${tag}`)
    }
    
    return (
        <div className={`${styles["tags-container"]}`}>
            <span className={`${styles["label"]}`}>Tag :</span>
            <div className={`${styles["tags"]}`}>
            {
                tags.map((tag, index) => {
                    return(
                        <span 
                            className={`${styles["tag"]}`}
                            onClick={() => handleTagPage(tag)}
                            key={index}
                        >
                            {tag}
                            {index < tags.length - 1 ? ', ' : ''}
                        </span>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Tags;