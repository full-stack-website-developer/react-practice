import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import ErrorText from "../specification/groups/ErrorText";

const Star = (props) => {
    const { label, name, ...rest } = props;

    const [field, , meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    return (
        <div className="form-group mb-3">
            {label && <label htmlFor={name}>{label}</label>}
            <div>
                <Rating
                    initialRating={field.value}
                    emptySymbol={<FaRegStar color="#ccc" size={16} />}
                    fullSymbol={<FaStar color="#ffc107" size={16} />}
                    onChange={(value) => setFieldValue(name, value)}
                    name={name}
                />
            </div>
            <ErrorMessage name={name} component={ErrorText}/>
        </div>
    );
};

export default Star;
