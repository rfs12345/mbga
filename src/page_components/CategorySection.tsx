import { useEffect, useState } from "react";
import { useAppStore } from "../App";
import List from "./List";
import { Category } from "../entities/Category";
import { getIncomeItemIntoCorrectPosition } from "../service/parseJson";

const CategorySection = (props: any) => {
  const categories = useAppStore((state) => state.categories);
  const setCategories = useAppStore((state) => state.setCategories);

  const handleCategoryTotalBudgeted = () => {
    let categoryValue = 0;
    const budgetItems = categories.find((x) => {
      return x.name === props.name;
    });

    if (budgetItems !== undefined) {
      for (let x of budgetItems.associatedBudgetItems) {
        categoryValue += x.amountBudgeted;
      }
    }
    return categoryValue;
  };

  const handleCategoryTotalBudgetedProcess = () => {
    setCategoryValue(handleCategoryTotalBudgeted());
  };

  const [categoryValue, setCategoryValue] = useState<number>(
    handleCategoryTotalBudgeted
  );

  const handleDeleteCategory = (category: Category, index: number) => {
    const categoryIndex = categories.findIndex((x) => x.name === category.name);
    if (categoryIndex !== -1) {
      let updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      updatedCategories = getIncomeItemIntoCorrectPosition(updatedCategories);
      setCategories(updatedCategories);
    }
  };

  useEffect(() => {
    handleCategoryTotalBudgetedProcess();
  }, [categories]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="mb-2">
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => props.addListItem(props.name)}
        >
          Add Item
        </button>
        <button
          onClick={() => {
            props.handleDeleteCategory(props.category, props.index);
          }}
          className="btn btn-danger btn-sm ms-2"
        >
          Delete Category
        </button>
      </div>
      <div className="flex-grow-1">
        <List
          name={props.name}
          associatedBudgetItems={props.associatedBudgetItems}
          category={props.category}
          handleCategoryTotalBudgeted={handleCategoryTotalBudgetedProcess}
          handleTotalIncomeBudgeted={props.handleTotalIncomeBudgetedProcess}
          handleTotalIncomeAllocated={props.handleTotalIncomeAllocatedProcess}
        />
      </div>
    </div>
  );
};

export default CategorySection;
