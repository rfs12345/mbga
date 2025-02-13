import { Expense } from "./Expense";

export interface budgetItem {
  name: string;
  amountBudgeted: number;
  amountSpent: number;
  expenses: Expense[];
}
