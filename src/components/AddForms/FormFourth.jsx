import { useFormik } from "formik";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FormFourth = () => {
  const [expenses, setExpenses] = useState([]);
  const initialValues = {
    item: "",
    amount: null,
    advices: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      //console.log("Submitted values:", values);
      console.log("Submitted values:", { expenses, advices: values.advices });
    },
  });
  const onExpenseAddBtnClick = () => {
    console.log(formik.values);
    const { item, amount } = formik.values;
    if (item.trim() !== "" && amount.trim() !== null && amount !== "") {
      setExpenses((prevExpenses) => [...prevExpenses, { item, amount }]);
      formik.setValues({ ...formik.values, item: "", amount: null });
    } else {
      alert("Empty Fields");
    }
  };
  const handleRemove = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="item"
          name="item"
          label="Expense Item"
          value={formik.values.item}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="amount"
          name="amount"
          label="Amount"
          value={formik.values.amount !== null ? formik.values.amount : ""}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onExpenseAddBtnClick}
        >
          Add
        </Button>
        <div>
          <TextField
            id="advices"
            label="Advices"
            multiline
            maxRows={4}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      {expenses.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Добавленные расходы:</Typography>
          <List>
            {expenses.map((expense, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={expense.item}
                  secondary={`Amount: ${expense.amount}`}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
};

export default FormFourth;
