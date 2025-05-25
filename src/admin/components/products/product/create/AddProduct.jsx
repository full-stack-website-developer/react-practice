import { Form, Formik } from "formik"
import FormikControl from "../../../FormikControl"
import styles from "./AddProduct.module.scss"
import InputTags from "../../../custom/Tag"
import stylesTag from "../../../custom/Tag.module.css"
import { productCreateSchema } from "../../../../../schemas/product/create"
import { useTranslation } from "react-i18next"
import SpecificationTable from "./SpecificationTable"
import Overview from "./Overview"
import Status from "./Status"
import Attribute from "./Attribute"
import Label from "../../../FormikFieldComponents/Label"
import { IoSaveOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { StatusEnum } from "../../../../../constants/statusEnum"
import { useContext, useState } from "react"
import { storeList } from "../../../../../store/store/StoreList"
import { brandList } from "../../../../../store/brand/brandList"
import Categories from "./Categories"
import { productList } from "../../../../../store/ProductList"
import { productLabelList } from "../../../../../store/label/ProductLabelList"
import "@yaireo/tagify/dist/tagify.css";
import NameInput from "./NameInput"
import PermalinkDisplay from "./PermalinkDisplay"
import { navigateWithToaster } from "../../../../../helper"
import { useNavigate } from "react-router-dom"
import { registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FeaturedImage from "./FeaturedImage"
import React from "react"
import RelatedProducts from "./RelatedProducts"

// Register the image preview plugin
registerPlugin(FilePondPluginImagePreview);

const AddProduct = () => {
    const { t: tCommon } = useTranslation('common');
    const { t: tAddProduct } = useTranslation('addProduct');

    const { title, name, permalink, tDescription, tContent, images, specification_table, empty_text, overview, attributes, publish, status, store, brand, label, min_order_quantity, max_order_quantity, tags, pl_name } = tAddProduct('text');
    const { tCreate, tCreate_exit } = tCommon('text')

    const { stores } = useContext(storeList)
    const { brands } = useContext(brandList);
    const { productLabels } = useContext(productLabelList);
    const { create } = useContext(productList);

    const navigate = useNavigate();

    const [shouldNavigate, setShouldNavigate] = useState(false);

    const initialValues = {
        name: '',
        permalink: '',
        description: '',
        content: '',
        additionalImages: [],
        specificationTable: {
            table: '',
            attributes: []
        },
        sku: '',
        price: '',
        discount: '',
        stock: "In Stock",
        attributes: [],
        status: StatusEnum.DRAFT,
        store: "",
        brand: "",
        category: {
            parent: [],
            subCategories: []
        },
        featuredImage: "",
        label: "",
        quantity: {
            min: "",
            max: "",
        },
        tags: [],
        relatedProducts: [],
    }

    const onSubmit = async (values) => {   
        const { name, permalink, description, content, additionalImages, specificationTable, sku, price, discount, stock, attributes, status, store, brand, category, featuredImage, label, quantity, tags, relatedProducts } = values;

        let logoBase64 = "";
        if (featuredImage) {
            logoBase64 = await convertFileToBase64(featuredImage);
        }
        else {
            logoBase64 = "https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU="
        }

        const newProduct = {
            id: Date.now(),
            name,
            permalink,
            description,
            content,
            additionalImages,
            specificationTable,
            sku,
            price,
            discount,
            stock,
            attributes,
            status,
            store,
            brand,
            category,
            featuredImage: logoBase64,
            label,
            quantity,
            tags,
            relatedProducts,
        }

        const result = create(newProduct);

        if (shouldNavigate && result.success) {
            navigateWithToaster(navigate, "/admin/products", result.message, "success") 
        } else {
            navigateWithToaster(navigate, `/admin/products/edit/${newProduct.id}`, result.message, "success")
        }
    }

    // Helper Function to Convert File to Base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
        
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const statusOptions = Object.values(StatusEnum).map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
    }));

    async function isFormError(validateForm) {
        const errors = await validateForm();
        
        if (Object.keys(errors).length) {
            navigateWithToaster(navigate, "/admin/products/create", "Please check form fields carefully", "danger");
        }
    }

    return(
        <div className={`${styles["main-container"]}`}>
            <h1>{title}</h1>
            <Formik 
                initialValues={initialValues} 
                validationSchema={productCreateSchema} 
                onSubmit={onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    formik => (
                        <Form>
                            <InputTags 
                                as="div" 
                                className={`${stylesTag.main}`}
                            >
                                <div className={`${styles.main}`}>
                                    <div className={`${styles.form}`}>
                                        <NameInput 
                                            setFieldValue={formik.setFieldValue} 
                                            label={name} 
                                            placeHolder={pl_name} 
                                            required={true}
                                        />
                                        
                                        <PermalinkDisplay 
                                            permalink={formik.values.permalink} 
                                            label={permalink}
                                        />

                                        <FormikControl 
                                            control="textEditor"
                                            name="content"
                                            value={formik.values.content}
                                            onChange={(value) => formik.setFieldValue("content", value)}
                                            label={tContent}
                                            placeholder="Type here..."
                                        />

                                        <FormikControl 
                                            control="textEditor"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={(value) => formik.setFieldValue("description", value)}
                                            label={tDescription}
                                            placeholder="Type here..."
                                        />

                                        <FormikControl 
                                            control="imageUploaderBox" 
                                            name='additionalImages' 
                                            label={images}
                                        />
                                    </div>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <SpecificationTable 
                                            name="specificationTable.table" 
                                            label={specification_table} 
                                            emptyText={empty_text}
                                        />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <Overview label={overview} />
                                        <Status label={status}/>
                                    </InputTags>

                                    <InputTags 
                                        as="section"
                                        className={`${stylesTag.section}`}
                                    >
                                        <Attribute label={attributes} />
                                    </InputTags>

                                    <InputTags 
                                        as="section"
                                        className={`${stylesTag.section}`}
                                    >
                                        <RelatedProducts label="RelatedProducts"/>
                                    </InputTags>

                                </div>
                                <aside className={`${styles.aside}`}>
                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <div className={`${styles["publish-btn-group"]}`}>
                                            <Label label={publish} />
                                            <div className={`${styles["publish-btn"]}`}>
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-success me-md-2" 
                                                    onClick={async () => {
                                                        setShouldNavigate(false); 
                                                        await isFormError(formik.validateForm);
                                                    }}>
                                                    <span>
                                                        <IoSaveOutline className="fs-5"/>
                                                    </span> 
                                                    {tCreate}
                                                </button>
                                                <button 
                                                    type="cubmit" 
                                                    className="btn btn-outline-dark me-md-2"
                                                    onClick={async () => {
                                                        setShouldNavigate(true); 
                                                        await isFormError(formik.validateForm);
                                                    }}>
                                                        <span>
                                                            <IoExitOutline className="fs-4"/>
                                                        </span>
                                                        {tCreate_exit}
                                                </button>
                                            </div>
                                        </div>
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            control="select" 
                                            name="status" 
                                            label={status} 
                                            options={statusOptions} 
                                        />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            control="select" 
                                            name="store" 
                                            label={store} 
                                            options={stores}
                                        />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <Categories />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            control="select" 
                                            name="brand" 
                                            label={brand} 
                                            options={brands} 
                                        />
                                    </InputTags>

                                    <FeaturedImage 
                                        name="featuredImage" 
                                        formik={formik}
                                    />

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            control="checkbox" 
                                            name="label" 
                                            label={label} 
                                            options={productLabels} 
                                        />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            type="number" 
                                            control="input" 
                                            name="quantity.min" 
                                            label={min_order_quantity} 
                                        />
                                        <span className={`${styles['additional-text']}`}>Minimum quantity to place an order, if the value is 0, there is no limit.</span>
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            type="number" 
                                            control="input" 
                                            name="quantity.max" 
                                            label={max_order_quantity} 
                                        />
                                            <span className={`${styles['additional-text']}`}>Minimum quantity to place an order, if the value is 0, there is no limit.</span>
                                    </InputTags>


                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl 
                                            control="tagsInput" 
                                            name="tags" 
                                            label={tags} 
                                            formik={formik}
                                        />
                                    </InputTags>

                                </aside>
                            </InputTags>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default AddProduct;