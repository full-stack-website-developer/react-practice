import { useContext } from "react";
import { reviewContext } from "../../../store/user/review/Review";
import { productList } from "../../../store/ProductList";
import useItemById from "../../../hooks/useItemById";
import { getAcceptConfirmation, navigateWithToaster } from "../../../helper";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "../common/empty/EmptyMessage";

const Review = () => {
    const { reviews, removeReview, updateReview } = useContext(reviewContext);
    const { products } = useContext(productList);
    const navigate = useNavigate();
    const pendingReviews = reviews.filter( review => review.status === "pending" ) || [];
    
    function deleteReview(id) {
        const success = removeReview(id);
        if(success) {
            navigateWithToaster(navigate, '/admin/review', success.message, "danger");
        }
    }

    function acceptReview(id) {
        const isConfirm = getAcceptConfirmation("Review");
        if(isConfirm) {
            const [acceptedReview] = reviews.filter( review => parseInt(review.id) === parseInt(id) );
            const updatedReview = { ...acceptedReview, status: "accept" };
            const success = updateReview(updatedReview);
            if(success) {
                navigateWithToaster(navigate, '/admin/review', success.message, "success");
            }
        }
    }

    return (
        <>
            <h1>All Reviews</h1>
            <div className="d-grid gap-2 d-md-flex">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Review</th>
                        <th scope="col">Rating</th>
                        <th scope="col">OPERATIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pendingReviews.length > 0 ?
                        pendingReviews.map((review, i) => {
                            const product = useItemById(products, review.poductId);
    
                            return (
                            <tr key={review.id}>
                                <th scope="row">{i + 1}</th>
                                <td>{product.name}</td>
                                <td>{review.message}</td>
                                <td>{review.reviewStars}</td>
                                <td className="d-flex gap-2">
                                    <button className="btn btn-success" onClick={() => acceptReview(review.id)}>Allow</button>
                                    <button className="btn btn-danger" onClick={() => deleteReview(review.id)}>Deny</button>
                                </td>
                            </tr>
                            );
                        }) :
                        <tr>
                            <td colSpan={5}>
                                <EmptyMessage text={"No record Found"} />
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )


}

export default Review;