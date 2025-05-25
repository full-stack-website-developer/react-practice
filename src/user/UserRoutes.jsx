import AllProducts from "./pages/allProducts/AllProducts";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Store from "./pages/store/Store";
import Tag from "./pages/tag/Tag";
import UserLayout from "./UserLayout";

const UserRoutes = {
    routes: [
        {
            path: "/",
            element: <UserLayout />,
            children: [
                { path: "", element: <Home /> },
                { path: "/product/:permalink/:id", element: <Product /> },
                { path: "/AllProducts", element: <AllProducts /> },
                { path: "/tag/:tag", element: <Tag /> },
                { path: "/Store/:id", element: <Store /> },
            ]
        }
    ]
}

export default UserRoutes