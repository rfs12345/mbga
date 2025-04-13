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
    <li className="list-group-item p-2">
      <div className="d-flex flex-column w-100">
        <div className="d-flex w-100 gap-2 mb-2">
          <input
            className="form-control"
            value={namee}
            onChange={(e) => {
              handleChangeInItemName(props.index, e.target.value);
            }}
            placeholder="Item name"
            style={{ fontSize: '0.9rem', width: '50%' }}
          />
          <input
            type="number"
            min="0"
            className="form-control"
            value={amountBudgetedd}
            onChange={(e) => {
              handleChangeInItemAmount(props.index, Number(e.target.value));
            }}
            placeholder="Amount"
            style={{ fontSize: '0.9rem', width: '50%' }}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">
            Spent: {findTotalAmountOfExpenses(props.index)}
          </span>
          <button
            onClick={() => {
              handleDeleteItem(props.index);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
