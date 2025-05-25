import * as Yup from 'yup';

export const productCreateSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is Required'),
    permalink: Yup.string(),
    description: Yup.string(),
    content: Yup.string(),
    additionalImages: Yup.array().max(10, 'You can upload a maximum of 10 images.'),
    price: Yup.number().min(0, "Price must be atleast 0").required("Price is required"),
    discount: Yup.number()
    .min(0, "Discount cannot be less than 0%")
    .max(70, "Discount cannot exceed 70%"),
    attributes: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        values: Yup.array()
          .of(Yup.string()),
      })
    ),
    quantity: Yup.object().shape({
      min: Yup.number()
        .typeError("Must be a number")
        .min(0, "Minimum quantity must be at least 1")
        .nullable(),
    
      max: Yup.number()
        .typeError("Must be a number")
        .min(0, "Minimum quantity must be at least 1")
        .test(
          "max-greater-than-min",
          "Maximum quantity must be greater than or equal to minimum quantity",
          function (value) {
            const { min } = this.parent;
            return min === "" || min === null || min === undefined || value >= min;
          }
        )
    }),
    
})