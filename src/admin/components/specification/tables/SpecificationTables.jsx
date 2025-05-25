import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { specificationTableList } from "../../../../store/specification/SpecificationTableList";
import styles from "./SpecificationTables.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { navigateWithToaster } from "../../../../helper";

const SpecificationTables = () => {
  const { deleteTable, tableList } = useContext(specificationTableList);
  const navigate = useNavigate();

  function update(id) {
    navigate(`edit/${id}`);
  }

  function remove(id) {
    const result = deleteTable(id);
    if(result) {
      navigateWithToaster(navigate, '/admin/specification-tables', result.message, 'danger')
    }
  }

  return (
    <>
      <h1>All Specification Tables</h1>
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
              <th scope="col">ASSIGNED GROUPS</th>
              <th scope="col">OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((table, i) => {
              return (
                <tr key={table.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{table.name}</td>
                  <td>{table.description}</td>
                  <td>{table.selectedGroups.length}</td>
                  <td className={`${styles["icons-container"]}`}>
                    <span className={`${styles["icon-edit"]} `}>
                      <TbEdit
                        className={`${styles.icon}`}
                        onClick={() => update(table.id)}
                      />
                    </span>
                    <span className={`${styles["icon-remove"]} `}>
                      <RiDeleteBin6Line
                        className={`${styles.icon} `}
                        onClick={() => remove(table.id)}
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

export default SpecificationTables;
