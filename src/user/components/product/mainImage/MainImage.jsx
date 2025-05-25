import styles from "./css/MainImage.module.scss";

const MainImage = ({ featuredImage }) => {

    

    return (
        <div className={`${styles["main-image"]}`}>
            <img src={featuredImage} alt="Image not Found" />
        </div>
    )
}

export default MainImage;