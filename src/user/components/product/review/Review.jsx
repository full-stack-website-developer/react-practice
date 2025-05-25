import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../../admin/components/FormikControl"
import { useContext } from "react";
import { reviewContext } from "../../../../store/user/review/Review";
import Rating from '@mui/material/Rating';

const Review = ({ poductId }) => {
    const { create, reviews } = useContext(reviewContext)

    const initialValues = {
        reviewStars: '',
        message: "",
    }

    const validationSchema = Yup.object({
        reviewStars: Yup.string().required("Required!"),
        message: Yup.string().required('Required!'),
    })

    const onSubmit = values => {
        const { reviewStars, message } = values;

        const newReview = {
            id: Date.now(),
            poductId,
            reviewStars,
            message,
            status: "pending",
        }

        values.reviewStars = "";
        values.message = "";
        
        create(newReview);
        alert("Review Go For Approval.")
    }

    const allowedReviews =  reviews.filter(review => review.status === "accept");
    const productReviews = allowedReviews.filter(allowedReview => parseInt(allowedReview.poductId) === parseInt(poductId));

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return <Form>
                            <FormikControl control="star" label="Your Rating" name="reviewStars"/>
                            <FormikControl control="input" label="Review" name="message"/>
                            <button type="submit" className="btn btn-success mt-2">Submit</button>
                        </Form>
                    }
                }
            </Formik>

            <div className="mt-4">
                <h5>Reviews</h5>
                {productReviews.length > 0 ? (
                    productReviews.map((review) => (
                    <div key={review.id} className="border p-2 mb-2 rounded-md bg-white shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                        <strong>Rating:</strong>
                        <Rating value={review.reviewStars} readOnly precision={0.5} size="small" />
                        </div>
                        <div>
                        <strong>Message:</strong> {review.message}
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

        </>
    )
}

export default Review;