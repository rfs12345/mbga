import "../css/page_organization_css/ThreeOptionHeader.css";
import { useAppStore } from "../App";
import { readFile } from "../service/parseFolders";
import {
  addMonth,
  changeSelectedMonth,
  copyMonthsCategories,
  findMonths,
  parseJsonForCategories,
  parseJsonForMonth,
  parseJsonForSelectedYear,
} from "../service/parseJson";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { possibleMonths } from "../entities/monthsConstant";
import DuplicateMonthDialog from "../page_components/DuplicateMonthDialog";

function ThreeOptionHeader() {
  const arrayOMonths = possibleMonths;
  const years = useAppStore((state) => state.years);
  const selectedFile = useAppStore((state) => state.selectedFile);
  const setSelectedFile = useAppStore((state) => state.setSelectedFile);
  const setCategories = useAppStore((state) => state.setCategories);
  const setSelectedMonth = useAppStore((state) => state.setSelectedMonth);
  const setSelectedYear = useAppStore((state) => state.setSelectedYear);
  const files = useAppStore((state) => state.files);
  const navigate = useNavigate();
  const actualSelectedFile = useAppStore((state) => state.actualSelectedFile);
  const categories = useAppStore((state) => state.categories);
  const [duplicateMonthDialogOpen, setDuplicateMonthDialogOpen] =
    useState(false);
  const selectedMonth = useAppStore((state) => state.selectedMonth);

  const handleGoBack = () => {
    navigate("/");
  };
  const findCorrectFile = (year: string) => {
    for (let file of files) {
      const fileJson = readFile(file);
      const selectedYear = parseJsonForSelectedYear(fileJson.toString());
      if (selectedYear === year) {
        setSelectedFile(fileJson);
      }
      return fileJson;
    }
  };

  const handleYearChange = (year: string) => {
    const fileJson = findCorrectFile(year);
    if (fileJson !== undefined) {
      const newMonth = parseJsonForMonth(fileJson);
      if (newMonth !== undefined) {
        setSelectedMonth(newMonth);
        setSelectedYear(year);
        setCategories(parseJsonForCategories(fileJson, newMonth));
      }
    }
  };

  const handleMonthsChange = (month: string) => {
    if (selectedFile && actualSelectedFile && selectedMonth) {
      let newFile = selectedFile;
      setSelectedMonth(month);
      setCategories(parseJsonForCategories(selectedFile, month));
      newFile = addMonth(newFile, month);
      setSelectedFile(newFile);
      newFile = changeSelectedMonth(newFile, selectedMonth, month);
      setSelectedFile(newFile);
    }
  };
  const handleSave = async (filePath: string, fileContent: string) => {
    if (selectedMonth) {
      const realFileContent = JSON.parse(fileContent);
      console.log(realFileContent);
      realFileContent.months[selectedMonth].categories = categories;

      const stringified = JSON.stringify(realFileContent, null, 2);
      console.log(categories);
      const result = await window.electronAPI.saveFileProgrammatically(
        filePath,
        stringified
      );
      if (result.success) {
        console.log("File saved successfully at:", result.filePath);
      } else {
        console.error("Failed to save file:", result.message);
      }
    }
  };
  const handleBudgetNavigate = () => {
    navigate("/budget");
  };

  const handleSpentNavigate = () => {
    navigate("/spent");
  };
  const handleRemainingNavigate = () => {
    navigate("/remaining");
  };

  const handleDuplicateMonth = () => {
    setDuplicateMonthDialogOpen(true);
  };

  const handleDuplicateMonthPicked = (month: any) => {
    setDuplicateMonthDialogOpen(false);
    if (selectedFile && selectedMonth && actualSelectedFile) {
      const newFile = copyMonthsCategories(selectedFile, selectedMonth, month);
      setSelectedFile(newFile);
      setTimeout(() => {
        setSelectedMonth(month);
        setCategories(parseJsonForCategories(newFile, month));
        // changeSelectedMonth(selectedFile, selectedMonth, month);
      }, 100);
    }
  };

  return (
    <>
      <header className="three_option_header">
        <div
          className="dropdown"
          style={{ float: "left", justifyContent: "left" }}
        >
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ background: "#d5dc76", margin: "3px" }}
          >
            Edit Selected Year
          </button>
          <ul className="dropdown-menu">
            {years.map((year, index) => (
              <li key={year + index}>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    handleYearChange(year);
                  }}
                >
                  {year}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="dropdown"
          style={{ float: "left", justifyContent: "left" }}
        >
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ background: "#d5dc76", margin: "3px" }}
          >
            {selectedMonth}
          </button>
          <ul className="dropdown-menu">
            {selectedFile
              ? arrayOMonths.map((month, index) => (
                  <li key={month + index}>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        handleMonthsChange(month);
                      }}
                    >
                      {month}
                    </a>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <span style={{ justifyContent: "center", width: "400px" }}>
          <button
            id="budgeted_button"
            className="btn btn-primary"
            onClick={() => {
              handleBudgetNavigate();
            }}
          >
            Budgeted
          </button>
          <button
            id="spent_button"
            className="btn btn-secondary"
            onClick={() => {
              handleSpentNavigate();
            }}
          >
            Spent
          </button>

          <button
            id="left_over_button"
            className="btn btn-success"
            onClick={() => {
              handleRemainingNavigate();
            }}
          >
            Remaining
          </button>
          {selectedFile ? (
            <button
              className="btn btn-primary"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                if (
                  selectedFile &&
                  actualSelectedFile &&
                  actualSelectedFile?.webkitRelativePath
                ) {
                  handleSave(
                    actualSelectedFile?.webkitRelativePath,
                    selectedFile
                  );
                }
              }}
            >
              Save
            </button>
          ) : null}

          <button
            className="btn btn-warning"
            style={{ marginLeft: "5px" }}
            onClick={(event) => {
              handleDuplicateMonth();
            }}
          >
            Duplicate current month.
          </button>
          {DuplicateMonthDialog({
            handleDuplicateMonthPicked,
            duplicateMonthDialogOpen,
            setDuplicateMonthDialogOpen,
          })}
        </span>
        <button
          onClick={handleGoBack}
          className="btn"
          style={{
            color: "white",
            float: "right",
            background: "#d5dc76",
            margin: "3px",
          }}
        >
          Go Back
        </button>
      </header>
    </>
  );
}

export default ThreeOptionHeader;
