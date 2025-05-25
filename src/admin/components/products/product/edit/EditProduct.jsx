import { Form, Formik } from "formik"
import InputTags from "../../../custom/Tag"
import FormikControl from "../../../FormikControl"
import SpecificationTable from "../create/SpecificationTable"
import Overview from "../create/Overview"
import Status from "../create/Status"
import Attribute from "../create/Attribute"
import { StatusEnum } from "../../../../../constants/statusEnum"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useRef, useState } from "react"
import { productList } from "../../../../../store/ProductList"
import { productCreateSchema } from "../../../../../schemas/product/create"
import stylesTag from "../../../custom/Tag.module.css"
import styles from "./EditProduct.module.scss"
import { useTranslation } from "react-i18next"
import Label from "../../../FormikFieldComponents/Label"
import { IoSaveOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { brandList } from "../../../../../store/brand/brandList"
import { productLabelList } from "../../../../../store/label/ProductLabelList"
import { storeList } from "../../../../../store/store/StoreList"
import Categories from "../create/Categories"
import NameInput from "../create/NameInput"
import PermalinkDisplay from "../create/PermalinkDisplay"
import { navigateWithToaster } from "../../../../../helper"
import FeaturedImage from "../create/FeaturedImage"
import RelatedProducts from "../create/RelatedProducts"

function EditProduct() {

    const { id } = useParams();
    const { products } = useContext(productList);
    const { stores } = useContext(storeList)
    const { brands } = useContext(brandList);
    const { productLabels } = useContext(productLabelList);
    const { logoPreviewHandle, update } = useContext(productList);
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const { t: tCommon } = useTranslation('common');
    const { t: tAddProduct } = useTranslation('addProduct');

    const { title, name, permalink, description, content, images, specification_table, empty_text, attributes, publish, status, store, brand, label, min_order_quantity, max_order_quantity, tags, pl_start_writing, pl_name } = tAddProduct('text');
    const { tUpdate, tUpdate_exit } = tCommon('text')

    const getRelatedProducts = products.filter(product => parseInt(product.id) === parseInt(id));
    const [ relatedProduct ] = getRelatedProducts;

    const statusOptions = Object.values(StatusEnum).map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
    }));

const initialValues = {
        name: relatedProduct.name,
        permalink: relatedProduct.name,
        description: relatedProduct.description,
        content: relatedProduct.content,
        additionalImages: relatedProduct.additionalImages,
        specificationTable: {
            table: relatedProduct.specificationTable.table,
            attributes: relatedProduct.specificationTable.attributes
        },
        sku: relatedProduct.sku,
        price: relatedProduct.price,
        discount: relatedProduct.discount,
        stock: relatedProduct.stock,
        attributes: relatedProduct.attributes,
        status: relatedProduct.status,
        store: relatedProduct.store,
        brand: relatedProduct.brand,
        category: {
            parent: relatedProduct.category.parent,
            subCategories: relatedProduct.category.subCategories,
        },
        featuredImage: relatedProduct.featuredImage,
        label: relatedProduct.label,
        quantity: relatedProduct.quantity,
        tags: relatedProduct.tags,
        relatedProducts: relatedProduct.relatedProducts
    }

    const onSubmit = async values => {
        const { name, permalink, description, content, additionalImages, specificationTable, sku, price, discount, stock, attributes, status, store, brand, category, featuredImage, label, quantity, tags, relatedProducts } = values;

        let logoBase64 = "";
        if (featuredImage) {
            logoBase64 = await convertFileToBase64(featuredImage);
        } else {
            logoBase64 = "https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU="
        }

        const updatedProduct = {
            id,
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

        const result = update(updatedProduct);

        if(shouldNavigate) {
            if(result.success) {
                navigateWithToaster(navigate, "/admin/products", result.message, "success")
            }
        }
        else {
            navigateWithToaster(navigate, `/admin/products/edit/${updatedProduct.id}`, result.message, "success")
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

    function featuredImagePreview(e) {

        let file = e.target.files?.[0];
 

        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => logoPreviewHandle(reader.result);
        reader.readAsDataURL(file);
    }

    async function isFormError(validateForm) {
        const errors = await validateForm();
        console.log(errors);
        
        if (Object.keys(errors).length > 0) {
            navigateWithToaster(navigate, `/admin/products/edit/${id}`, "Please check form fields carefully", "danger")
        }
    }

    
    return (
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
                                        
                                        <NameInput setFieldValue={formik.setFieldValue} label={name} placeHolder={pl_name} required={true}/>
                                        
                                        <PermalinkDisplay permalink={formik.values.permalink} label={permalink}/>

                                        <FormikControl 
                                            control="textEditor" 
                                            name="description" 
                                            label={description}
                                            placeHolder={pl_start_writing}
                                        />
                                        <FormikControl 
                                            control="textEditor" 
                                            name="content" 
                                            label={content}
                                            placeHolder={pl_start_writing}

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
                                        <SpecificationTable name="specificationTable.table" label={specification_table} emptyText={empty_text}/>
                                    </InputTags>

                                    

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <Overview />
                                        <Status label={status}/>
                                    </InputTags>
                                    <InputTags 
                                        as="section"
                                        className={`${stylesTag.section}`}
                                    >
                                        <Attribute label={attributes}/>
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
                                                <button type="submit" className="btn btn-success me-md-2" onClick={async () => {
                                                    setShouldNavigate(false); 
                                                    await isFormError(formik.validateForm);
                                                }}><span><IoSaveOutline className="fs-5"/></span> {tUpdate}</button>
                                                <button type="submit" className="btn btn-outline-dark me-md-2" onClick={async () => {
                                                    setShouldNavigate(true); 
                                                    await isFormError(formik.validateForm);
                                                }}><span><IoExitOutline  className="fs-4"/></span>{tUpdate_exit}</button>
                                            </div>
                                        </div>
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl control="select" name="status" label={status} options={statusOptions} />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl control="select" name="store" label={store} options={stores} />
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
                                        <FormikControl control="select" name="brand" label={brand} options={brands} />
                                    </InputTags>

                                    {/* <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl control="file" name="featuredImage" label="Featured Image (Optional)" ref={prevInpVal} logoPreview={featuredImagePreview} />
                                        {(logoPreview ? 
                                        <div className={`${styles['preview-container']}`}>
                                            <TiDeleteOutline className={`${styles.icon} fs-4`} onClick={() => removeLogoPreview(formik)}/>
                                            <img src={logoPreview} class={`${styles["image-preview"]}`} alt="..." />
                                        </div>
                                    : null)}
                                    </InputTags> */}
                                    {/* <FilePond
                                        files={formik.values.featuredImage ? [{ source: formik.values.featuredImage, options: { type: 'local' } }] : []}
                                        onupdatefiles={(fileItems) => {
                                            if (fileItems.length > 0) {
                                            formik.setFieldValue('featuredImage', fileItems[0].file); // Store file directly
                                            } else {
                                            formik.setFieldValue('featuredImage', '');
                                            }
                                        }}
                                        allowMultiple={false}
                                        name="featuredImage"
                                        labelIdle='Drag & Drop your featured image or <span class="filepond--label-action">Browse</span>'
                                    /> */}

                                    {/* <FeaturedImage formik={formik} existingImageUrl={formik.values.featuredImage} /> */}
                                    <FeaturedImage 
                                        name="featuredImage" 
                                        formik={formik}
                                    />

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl control="checkbox" name="label" label={label} options={productLabels} />
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl type="number" control="input" name="quantity.min" label={min_order_quantity} />
                                        <span className={`${styles['additional-text']}`}>Minimum quantity to place an order, if the value is 0, there is no limit.</span>
                                    </InputTags>

                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl type="number" control="input" name="quantity.max" label={max_order_quantity} />
                                        <span className={`${styles['additional-text']}`}>Minimum quantity to place an order, if the value is 0, there is no limit.</span>
                                    </InputTags>


                                    <InputTags 
                                        as="section" 
                                        className={`${stylesTag.section}`}
                                    >
                                        <FormikControl control="tagsInput" name="tags" label={tags} formik={formik}/>
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

export default EditProduct