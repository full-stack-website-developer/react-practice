// import { createContext, useEffect, useState } from "react";
// import LocalStorage from "../../../services/LocalStorage";
// import { getDelConfirmation, jParse, remove } from "../../../helper";

// export const reviewContext = createContext({
//     create: function () {},
//     reviews: [],
//     removeReview: function () {},
//     updateReview: function () {},
// });

// const ReviewProvider = ({ children }) => {
//     const lreviewsData = LocalStorage.getItem("reviews");
//     const lreviews = lreviewsData ? jParse(lreviewsData) : [];

//     const [ reviews, setReviews ] = useState(lreviews);

//     useEffect(() => {
//         LocalStorage.setItem("reviews", reviews);   
//     }, [reviews])

//     function create(newReview) {
//         setReviews([...reviews, newReview]);
//     }

//     function removeReview(id) {
//        const isConfirm = getDelConfirmation('Review');
//        if(isConfirm) {
//         const filteredReview = remove(reviews, id);
//         setReviews(filteredReview);
//         return {success: true, message: 'Review Removed Successfully!'}
//        }
//     }

//     function updateReview(updatedReview) {
//         setReviews(currReviews => 
//             currReviews.map(currReview =>  parseInt(currReview.id) === parseInt(updatedReview.id) ? updatedReview : currReview )
//         )
//         return { success: true, message: "Review Assigned Successfully" }
//     }

//     return (
//         <reviewContext.Provider value={{ create, reviews, removeReview, updateReview }}>
//             { children }
//         </reviewContext.Provider>
//     )
// }

// export default ReviewProvider;

import { createContext, useEffect, useState } from "react";
import LocalStorage from "../../../services/LocalStorage";
import { getDelConfirmation, jParse, remove } from "../../../helper";

export const reviewContext = createContext({
    create: function () {},
    reviews: [],
    removeReview: function () {},
    updateReview: function () {},
});

const ReviewProvider = ({ children }) => {
    const lreviewsData = LocalStorage.getItem("reviews");
    const lreviews = lreviewsData ? jParse(lreviewsData) : [];

    const [reviews, setReviews] = useState(lreviews);

    // Save to localStorage on state change
    useEffect(() => {
        LocalStorage.setItem("reviews", reviews);
    }, [reviews]);

    // 🔄 Listen for changes from other tabs
    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === "reviews") {
                const updatedReviews = event.newValue ? JSON.parse(event.newValue) : [];
                setReviews(updatedReviews);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    function create(newReview) {
        setReviews([...reviews, newReview]);
    }

    function removeReview(id) {
        const isConfirm = getDelConfirmation('Review');
        if (isConfirm) {
            const filteredReview = remove(reviews, id);
            setReviews(filteredReview);
            return { success: true, message: 'Review Removed Successfully!' };
        }
    }

    function updateReview(updatedReview) {
        setReviews(currReviews =>
            currReviews.map(currReview =>
                parseInt(currReview.id) === parseInt(updatedReview.id) ? updatedReview : currReview
            )
        );
        return { success: true, message: "Review Assigned Successfully" };
    }

    return (
        <reviewContext.Provider value={{ create, reviews, removeReview, updateReview }}>
            {children}
        </reviewContext.Provider>
    );
};

export default ReviewProvider;
