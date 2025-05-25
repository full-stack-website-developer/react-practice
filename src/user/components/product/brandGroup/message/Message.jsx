import { TbMessage } from "react-icons/tb";
import styles from "./css/Message.module.scss"

const Message = () => {
    return (
        <div className={`${styles["message-group"]}`}>
            <TbMessage className={`${styles["icon"]} fs-6` }/>
            <span className={`${styles["text"]}`}>
                Send Message
            </span>
        </div>
    )
}

export default Message;