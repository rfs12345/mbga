import { useAppStore } from "../App";
import { Category } from "../entities/Category";

export const parseJsonForCategories = (
  file: string | ArrayBuffer,
  month: string
): Array<Category> => {
  const json = JSON.parse(file.toString());
  console.log(json);
  console.log(month);
  if (
    json.months[month] !== undefined &&
    json.months[month].categories !== undefined
  ) {
    let categories = json.months[month].categories;
    categories = categories.sort((a: Category, b: Category) =>
      a.name.localeCompare(b.name)
    );
    return getIncomeItemIntoCorrectPosition(categories);
  } else {
    return [];
  }
};

export const getIncomeItemIntoCorrectPosition = (categories: Category[]) => {
  const incomeItem = categories.find((category) => {
    return category.name === "Income";
  });
  let newCategories = categories.filter((x) => x.name !== "Income");
  if (incomeItem !== undefined) {
    newCategories.splice(0, 0, incomeItem);
    return newCategories;
  } else {
    console.log("Categories: ", categories);

    return categories;
  }
};

const parseJsonForGoals = (file: string | ArrayBuffer) => {
  const json = JSON.parse(file.toString());
};

export const parseJsonForSelectedYear = (file: string | ArrayBuffer) => {
  const json = JSON.parse(file.toString());

  if (json.selected === true) {
    return json.year;
  } else {
    return false;
  }
};

export const parseJsonForYear = (file: string | ArrayBuffer) => {
  const json = JSON.parse(file.toString());
  return json.year;
};

export const parseJsonForAccounts = (file: string | ArrayBuffer) => {
  const json = JSON.parse(file.toString());
  if (json.accounts !== undefined) {
    console.log("Accounts: ", json.accounts);
    return json.accounts;
  } else {
    return [];
  }
};

export const parseJsonForMonth = (file: string | ArrayBuffer) => {
  const json = JSON.parse(file.toString());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (var x of months) {
    if (json.months[x].selected === true) {
      return x;
    }
  }
};

export const findMonths = (file: string | ArrayBuffer) => {
  const json = JSON.parse(file.toString());
  const tempMonthArray = [];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (var x of months) {
    if (json.months[x] !== undefined) {
      tempMonthArray.push(x);
    }
  }
  return tempMonthArray;
};

export const addMonth = (file: string | ArrayBuffer, month: string) => {
  const json = JSON.parse(file.toString());
  if (
    json.months[month].categories.length === 0 ||
    json.months[month].categories === undefined
  ) {
    json.months[month] = month;
    json.months[month] = { categories: "" };
  }
  return JSON.stringify(json);
};

export const changeSelectedMonth = (
  file: string | ArrayBuffer,
  month: string,
  newMonth: string
) => {
  const json = JSON.parse(file.toString());
  json.months[month].selected = false;
  json.months[newMonth].selected = true;
  console.log("changinging selected moneth!");
  return JSON.stringify(json);
};

export const copyMonthsCategories = (
  file: string | ArrayBuffer,
  currentMonth: string,
  newMonth: string
) => {
  const json = JSON.parse(file.toString());
  const oldMonthsCategories = parseJsonForCategories(file, currentMonth);
  for (let x of oldMonthsCategories) {
    x.associatedBudgetItems.length = 0;
  }
  json.months[newMonth] = newMonth;
  json.months[currentMonth].selected = false;
  json.months[newMonth] = { selected: true, categories: [] };
  json.months[newMonth].categories = oldMonthsCategories;

  console.log("Check below!");
  console.log(json.months[newMonth]);
  console.log(json.months[currentMonth]);
  return JSON.stringify(json);
};
