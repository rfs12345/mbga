import { possibleMonths } from "../entities/monthsConstant";
import { Dialog, List, ListItem } from "@mui/material";

const DuplicateMonthDialog = (props: any) => {
  const listOMonths = possibleMonths;
  return (
    <Dialog open={props.duplicateMonthDialogOpen}>
      <List>
        {listOMonths.map((month, index) => (
          <ListItem
            key={month + index}
            onClick={() => {
              props.handleDuplicateMonthPicked(month);
            }}
          >
            {month}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default DuplicateMonthDialog;
