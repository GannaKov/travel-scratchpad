/* eslint-disable react/prop-types */
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

const FormFourth = ({
  formik,
  saveData,
  setExpenses,
  expenses,
  usefulLinks,
  setUsefulLinks,
}) => {
  //const [expenses, setExpenses] = useState([]);
  //const [usefulLinks, setUsefulLinks] = useState([]);
  // console.log("formik.values.data4", formik.values.data4);
  // const initialValues = {
  //   topic: "",
  //   link: "",
  //   item: "",
  //   amount: null,
  //   advices: "",
  // };
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     console.log("Submitted values:", {
  //       expenses,
  //       advices: values.advices,
  //       useful_links: usefulLinks,
  //     });
  //   },
  // });
  const onExpenseAddBtnClick = () => {
    const { item, amount } = formik.values.data4;
    if (item.trim() !== "" && amount.trim() !== null && amount !== "") {
      setExpenses((prevExpenses) => [...prevExpenses, { item, amount }]);
      formik.setFieldValue("data4.item", "");
      formik.setFieldValue("data4.amount", "");
    } else {
      alert("Please enter a valid item and amount");
    }
  };
  const onLinkAddBtnClick = () => {
    console.log(formik.values);
    const { topic, link } = formik.values.data4;
    if (topic.trim() !== "" && link.trim() !== "") {
      setUsefulLinks((prevLinks) => [...prevLinks, { topic, link }]);
      formik.setFieldValue("data4.topic", "");
      formik.setFieldValue("data4.link", "");
    } else {
      alert("Please enter a valid topic and link");
    }
  };
  const handleRemove = (index, subject) => {
    if (subject === "expense") {
      setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
    }
    if (subject === "link") {
      setUsefulLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="data4.item"
          name="data4.item"
          label="Expense Item"
          value={formik.values.data4.item}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="data4.amount"
          name="data4.amount"
          label="Amount"
          value={
            formik.values.data4.amount !== null
              ? formik.values.data4.amount
              : ""
          }
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
        {expenses.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6">Added Expenses</Typography>
            <List>
              {expenses.map((expense, index) => (
                <ListItem key={index}>
                  <ListItemText
                    sx={{ display: "flex", gap: "1rem" }}
                    primary={`${expense.item} :  ${expense.amount}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(index, "expense")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* ------ Links ------- */}
        <TextField
          id="data4.topic"
          name="data4.topic"
          label="Topic"
          value={formik.values.data4.topic}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="data4.link"
          name="data4.link"
          label="Link"
          value={formik.values.data4.link}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onLinkAddBtnClick}
        >
          Add
        </Button>
        {usefulLinks.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6">Added Links</Typography>
            <List>
              {usefulLinks.map((link, index) => (
                <ListItem key={index}>
                  <ListItemText
                    sx={{ display: "flex", gap: "1rem" }}
                    primary={`${link.topic} :  ${link.link}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(index, "link")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {/* ------ end Links ------- */}
        <div>
          <TextField
            id="data4.advices"
            label="Advices"
            value={formik.values.data4.advices}
            multiline
            minRows={3}
            maxRows={6}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>
        <div>
          <Button type="submit">Finish now?</Button>
        </div>
        <Button type="submit" onClick={() => saveData(formik.values.data4)}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default FormFourth;
