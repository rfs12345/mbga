import { useEffect, useState } from "react";
import { useAppStore } from "../App";
import SectionHeader from "../page_organization/SectionHeaders";
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
    console.log(categoryValue);
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

  const getExpenseTotal = (category: Category) => {
    const categoryIndex = categories.findIndex((x) => x.name === category.name);

    if (categoryIndex === -1) return;
    let total = 0;
    for (let x of categories[categoryIndex].associatedBudgetItems) {
      for (let z of x.expenses) {
        total += z.amount;
      }
    }
    return total.toFixed(2);
  };
  useEffect(() => {
    handleCategoryTotalBudgetedProcess();
  }, [categories]);

  return (
    <>
      <SectionHeader
        name={props.name}
        category={props.category}
        index={props.index}
        addListItem={props.addListItem}
        handleDeleteCategory={handleDeleteCategory}
        totalIncomeAllocated={props.totalIncomeAllocated}
        categoryValue={categoryValue}
        incomeValue={props.incomeValue}
        getExpenseTotal={getExpenseTotal}
      />

      <div>
        <List
          name={props.name}
          associatedBudgetItems={props.associatedBudgetItems}
          category={props.category}
          handleCategoryTotalBudgeted={handleCategoryTotalBudgetedProcess}
          handleTotalIncomeBudgeted={props.handleTotalIncomeBudgetedProcess}
          handleTotalIncomeAllocated={props.handleTotalIncomeAllocatedProcess}
        />
      </div>
    </>
  );
};

export default CategorySection;
