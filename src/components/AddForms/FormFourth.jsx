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
  const [usefulLinks, setUsefulLinks] = useState([]);
  const initialValues = {
    topic: "",
    link: "",
    item: "",
    amount: null,
    advices: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      //console.log("Submitted values:", values);
      console.log("Submitted values:", {
        expenses,
        advices: values.advices,
        useful_links: usefulLinks,
      });
    },
  });
  const onExpenseAddBtnClick = () => {
    const { item, amount } = formik.values;
    if (item.trim() !== "" && amount.trim() !== null && amount !== "") {
      setExpenses((prevExpenses) => [...prevExpenses, { item, amount }]);

      //formik.setValues({ ...formik.values, item: "", amount: null });
      formik.setFieldValue("item", "");
      formik.setFieldValue("amount", "");
    } else {
      alert("Please enter a valid item and amount");
    }
  };
  const onLinkAddBtnClick = () => {
    console.log(formik.values);
    const { topic, link } = formik.values;
    if (topic.trim() !== "" && link.trim() !== "") {
      setUsefulLinks((prevLinks) => [...prevLinks, { topic, link }]);
      //formik.setValues({ ...formik.values, topic: "", link: "" });
      formik.setFieldValue("topic", "");
      formik.setFieldValue("link", "");
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
        <div>
          <TextField
            id="advices"
            label="Advices"
            multiline
            minRows={3}
            maxRows={6}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>
        {/* ------ Links ------- */}
        <TextField
          id="topic"
          name="topic"
          label="Topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="link"
          name="link"
          label="Link"
          value={formik.values.link}
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormFourth;
