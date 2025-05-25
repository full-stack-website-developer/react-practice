import styles from './css/Name.module.scss';

const Name = ({ name }) => {
    return (
        <h6 className={styles["name-wrapper"]} title={name}>
            {name}
        </h6>
    )
}

export default Name;
