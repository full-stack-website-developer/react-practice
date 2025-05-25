import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { specificationAttributeList } from "../../../../store/specification/SpecificationAttributeList";
import styles from "./SpecificationAttributes.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { navigateWithToaster } from "../../../../helper";

const SpecificationAttributes = () => {
  const navigate = useNavigate();
  const { deleteAttribute, specAttributes, fieldTypeOptions } = useContext(specificationAttributeList);

  function editAttribute(id) {
    navigate(`edit/${id}`);
  }

  function remove(id) {
    const result = deleteAttribute(id);
    navigateWithToaster(navigate, '/specification-attributes', result.message, 'danger')
  }

  return (
    <>
      <h1>All Specification Attributes</h1>
      <div className="d-grid gap-2 d-md-flex m-2 ">
        <div className="d-flex w-50 justify-content-end">
          <Link to={"create"} className="text-white text-decoration-none">
            <button className="btn btn-success align-center">Create</button>
          </Link>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">FIELD TYPE</th>
              <th scope="col">OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {specAttributes.map((attribute, i) => {

              const selectedFieldTypes  = fieldTypeOptions.filter((fieldTypeOption) => {
                if(fieldTypeOption.id == attribute.fieldType) {
                    return fieldTypeOption;
                }
              })

              const [selectedFieldType] = selectedFieldTypes;

              return (
                <tr key={attribute.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{attribute.name}</td>
                  <td>{selectedFieldType.value}</td>
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
                        onClick={() =>
                          remove(attribute.id)
                        }
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

export default SpecificationAttributes;
