import CategorySection from "../page_components/CategorySection";
import { useAppStore } from "../App";
import { budgetItem } from "../entities/budgetItem";
import { Category } from "../entities/Category";
import List from "../page_components/List";
import SectionHeader from "../page_organization/SectionHeaders";
import { useEffect, useState } from "react";
import { getIncomeItemIntoCorrectPosition } from "../service/parseJson";

export const BudgetPage = () => {
  const categories = useAppStore((state) => state.categories);
  const setCategories = useAppStore((state) => state.setCategories);
  const selectedMonth = useAppStore((state) => state.selectedMonth);
  const [addCategoryClicked, setAddCategoryClicked] = useState(false);
  
  // Add effect to handle month changes
  useEffect(() => {
    // Reset categories when month changes
    if (categories.length > 0) {
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
  }, [selectedMonth]);

  const handleTotalIncomeAllocatedProcess = () => {
    setTotalIncomeAllocated(handleTotalIncomeAllocated());
    console.log(totalIncomeAllocated);
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
    //console.log(categories);
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

  useEffect(() => {
    handleTotalIncomeAllocatedProcess();
    handleTotalIncomeBudgetedProcess();
  }, [categories]);
  return (
    <main style={{ flex: 1, padding: "1rem", background: "#efefec" }}>
      {getIncomeItemIntoCorrectPosition(categories)?.map((category, index) => (
        <div key={index}>
          <CategorySection
            index={index}
            category={category}
            addListItem={addListItem}
            name={category.name}
            associatedBudgetItems={category.associatedBudgetItems}
            totalIncomeAllocated={totalIncomeAllocated}
            handleTotalIncomeAllocatedProcess={
              handleTotalIncomeAllocatedProcess
            }
            incomeValue={incomeValue}
            handleTotalIncomeBudgetedProcess={handleTotalIncomeBudgetedProcess}
          />
        </div>
      ))}

      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          setAddCategoryClicked(true);
        }}
        data-toggle="modal"
        data-target=".myModal"
        style={{ marginTop: "10px", flex: 1, marginLeft: "10px" }}
      >
        Create a category
      </button>

      {addCategoryClicked ? (
        <div className="myModal" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label>Category Name: </label>
                <input
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                  }}
                  value={newCategoryName}
                ></input>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
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
      ) : null}
    </main>
  );
};
