import { budgetItem } from "./budgetItem";

export interface Category {
  name: string;
  associatedBudgetItems: budgetItem[];
}
