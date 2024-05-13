/* eslint-disable react/prop-types */

import truncateUrl from "../../services/truncateUrl";
import styles from "./Forms.module.css";
import {
  TextField,
 
  Box,

  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";

const FormFourth = ({
  formik,
  saveData,
  setExpenses,
  expenses,
  usefulLinks,
  setUsefulLinks,
}) => {
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
          sx={{ marginBottom: "1.5rem" }}
          id="data4.item"
          name="data4.item"
          label="Expense Item"
          value={formik.values.data4.item}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
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

        <div className={styles.buttonsAddWrp}>
         
          <ButtonsTemplate
            size="medium"
            variant="contained"
            onClick={onExpenseAddBtnClick}
            disabled={!formik.values.data4.item}
          >
            Add
          </ButtonsTemplate>
        </div>

        {expenses.length > 0 && (
          <Box>
            <p className={styles.subTitle}>Added Expenses</p>
            <ul>
              {expenses.map((expense, index) => (
                <li key={index} className={styles.formInfoItem}>
                  <div className={styles.tripText}>
                    <span className={styles.tripBoldText}>
                      {expense.item}:&nbsp;
                    </span>
                    <span>{expense.amount}</span>
                  </div>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(index, "expense")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
               
              ))}
            </ul>
          </Box>
        )}

        {/* ------ Links ------- */}
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data4.topic"
          name="data4.topic"
          label="Topic"
          value={formik.values.data4.topic}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data4.link"
          name="data4.link"
          label="Link"
          value={formik.values.data4.link}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
        />

        <div className={styles.buttonsAddWrp}>
          <ButtonsTemplate
            size="medium"
            variant="contained"
            onClick={onLinkAddBtnClick}
            disabled={!formik.values.data4.topic}
          >
            Add
          </ButtonsTemplate>
        </div>

        {usefulLinks.length > 0 && (
          <Box>
            <p className={styles.subTitle}>Added Links</p>
            <ul>
              {usefulLinks.map((link, index) => (
                <li key={index} className={styles.formInfoItem}>
                  <div>
                    <div className={styles.tripText}>
                      <span className={styles.tripBoldText}>
                        {link.topic}&nbsp;
                      </span>
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.tripText}
                      >
                        {truncateUrl(link.link)}
                      </a>
                    </div>
                  </div>
                 
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(index, "link")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          </Box>
        )}
        {/* ------ end Links ------- */}
        <div>
          <TextField
            sx={{ marginBottom: "1.5rem" }}
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
          <ButtonsTemplate type="submit" size="large">
            Finish now?
          </ButtonsTemplate>
        </div>
        <ButtonsTemplate
          // type="submit"
          size="large"
          onClick={() => saveData(formik.values.data4)}
        >
          Continue
        </ButtonsTemplate>
      </form>
    </div>
  );
};

export default FormFourth;
