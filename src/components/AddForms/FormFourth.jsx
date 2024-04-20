import { useFormik } from "formik";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

const FormFourth = () => {
  const [expenses, setExpenses] = useState([]);
  const initialValues = {
    topik: "",
    link: "",
    advice: "",
    expenses: [{ item: "", amount: "" }],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  const handleAddExpense = () => {
    const item = formik.values.expenses[formik.values.expenses.length - 1].item;
    const amount =
      formik.values.expenses[formik.values.expenses.length - 1].amount;

    console.log("item", item);
    if (item.trim() !== "" && amount.trim() !== "") {
      formik.setValues({
        ...formik.values,
        expenses: [...formik.values.expenses, { item: "", amount: "" }],
      });
    } else {
      alert("Empty Fields");
    }
  };
  const handleRemoveExpense = (index) => {
    const updatedExpenses = [...formik.values.expenses];
    updatedExpenses.splice(index, 1);
    formik.setValues({ ...formik.values, expenses: updatedExpenses });
  };
  // const onSubmit = (values, { resetForm }) => {
  //   if (values.item.trim() !== "" && values.amount.trim() !== "") {
  //     setExpenses((prevExpenses) => [...prevExpenses, values]);
  //     resetForm();
  //   }
  // };
  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.expenses.map((expense, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <TextField
            name={`expenses[${index}].item`}
            label="Expense Item"
            value={formik.values.expenses[index].item}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            name={`expenses[${index}].amount`}
            label="Amount"
            value={formik.values.expenses[index].amount}
            onChange={formik.handleChange}
            fullWidth
          />
          {index > 0 && (
            <Button
              type="button"
              onClick={() => handleRemoveExpense(index)}
              style={{ marginTop: "0.5rem" }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button type="button" onClick={handleAddExpense}>
        Add Expense
      </Button>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormFourth;
