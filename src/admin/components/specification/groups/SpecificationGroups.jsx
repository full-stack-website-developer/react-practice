import { Link, useNavigate } from "react-router-dom";
import { specificationGroupList } from "../../../../store/specification/SpecificationGroupsList";
import { useContext } from "react";
import styles from "./SpecificationGroups.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { navigateWithToaster } from "../../../../helper.js";

const SpecificationGroups = () => {
  const { deleteGroup, specGroupList  } = useContext(specificationGroupList);
  const navigate = useNavigate();

  function editGroup(groupId) {
    navigate(`edit/${groupId}`);
  }

  function removeGroup(id) {
    const result = deleteGroup(id);
    if(result.success) {
      navigateWithToaster(navigate, "/admin/specification-groups", result.message, 'danger')
    }
  }

  return (
    <>
      <h1>All Specification Groups</h1>
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
              <th scope="col">DESCRIPTION</th>
              <th scope="col">OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {specGroupList.map((group, i) => {
              return (
                <tr key={group.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td className={`${styles["icons-container"]}`}>
                    <span className={`${styles["icon-edit"]} `}>
                      <TbEdit
                        className={`${styles.icon}`}
                        onClick={() => editGroup(group.id)}
                      />
                    </span>
                    <span className={`${styles["icon-remove"]} `}>
                      <RiDeleteBin6Line
                        className={`${styles.icon} `}
                        onClick={() => removeGroup(group.id)}
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

export default SpecificationGroups;
