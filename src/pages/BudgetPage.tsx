import CategorySection from "../page_components/CategorySection";
import { useAppStore } from "../App";
import { budgetItem } from "../entities/budgetItem";
import { Category } from "../entities/Category";

import { useEffect, useState } from "react";
import { getIncomeItemIntoCorrectPosition } from "../service/parseJson";

export const BudgetPage = () => {
  const categories = useAppStore((state) => state.categories);
  const setCategories = useAppStore((state) => state.setCategories);
  const selectedMonth = useAppStore((state) => state.selectedMonth);
  const [addCategoryClicked, setAddCategoryClicked] = useState(false);
  
  useEffect(() => {
    if (categories.length > 0) {
      const hasNonZeroValues = categories.some(category => 
        category.associatedBudgetItems.some(item => 
          item.amountBudgeted !== 0 || item.amountSpent !== 0 || item.expenses.length > 0
        )
      );

      if (!hasNonZeroValues) {
        const resetCategories = categories.map(category => ({
          ...category,
          associatedBudgetItems: category.associatedBudgetItems.map(item => ({
            ...item,
            amountBudgeted: 0,
            amountSpent: 0,
            expenses: []
          }))
        }));
        setCategories(resetCategories);
      }
    }
  }, [selectedMonth]);

  useEffect(() => {
    handleTotalIncomeAllocatedProcess();
    handleTotalIncomeBudgetedProcess();
  }, [categories]);

  const handleTotalIncomeAllocatedProcess = () => {
    setTotalIncomeAllocated(handleTotalIncomeAllocated());
  };

  const [newCategoryName, setNewCategoryName] = useState("");

  const test: budgetItem = {
    name: "",
    amountBudgeted: 0,
    amountSpent: 0,
    expenses: [],
  };

  const handleTotalIncomeAllocated = () => {
    let totalIncomeAllocated = 0;
    for (let y of categories) {
      if (y.associatedBudgetItems !== undefined && y.name !== "Income") {
        for (let x of y.associatedBudgetItems) {
          totalIncomeAllocated += x.amountBudgeted;
        }
      }
    }
    return totalIncomeAllocated;
  };

  const [totalIncomeAllocated, setTotalIncomeAllocated] = useState<number>(
    handleTotalIncomeAllocated
  );

  const addListItem = (catName: string) => {
    if (categories !== undefined) {
      const categoryIndex = categories.findIndex((x) => x.name === catName);
      if (categoryIndex !== -1) {
        const updatedCategories = categories.map((category, index) => {
          if (index === categoryIndex) {
            return {
              ...category,
              associatedBudgetItems: [
                ...category.associatedBudgetItems,
                { ...test }
              ]
            };
          }
          return category;
        });
        setCategories(updatedCategories);
      }
    }
  };

  const handleTotalIncomeBudgeted = () => {
    let incomeValuee = 0;
    console.log("Herte");
    console.log(categories);
    for (let y of categories) {
      if (y.name === "Income") {
        for (let x of y.associatedBudgetItems) {
          incomeValuee += x.amountBudgeted;
        }
      }
    }
    console.log(incomeValuee);
    return incomeValuee;
  };

  const handleTotalIncomeBudgetedProcess = () => {
    setIncomeValue(handleTotalIncomeBudgeted());
  };

  const [incomeValue, setIncomeValue] = useState<number>(
    handleTotalIncomeBudgeted
  );

  function handleAddCategory() {
    const newCategory: Category = {
      name: newCategoryName,
      associatedBudgetItems: [],
    };
    newCategory.associatedBudgetItems.push(test);
    if (categories !== undefined) {
      let cat = categories;
      cat = [...cat, newCategory];
      cat.sort((a, b) => a.name.localeCompare(b.name));
      getIncomeItemIntoCorrectPosition(cat);
      setCategories(cat);
    } else {
      const newCategories = [newCategory];
      setCategories(newCategories);
    }
    setNewCategoryName("");
  }

  const getExpenseTotal = (category: Category) => {
    const categoryIndex = categories.findIndex((x) => x.name === category.name);
    if (categoryIndex === -1) return "0.00";
    let total = 0;
    for (let x of categories[categoryIndex].associatedBudgetItems) {
      for (let z of x.expenses) {
        total += z.amount;
      }
    }
    return total.toFixed(2);
  };

  const getCategoryValue = (category: Category) => {
    let categoryValue = 0;
    for (let x of category.associatedBudgetItems) {
      categoryValue += x.amountBudgeted;
    }
    return categoryValue;
  };

  return (
    <main className="container-fluid py-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {getIncomeItemIntoCorrectPosition(categories)?.map((category, index) => (
          <div key={index} className="col">
            <div className="card h-100">
              <div className="card-header" style={{ backgroundColor: '#373332', color: 'white' }}>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0 text-truncate" style={{ maxWidth: '60%' }}>{category.name}</h5>
                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                      {category.name !== "Income" && (
                        <span className="badge bg-light text-dark">
                          {getCategoryValue(category)} / {incomeValue}
                        </span>
                      )}
                      <span className="badge bg-warning text-dark">
                        Spent: {getExpenseTotal(category)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ backgroundColor: '#f5f5f0' }}>
                <CategorySection
                  index={index}
                  category={category}
                  addListItem={addListItem}
                  name={category.name}
                  associatedBudgetItems={category.associatedBudgetItems}
                  totalIncomeAllocated={totalIncomeAllocated}
                  handleTotalIncomeAllocatedProcess={handleTotalIncomeAllocatedProcess}
                  incomeValue={incomeValue}
                  handleTotalIncomeBudgetedProcess={handleTotalIncomeBudgetedProcess}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setAddCategoryClicked(true);
          }}
          data-toggle="modal"
          data-target=".myModal"
        >
          Create a category
        </button>
      </div>

      {addCategoryClicked && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddCategoryClicked(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    value={newCategoryName}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAddCategoryClicked(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleAddCategory();
                    setAddCategoryClicked(false);
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
