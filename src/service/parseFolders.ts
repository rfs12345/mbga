import {
  parseJsonForAccounts,
  parseJsonForCategories,
  parseJsonForMonth,
  parseJsonForSelectedYear,
  parseJsonForYear,
} from "./parseJson";

// export const parseSystemForYears = (files: any) => {
//   const arrOfYears = [];
//   for (let x of files) {
//     const year = parsePathForFolderYear(x.webkitRelativePath);
//     arrOfYears.push(year);
//   }
//   return arrOfYears;
// };

const parsePathForFolderYear = (webkitRelativePath: any) => {
  const string = webkitRelativePath as string;
  return string.split("/")[1];
};

export async function parseFileForSelected(
  event: any,
  handleSelectedYearChange: any,
  handleSelectedFileChange: any,
  handleSelectedMonthChange: any,
  handleCategoriesChange: any,
  handleFilesChange: any,
  handleYearsChange: any,
  handleActualFileChange: any,
  handleSetMonths: any,
  handleAccountsChange: any
) {
  new Promise<boolean>((resolve, reject) => {
    for (const file of event.target.files) {
      if (file && !(file.name as string).includes("Goal")) {
        const reader = new FileReader();
        console.log(file);
        reader.readAsText(file, "UTF-8");
        reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
          if (readerEvent?.target?.result) {
            handleFilesChange(file);
            const year = parseJsonForYear(readerEvent?.target?.result);
            const selectedYear = parseJsonForSelectedYear(
              readerEvent.target.result.toString()
            );
            handleActualFileChange(file);
            console.log(selectedYear);
            handleYearsChange(year);
            if (selectedYear) {
              handleAccountsChange(parseJsonForAccounts(readerEvent.target.result.toString()));
              handleSelectedYearChange(selectedYear);
              handleSelectedFileChange(readerEvent.target.result.toString());
              handleSetMonths(readerEvent.target.result.toString());
              let selectedMonth = parseJsonForMonth(
                readerEvent.target.result.toString()
              );
              handleSelectedMonthChange(selectedMonth);
              if (!selectedMonth) selectedMonth = "";
              handleCategoriesChange(
                parseJsonForCategories(
                  readerEvent.target.result.toString(),
                  selectedMonth
                )
              );
            }
          }
        };
      }
    }
  }).then((value) => {
    return value;
  });
}

export function readFile(file: File): string {
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
    if (readerEvent?.target?.result) {
      return readerEvent?.target?.result;
    } else {
      return "";
    }
  };
  return "";
}
