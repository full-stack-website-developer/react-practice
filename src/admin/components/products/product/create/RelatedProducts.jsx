import { useContext } from "react";
import { productList } from "../../../../../store/ProductList";
import { useFormikContext } from "formik";
import Select from "react-select";
import Label from "../../../FormikFieldComponents/Label";
import ErrorText from "../../../specification/groups/ErrorText";
import { ErrorMessage } from "formik";
import styles from "./RelatedProducts.module.scss";

const RelatedProducts = ({ label }) => {
    const { products } = useContext(productList);
    const { values, setFieldValue } = useFormikContext();

    // Options: { value: id, label: name }
    const valueOptions = products.map(product => ({
        value: product.id,
        label: product.name
    }));

    // Filter selected options using current Formik value
    const selectedValues = valueOptions.filter(opt =>
        values.relatedProducts?.includes(opt.value)
    );

    // On select change, store just the IDs
    const handleChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(opt => opt.value);
        setFieldValue("relatedProducts", selectedIds);
    };

    return (
        <div className="col-4">
            <Label label={label} />

            <Select
                isMulti
                options={valueOptions}
                value={selectedValues}
                onChange={handleChange}
                placeholder="Select related products..."
                className="basic-multi-select w-100"
                classNamePrefix="react-select"
                name="relatedProducts"
            />

            {/* Error message if you're validating relatedProducts in Yup */}
            <ErrorMessage name="relatedProducts" component={ErrorText} />
        </div>
    );
};

export default RelatedProducts;
