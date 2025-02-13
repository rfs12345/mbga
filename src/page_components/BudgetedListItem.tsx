import React from "react";
import { useAppStore } from "../App";
import "../css/page_components/BudgetedListItem.css";
import { useState } from "react";

const ListItem = (props: any) => {
  const [namee, setName] = useState(props.name);
  const [amountBudgetedd, setAmountBudgeted] = useState(props.amountBudgeted);
  const setCategories = useAppStore((state) => state.setCategories);
  const categories = useAppStore((state) => state.categories);
  const handleChangeInItemName = (index: number, newName: string) => {
    const indexx = categories.findIndex((x) => {
      return x.name === props.category;
    });
    categories[indexx].associatedBudgetItems[index].name = newName;
    setCategories(categories);
    setName(newName);
  };

  const handleChangeInItemAmount = (index: number, newAmount: number) => {
    const indexx = categories.findIndex((x) => {
      return x.name === props.category;
    });
    categories[indexx].associatedBudgetItems[index].amountBudgeted = newAmount;
    setCategories(categories);
    setAmountBudgeted(newAmount);
    props.handleCategoryTotalBudgeted();
    props.handleTotalIncomeAllocated();
    props.category === "Income" ? props.handleTotalIncomeBudgeted() : null;
  };

  const handleDeleteItem = (index: number) => {
    const categoryIndex = categories.findIndex(
      (x) => x.name === props.category
    );
    if (categoryIndex !== -1) {
      const updatedCategories = [...categories];
      const updatedBudgetItems = [
        ...updatedCategories[categoryIndex].associatedBudgetItems,
      ];
      updatedBudgetItems.splice(index, 1);
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        associatedBudgetItems: updatedBudgetItems,
      };
      setCategories(updatedCategories);
      props.handleCategoryTotalBudgeted();
      props.handleTotalIncomeAllocated();
      props.category === "Income" ? props.handleTotalIncomeBudgeted() : null;
    }
  };

  const findTotalAmountOfExpenses = (index: number) => {
    let amount = 0;
    const indexx = categories.findIndex((x) => {
      return x.name === props.category;
    });
    for (let x of categories[indexx].associatedBudgetItems[index].expenses) {
      amount += x.amount;
    }
    return amount.toFixed(2);
  };

  return (
    <li
      className="list-group-item"
      key={props.index}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px", // Space between elements
      }}
    >
      <a id="budgeted_item_name" style={{ flex: 1 }}>
        <input
          value={namee}
          onChange={(e) => {
            handleChangeInItemName(props.index, e.target.value);
          }}
          style={{ width: "100%" }} // Input takes up available space
        />
      </a>
      <a id="budgeted_item_amount" style={{ flex: 1 }}>
        <input
          type="number"
          min={"0"}
          value={amountBudgetedd}
          onChange={(e) => {
            handleChangeInItemAmount(props.index, Number(e.target.value));
          }}
          style={{ width: "100%" }} // Input takes up available space
        />
      </a>
      <button
        onClick={() => {
          handleDeleteItem(props.index);
        }}
        className="btn"
        style={{
          marginLeft: "10px", // Space between inputs and button
          background: "#df5d09",
          color: "white",
        }}
      >
        Delete Item
      </button>

      <span
        className="badge badge-pill badge-warning"
        style={{ color: "black", background: "grey", marginLeft: "50px" }}
      >
        {findTotalAmountOfExpenses(props.index)}
      </span>
    </li>
  );
};

export default ListItem;
