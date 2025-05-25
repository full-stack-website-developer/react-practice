import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { attributeList } from "../../../../store/AttributeList";
import styles from "./Attributes.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";

const Attribute = () => {
  const { deleteAttribute, attributes } = useContext(attributeList);
  const navigate = useNavigate();

  function deleteAttr(attributeId) {

    const result = deleteAttribute(attributeId);

    if(result.success) {
      navigate('/admin/all-attributes', {
        state: {
          toastMessage: result.message,
          toastType: 'danger'
        }
      })
    }
  }

  function editAttribute(attributeId) {
    navigate(`/admin/edit-attribute/${attributeId}`);
  }
  return (
    <>
      <h1>Product Attributes</h1>
      <div className="d-grid gap-2 d-md-flex m-2 ">
        <div className="d-flex w-50 justify-content-end">
          <Link to={"/admin/add-attribute"} className="text-white text-decoration-none">
            <button className="btn btn-success align-center">Create</button>
          </Link>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Values</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
    
            {attributes.map((attribute, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{attribute.name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target={`#${attribute.id}`}
                    >
                      View Values
                    </button>

                    <div
                      className="modal fade"
                      id={attribute.id}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="fs-5 text-danger" id="exampleModalLabel">
                              Below are {attribute.name} attribute values :
                            </h1>
                          </div>
                          <div className="modal-body">
                            {attribute.values.map((value, i) => {
                              return (
                                  <span className={`${styles["value-modal"]}`} key={i}>
                                    {i + 1}) {value}
                                  </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`${styles["icons-container"]}`}>
                    <span className={`${styles["icon-edit"]} `}>
                      <TbEdit
                        className={`${styles.icon}`}
                        onClick={() => editAttribute(attribute.id)}
                      />
                    </span>
                    <span className={`${styles["icon-remove"]} `}>
                      <RiDeleteBin6Line
                        className={`${styles.icon} `}
                        onClick={() => deleteAttr(attribute.id)}
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
  );
};

export default Attribute;
