import * as yup from "yup";

export const specGroupCreateSchema = yup.object().shape({
    name: yup.string().required("Required"),
})