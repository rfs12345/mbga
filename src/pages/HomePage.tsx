import { parseFileForSelected } from "../service/parseFolders";
import { Category } from "../entities/Category";
import { useAppStore } from "../App";
import { useNavigate } from "react-router";
import React from "react";
import { Account } from "@/entities/Account";

const HomePage = () => {
  const navigate = useNavigate();
  const setSelectedFile = useAppStore((state) => state.setSelectedFile);
  const setCategories = useAppStore((state) => state.setCategories);
  const setSelectedMonth = useAppStore((state) => state.setSelectedMonth);
  const setSelectedYear = useAppStore((state) => state.setSelectedYear);
  const setActualSelectedFile = useAppStore(
    (state) => state.setActualSelectedFile
  );
  const setAccounts = useAppStore((state) => state.setAccounts);

  const actualSelectedFile = useAppStore((state) => state.actualSelectedFile);
  const selectedFile = useAppStore((state) => state.selectedFile);
  const selectedYear = useAppStore((state) => state.selectedYear);
  const selectedMonth = useAppStore((state) => state.selectedMonth);
  const setMonths = useAppStore((state) => state.setMonths);
  const setYears = useAppStore((state) => state.setYears);
  const setFiles = useAppStore((state) => state.setFiles);
  const years = useAppStore((state) => state.years);
  const files = useAppStore((state) => state.files);
  const accounts = useAppStore((state) => state.accounts);

  const handleYearChange = (year: string) => {
    setYears([...years, year]);
  };

  const handleFilesChange = (file: File) => {
    setFiles([...files, file]);
  };

  const handleSelectedFileChange = (file: string) => {
    setSelectedFile(file);
  };

  const handleSelectedMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const handleSelectedYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleCategoryChange = (categories: Category[]) => {
    setCategories(categories);
  };

  const handleActualSelectedFileChange = (file: File) => {
    setActualSelectedFile(file);
  };

  const handleSetMonths = (months: string[]) => {
    setMonths(months);
  };

  const handleAccountsChange = (accounts: Account[]) => {
    setAccounts(accounts);
  };

  const handleFileChange = async (event: any) => {
    const selectedFile = await parseFileForSelected(
      event,
      handleSelectedYearChange,
      handleSelectedFileChange,
      handleSelectedMonthChange,
      handleCategoryChange,
      handleFilesChange,
      handleYearChange,
      handleActualSelectedFileChange,
      handleSetMonths,
      handleAccountsChange
    ).then(() => {
      setTimeout(() => {
        handleFileUploaded();
      }, 100);
    });
  };

  const handleFileUploaded = () => {
    navigate("/budget");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh", // Ensures full viewport height for proper centering
      }}
    >
      <header style={{ marginBottom: "20px", textAlign: "center" }}>
        <h3>Select your MBGA File Structure</h3>
      </header>
      <div style={{ textAlign: "center" }}>
        {/* File input */}
        <input
          type="file"
          webkitdirectory=""
          directory=""
          multiple={true}
          onChange={handleFileChange}
          style={{ marginBottom: "20px" }} // Adds space below the input
        />
      </div>
    </div>
  );
};

export default HomePage;
