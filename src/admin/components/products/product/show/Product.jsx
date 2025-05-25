import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productList } from "../../../../../store/ProductList";
import styles from "./Product.module.scss"
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { storeList } from "../../../../../store/store/StoreList";

const AllProducts = () => {
  const { products, removeProduct } = useContext(productList)
  const { stores } = useContext(storeList)

  const navigate = useNavigate();

  function editProduct(id) {
    navigate(`edit/${id}`);
  }

  function getProductStore(id) {
    const relatedStores = stores.filter(store => parseInt(store.id) === parseInt(id))
    const [ relatedStore ] = relatedStores;

    if(relatedStore) {
      return relatedStore.name;
    }
    return null
  }

  return (
    <>
      <h1>All Products</h1>
      <div className="d-grid gap-2 d-md-flex m-2 ">
        <div className="d-flex w-100 justify-content-end">
          <Link to={"create"} className="text-white text-decoration-none">
            <button className="btn btn-success align-center">Create</button>
          </Link>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex">
            <table className="table w-100">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">IMAGE</th>
                  <th scope="col">PRODUCTS</th>
                  <th scope="col">STOCK STATUS</th>
                  <th scope="col">SKU</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">STORE</th>
                  <th scope="col">OPERATIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => {
                  const store = getProductStore(product.store);


                  return (
                    <tr key={product.id}>
                      <td className="align-middle">{product.id  || "N/A"}</td>
                      <td className="align-middle">
                        <img src={product.featuredImage || "N/A"} alt="Image Not Found" className={`${styles.img}`}/>
                      </td>
                      <td className="align-middle">{product.name || "N/A"}</td>

                      <td className={`${product.stock === "In Stock" ? "text-success" : (product.stock === "Out of Stock" ? "text-danger" : null)} align-middle`}>{product.stock || "N/A"}</td>
                      <td className="align-middle">{product.sku || "N/A"}</td>
                      <td className="align-middle">
                        <span className={`${product.status === "published" ? "bg-success" : (product.status === "draft" ? "bg-info" : "bg-warning")} p-1 rounded text-white`}>
                          {product.status || "N/A"}
                        </span>
                      </td>
                      <td className="align-middle">{store || "N/A"}</td>
                      
                      <td className={`${styles["icons-container"]} align-middle`}>
                        <span className={`${styles["icon-edit"]} `}>
                          <TbEdit
                            className={`${styles.icon}`}
                            onClick={() => editProduct(product.id)}
                          />
                        </span>
                        <span className={`${styles["icon-remove"]} `}>
                          <RiDeleteBin6Line
                            className={`${styles.icon} `}
                            onClick={() => removeProduct(product.id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      </div>
    </>
  )
  
};

export default AllProducts;
