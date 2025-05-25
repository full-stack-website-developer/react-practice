// /src/admin/AdminRoutes.jsx
import ProductCategories from "./components/products/category/ProductCategories.jsx";
import AddCategory from "./components/products/category/AddCategory.jsx";
import AllProducts from "./components/products/product/show/Product.jsx";
import Attribute from "./components/products/attribute/Attributes.jsx";
import AddAttribute from "./components/products/attribute/AddAttribute.jsx";
import EditAttribute from "./components/products/attribute/EditAttribute.jsx";
import SpecificationGroups from "./components/specification/groups/SpecificationGroups.jsx";
import SpecificationAttributes from "./components/specification/attributes/SpecificationAttributes.jsx";
import SpecificationTables from "./components/specification/tables/SpecificationTables.jsx";
import AddSpecificationGroup from "./components/specification/groups/AddSpecificationGroup.jsx";
import EditSpecificationGroup from "./components/specification/groups/EditSpecificationGroup.jsx";
import AddSpecificationAttribute from "./components/specification/attributes/AddSpecificationAttributes.jsx";
import EditSpecificationAttribute from "./components/specification/attributes/EditSpecificationAttribute.jsx";
import AddSpecificationTable from "./components/specification/tables/AddSpecificationTable.jsx";
import EditSpecificationTable from "./components/specification/tables/EditSpecificationTable.jsx";
import Brand from "./components/brand/Brand.jsx";
import AddBrand from "./components/brand/AddBrand.jsx";
import EditBrand from "./components/brand/EditBrand.jsx";
import EditParent from "./components/products/category/EditParent.jsx";
import EditChild from "./components/products/category/EditChild.jsx";
import AddProduct from "./components/products/product/create/AddProduct.jsx";
import EditProduct from "./components/products/product/edit/EditProduct.jsx";
import Store from "./components/store/Store.jsx";
import AddStore from "./components/store/AddStore.jsx";
import EditStore from "./components/store/EditStore.jsx";
import ProductLabel from "./components/products/label/ProductLabel.jsx";
import AddProductLabel from "./components/products/label/AddProductLabel.jsx";
import EditProductLabel from "./components/products/label/EditProductLabel.jsx";
import AdminLayout from "./AdminLayout.jsx";
import Review from "./components/review/Review.jsx";

const AdminRoutes = {
    routes: [
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                { path: "", element: <AllProducts /> },
                {
                    path: "categories",
                    children: [
                        { path: "", element: <ProductCategories /> },
                        { path: "create", element: <AddCategory /> },
                        { path: "parentCategoryEdit/:id", element: <EditParent /> },
                        { path: "childCategoryEdit/:id", element: <EditChild /> },
                    ]
                },
                {
                    path: "products",
                    children: [
                        { path: "", element: <AllProducts /> },
                        { path: "create", element: <AddProduct /> },
                        { path: "edit/:id", element: <EditProduct /> },
                    ]
                },
                {
                    path: "all-attributes",
                    element: <Attribute />,
                },
                {
                    path: "add-attribute",
                    element: <AddAttribute />,
                },
                {
                    path: "edit-attribute/:id",
                    element: <EditAttribute />,
                },
                {
                    path: "specification-groups",
                    children: [
                        { path: "", element: <SpecificationGroups /> },
                        { path: "create", element: <AddSpecificationGroup /> },
                        { path: "edit/:id", element: <EditSpecificationGroup /> },
                    ],
                },
                {
                    path: "specification-attributes",
                    children: [
                        { path: "", element: <SpecificationAttributes /> },
                        { path: "create", element: <AddSpecificationAttribute /> },
                        { path: "edit/:id", element: <EditSpecificationAttribute /> },
                    ],
                },
                {
                    path: "specification-tables",
                    children: [
                        { path: "", element: <SpecificationTables /> },
                        { path: "create", element: <AddSpecificationTable /> },
                        { path: "edit/:id", element: <EditSpecificationTable /> },
                    ],
                },
                {
                    path: "brands",
                    children: [
                        { path: "", element: <Brand /> },
                        { path: "add", element: <AddBrand /> },
                        { path: "edit/:id", element: <EditBrand /> },
                    ]
                },
                {
                    path: "stores",
                    children: [
                        { path: "", element: <Store /> },
                        { path: "add", element: <AddStore /> },
                        { path: "edit/:id", element: <EditStore /> },
                    ]
                },
                {
                    path: "label",
                    children: [
                        { path: "", element: <ProductLabel /> },
                        { path: "add", element: <AddProductLabel /> },
                        { path: "edit/:id", element: <EditProductLabel /> },
                    ]
                },
                {
                    path: "review",
                    element: <Review />
                }
            ],
        },
    ],
}

export default AdminRoutes;
