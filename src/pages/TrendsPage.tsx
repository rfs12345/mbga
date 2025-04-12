import { useAppStore } from "../App";
import { Expense } from "../entities/Expense";
import { possibleMonths } from "../entities/monthsConstant";
import { parseJsonForCategories } from "../service/parseJson";
import { Button } from "@mui/material";
import { useState } from "react";

interface appearancesAndValues {
  appearances: number;
  totalCost: number;
}
const TrendsPage = () => {
  const [displayListByName, setDisplayListByName] = useState(false);
  const selectedFile = useAppStore((state) => state.selectedFile);
  const getAllExpensesForCurrentYear = (): Map<string, Expense[]> => {
    const arrayOfExpenses: Map<string, Expense[]> = new Map();
    for (let x of possibleMonths) {
      if (selectedFile) {
        const categories = parseJsonForCategories(selectedFile, x);
        for (let y of categories) {
          for (let z of y.associatedBudgetItems) {
            arrayOfExpenses.set(x + z.name, z.expenses);
          }
        }
      }
    }
    console.log(arrayOfExpenses);
    return arrayOfExpenses;
  };

  function splitOnFirstSpace(input: string): string {
    const index = input.indexOf(" ");
    if (index === -1) return input; // No space found, return the whole string as the first part
    return input.substring(index + 1);
  }
  const getTrendForName = (mapOfExpenses: Map<string, Expense[]>) => {
    let nameTrends: string[] = [];
    let popularity: Map<string, appearancesAndValues> = new Map();
    mapOfExpenses.forEach((expensesForThatMonth, key) => {
      if (expensesForThatMonth) {
        for (let z of expensesForThatMonth) {
          const realName = splitOnFirstSpace(z.name).toLowerCase();
          if (nameTrends.find((x) => x.toLowerCase() === realName)) {
            if (popularity.get(realName)) {
              let temp = popularity.get(realName);
              if (temp?.appearances) {
                temp.appearances = temp.appearances += 1;
                temp.totalCost = temp.totalCost += z.amount;
                popularity.set(realName, temp);
              }
            }
          } else if (
            nameTrends.find((x) => x.toLowerCase().indexOf(realName) !== -1)
          ) {
            if (popularity.get(realName)) {
              let temp = popularity.get(realName);
              if (temp?.appearances) {
                temp.appearances = temp.appearances += 1;
                temp.totalCost = temp.totalCost += z.amount;
                popularity.set(realName, temp);
              }
            }
          } else if (
            nameTrends.find((x) => realName.indexOf(x.toLowerCase()) !== -1)
          ) {
            if (popularity.get(realName)) {
              let temp = popularity.get(realName);
              if (temp?.appearances) {
                temp.appearances = temp.appearances += 1;
                temp.totalCost = temp.totalCost += z.amount;
                popularity.set(realName, temp);
              }
            }
          } else {
            let temp: appearancesAndValues = {
              appearances: 1,
              totalCost: z.amount,
            };
            popularity.set(realName, temp);
            nameTrends.push(realName);
          }
        }
      }
    });

    return popularity;
  };

  const trendsThroughMonthForCurrentYear = (sortBy: string) => {
    const mapOfExpenses = getAllExpensesForCurrentYear();
    let priceTrends: Map<string, any> = new Map();
    let nameTrends: Map<string, any> = getTrendForName(mapOfExpenses);
    let sortedNameTrends: Map<string, any>;
    if (sortBy === "occurences") {
      sortedNameTrends = new Map(
        Array.from(nameTrends.entries()).sort(
          (a, b) => b[1].appearances - a[1].appearances
        )
      );
    } else {
      sortedNameTrends = new Map(
        Array.from(nameTrends.entries()).sort(
          (a, b) => b[1].totalCost - a[1].totalCost
        )
      );
    }

    return sortedNameTrends;
  };
  const [sortedNameTrends, setSortedNameTrends] = useState<Map<string, any>>(
    () => {
      return trendsThroughMonthForCurrentYear("occurences");
    }
  );

  const getTrendForPrice = () => {};

  const handleClickForTrendsButton = (sortBy: string) => {
    setSortedNameTrends(trendsThroughMonthForCurrentYear(sortBy));
    setDisplayListByName(true);
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          handleClickForTrendsButton("occurences");
        }}
      >
        Click for trends by name!
      </Button>
      {displayListByName ? (
        <ol>
          {Array.from(sortedNameTrends).map(([key, value]) => (
            <li>
              <u>{key}</u>
              <br />
              Occurences: {value.appearances}
              <br />
              TotalCost: {value.totalCost}
            </li>
          ))}
        </ol>
      ) : null}
      <Button
        variant="contained"
        onClick={() => {
          handleClickForTrendsButton("cost");
        }}
      >
        Sort by Cost!
      </Button>
    </>
  );
};
export default TrendsPage;
