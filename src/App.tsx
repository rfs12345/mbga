import { Category } from "./entities/Category";
import { HashRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { create } from "zustand";
import MainPage from "./pages/MainPage";
import ExpensePage from "./pages/ExpensePage";
import Main from "electron/main";
import Layout from "./pages/Layout";
import { BudgetPage } from "./pages/BudgetPage";
import SpentPage from "./pages/SpentPage";

interface AppState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;

  years: string[];
  setYears: (years: string[]) => void;

  months: string[];
  setMonths: (months: string[]) => void;

  files: File[];
  setFiles: (files: File[]) => void;

  selectedYear: string | undefined;
  setSelectedYear: (year: string | undefined) => void;

  selectedMonth: string | undefined;
  setSelectedMonth: (month: string | undefined) => void;

  selectedFile: string | undefined;
  setSelectedFile: (file: string | undefined) => void;

  actualSelectedFile: File | undefined;
  setActualSelectedFile: (file: File) => void;

  incomeValue: number;
  setIncomeValue: (income: number) => void;

  totalIncomeAllocated: number;
  settotalIncomeAllocated: (income: number) => void;

  categoryValue: number;
  setCategoryValue: (income: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),

  years: [],
  setYears: (years: string[]) => set({ years }),

  months: [],
  setMonths: (months: string[]) => set({ months }),

  files: [],
  setFiles: (files: File[]) => set({ files }),

  selectedYear: "",
  setSelectedYear: (year: string | undefined) => set({ selectedYear: year }),

  selectedMonth: "",
  setSelectedMonth: (month: string | undefined) =>
    set({ selectedMonth: month }),

  selectedFile: undefined,
  setSelectedFile: (file: string | undefined) => set({ selectedFile: file }),

  actualSelectedFile: undefined,
  setActualSelectedFile: (file: File) => set({ actualSelectedFile: file }),

  incomeValue: 0,
  setIncomeValue: (income: number) => set({ incomeValue: income }),

  totalIncomeAllocated: 0,
  settotalIncomeAllocated: (income: number) =>
    set({ totalIncomeAllocated: income }),

  categoryValue: 0,
  setCategoryValue: (categoryValue: number) =>
    set({ categoryValue: categoryValue }),
}));

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/budget"
            element={
              <Layout>
                <BudgetPage />
              </Layout>
            }
          />
          <Route
            path="/spent"
            element={
              <Layout>
                <ExpensePage />
              </Layout>
            }
          />
          <Route
            path="/remaining"
            element={
              <Layout>
                <SpentPage />
              </Layout>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
