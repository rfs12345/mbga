import { act, useState } from "react";
import ThreeOptionHeader from "../page_organization/ThreeOptionHeader";
import { Category } from "../entities/Category";
import SectionHeader from "../page_organization/SectionHeaders";
import List from "../page_components/List";
import { budgetItem } from "../entities/budgetItem";
import { useAppStore } from "../App";
import React from "react";
import { Link, Route, Router, Routes, useLocation } from "react-router";
import HomePage from "./HomePage";
import { BudgetPage } from "./BudgetPage";
import ExpensePage from "./ExpensePage";

function MainPage() {
  const [addCategoryClicked, setAddCategoryClicked] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  //const selectedFile = useAppStore((state) => state.selectedFile);
  const setCategories = useAppStore((state) => state.setCategories);

  const selectedFile = useAppStore((state) => state.selectedFile);
  const actualSelectedFile = useAppStore((state) => state.actualSelectedFile);

  const location = useLocation(); // Get the current location (path)

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header at the top */}
      <header
        style={{ width: "100%", backgroundColor: "#373332", padding: "1rem" }}
      >
        {ThreeOptionHeader()}
      </header>

      {/* Main content area */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar on the left */}

        {/* Main content on the right */}
        <main
          style={{ flex: 1, padding: "1rem", background: "#efefec" }}
        ></main>
      </div>
    </div>
  );
}

export default MainPage;
