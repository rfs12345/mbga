import { useRef, useState } from "react";
import { useAppStore } from "../App";
import CategorySection from "../page_components/CategorySection";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { budgetItem } from "../entities/budgetItem";
import { Expense } from "../entities/Expense";

const ExpensePage = () => {
  const categories = useAppStore((state) => state.categories);
  const setCategories = useAppStore((state) => state.setCategories);
  const [selectedValue, setSelectedValue] = useState<budgetItem | null>();
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const options = categories
    .filter((category) => category.name !== "Income")
    .flatMap((category) =>
      category.associatedBudgetItems
        .filter((item) => item.name !== "")
        .map((item) => ({
          label: item.name!,
          actualItem: item,
        }))
    );

  const handleAddExpense = (event: any) => {
    const newExpense: Expense = {
      name: expenseName,
      amount: expenseAmount,
    };
    event.preventDefault();
    const newCategories = categories;
    newCategories.map((category) => {
      category.associatedBudgetItems.map((item) => {
        if (item.name === selectedValue?.name) {
          item.expenses.push(newExpense);
        }
      });
    });
    console.log("booms!");
    setSelectedValue(null);
    setExpenseAmount(0);
    setExpenseName("");
    setCategories(newCategories);
    console.log("Element ? ", document.getElementById("autocomplete"));
    inputRef.current !== null ? inputRef.current.focus() : null;
  };

  return (
    <>
      <main style={{ flex: 1, padding: "1rem", background: "#efefec" }}>
        <div>
          <Autocomplete
            disablePortal
            autoComplete
            autoSelect
            value={
              selectedValue
                ? { label: selectedValue?.name, actualItem: selectedValue }
                : null
            }
            autoHighlight
            onChange={(event, newValue) => {
              if (newValue) {
                setSelectedValue(newValue.actualItem);
              }
            }}
            id=""
            options={options}
            sx={{ width: 200, m: "5px" }}
            renderInput={(params) => (
              <TextField {...params} label="items" inputRef={inputRef} />
            )}
          />
          <input
            type="number"
            step=".01"
            min={"0"}
            value={expenseAmount}
            style={{ margin: "5px" }}
            onChange={(e) => {
              setExpenseAmount(Number(e.target.value));
            }}
          ></input>
          <input
            value={expenseName}
            style={{ margin: "5px" }}
            onChange={(e) => {
              setExpenseName(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            style={{ margin: "5px" }}
            onClick={(event) => {
              handleAddExpense(event);
            }}
            onSubmit={(event) => {
              handleAddExpense(event);
            }}
          >
            Add Expense
          </button>
        </div>
        {categories?.map((category, index) => (
          <div key={index}>
            <h4>
              {category.name}
              {" : "}
            </h4>
            <ul>
              {category.associatedBudgetItems.map((budgetItem, index) => (
                <li key={index}>
                  {budgetItem.name} :
                  {budgetItem.expenses.map((expense, index) => (
                    <label key={index}>
                      {" "}
                      {expense.name} {" : "} {expense.amount} {" | "}
                    </label>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
};

export default ExpensePage;
