import { Category } from "../entities/Category";
import { useAppStore } from "../App";
import { budgetItem } from "@/entities/budgetItem";

const SpentPage = () => {
  const categories = useAppStore((state) => state.categories);
  const getAllExpenses = () => {
    let total = 0;
    for (let x of categories) {
      for (let y of x.associatedBudgetItems) {
        for (let z of y.expenses) {
          total += z.amount;
        }
      }
    }
    return total;
  };

  const getExpenseTotalBudgetItem = (budgetItem: budgetItem) => {
    let total = 0;
    for (let x of budgetItem.expenses) {
      total += x.amount;
    }
    return Number(total.toFixed(2));
  };
  const getExpenseTotalCategory = (category: Category): number => {
    const categoryIndex = categories.findIndex((x) => x.name === category.name);

    let total = 0;
    for (let x of categories[categoryIndex].associatedBudgetItems) {
      for (let z of x.expenses) {
        total += z.amount;
      }
    }
    return Number(total.toFixed(2));
  };
  const getBudgetedTotalCategory = (category: Category): number => {
    const categoryIndex = categories.findIndex((x) => x.name === category.name);

    let total = 0;
    for (let x of categories[categoryIndex].associatedBudgetItems) {
      total = total + x.amountBudgeted;
    }

    return Number(total.toFixed(2));
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4  g-4">
      {categories.map((category, index) => (
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {category.name === "Income" ? (
                  getBudgetedTotalCategory(category) - getAllExpenses() >= 0 ? (
                    <a style={{ background: "Green", color: "white" }}>
                      {category.name + " "}
                      {(
                        getBudgetedTotalCategory(category) - getAllExpenses()
                      ).toFixed(2)}
                    </a>
                  ) : (
                    <a style={{ background: "Red", color: "white" }}>
                      {category.name + " "}
                      {(
                        getBudgetedTotalCategory(category) - getAllExpenses()
                      ).toFixed(2)}
                    </a>
                  )
                ) : getBudgetedTotalCategory(category) -
                    getExpenseTotalCategory(category) >=
                  0 ? (
                  <a style={{ background: "Green", color: "white" }}>
                    {category.name + " "}

                    {(
                      getBudgetedTotalCategory(category) -
                      getExpenseTotalCategory(category)
                    ).toFixed(2)}
                  </a>
                ) : (
                  <a style={{ background: "Red", color: "white" }}>
                    {category.name + " "}

                    {(
                      getBudgetedTotalCategory(category) -
                      getExpenseTotalCategory(category)
                    ).toFixed(2)}
                  </a>
                )}
              </h5>
              <h6 className="card-subtitle">
                {category.name === "Income"
                  ? getBudgetedTotalCategory(category).toFixed(2) +
                    " - " +
                    getAllExpenses().toFixed(2)
                  : getBudgetedTotalCategory(category).toFixed(2) +
                    " - " +
                    getExpenseTotalCategory(category).toFixed(2)}
              </h6>
              <ul>
                {category.associatedBudgetItems.map((budgetItem, index) => (
                  <li key={budgetItem.name + index}>
                    <u>
                      <strong>{budgetItem.name} </strong>
                    </u>
                    <br />
                    &ensp;Budgeted: {budgetItem.amountBudgeted} <br />
                    &ensp;Spent: {"     "}
                    {getExpenseTotalBudgetItem(budgetItem).toFixed(2)} <br />
                    &ensp;Left Over:{" "}
                    {budgetItem.amountBudgeted -
                      getExpenseTotalBudgetItem(budgetItem) >=
                    0 ? (
                      <a style={{ background: "Green", color: "white" }}>
                        {(
                          budgetItem.amountBudgeted -
                          getExpenseTotalBudgetItem(budgetItem)
                        ).toFixed(2)}
                      </a>
                    ) : (
                      <a style={{ background: "Red", color: "white" }}>
                        {(
                          budgetItem.amountBudgeted -
                          getExpenseTotalBudgetItem(budgetItem)
                        ).toFixed(2)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpentPage;
