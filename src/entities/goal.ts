import { budgetItem } from "./budgetItem";

export interface goal {
  name: string;
  description: string;
  dateCreated: Date;
  duedate: Date;
  currentlySaved: number;
  goal: number;
  associatedBudgetItems: budgetItem[];
}
