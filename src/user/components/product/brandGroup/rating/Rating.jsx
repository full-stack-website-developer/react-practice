import {
    MdOutlineStar,   // empty star
    MdStar,          // full star
    MdStarHalf       // half star
} from "react-icons/md";

import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

import styles from "./css/Rating.module.scss";
import { useContext } from "react";
import { reviewContext } from "../../../../../store/user/review/Review";

const AvgRating = ({ productId }) => {
    const starIconClass = styles["star-icon"];
    const { reviews } = useContext(reviewContext);

    const productReviews = reviews
    .filter(review => review.status === "accept")
    .filter(review => parseInt(review.poductId) === parseInt(productId));

    const totalRating = productReviews.reduce((sum, review) => {
        const rating = Number(review.reviewStars);
        return sum + (isNaN(rating) ? 0 : rating); 
    }, 0);

    const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;

    return (
        <div className={`${styles["review-group"]}`}>
            <div>
                <Rating
                    initialRating={averageRating}
                    readonly
                    emptySymbol={<FaRegStar color="#ccc" size={16} />}
                    fullSymbol={<FaStar color="#ffc107" size={16} />}
                />
                <span
                    className={`${styles["review-text"]}`}
                    title={productReviews.length < 1 ? "Be the first to review!" : ""}
                >
                    ({productReviews.length} reviews)
                </span>
            </div>
            {
                productReviews.length < 1 &&
                <span className="text-warning">Be the first to review!</span>
            }
        </div>
    );
};

export default AvgRating;
