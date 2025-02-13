import { Category } from "../entities/Category";
import ListItem from "./BudgetedListItem";
import "../css/page_components/List.css";
import React from "react";
const List = (props: any) => {
  return (
    <ul className="list-group">
      {props.category.associatedBudgetItems.map(
        (listItem: any, index: number) => (
          <ListItem
            name={listItem.name}
            amountBudgeted={listItem.amountBudgeted}
            amountSpent={listItem.amountSpent}
            index={index}
            category={props.category.name}
            handleCategoryTotalBudgeted={props.handleCategoryTotalBudgeted}
            handleTotalIncomeBudgeted={props.handleTotalIncomeBudgeted}
            handleTotalIncomeAllocated={props.handleTotalIncomeAllocated}
            getExpenseTotal={props.getExpenseTotal}
          />
        )
      )}
    </ul>
  );
};

export default List;
