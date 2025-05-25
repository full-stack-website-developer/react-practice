import { useField, useFormikContext } from "formik";
import styles from "./css/Quantity.module.scss";

const Quantity = ({ name }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFieldValue(name, value ? parseInt(value) : 0);
  };

  const increment = () => setFieldValue(name, (field.value || 0) + 1);
  const decrement = () => setFieldValue(name, Math.max(0, (field.value || 0) - 1));

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={decrement}
        >
          -
        </button>
        <input
          className={styles.input}
          type="text"
          defaultValue={1}
          value={field.value}
          onChange={handleChange}
        />
        <button
          type="button"
          className={styles.btn}
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
