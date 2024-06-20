import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import Icon from "../../utils/icon";
import "./index.scss";
import {
  useUserManagementStore,
  IUserManagementStore,
} from "../../store/userManagementStore";
import { getDateRange } from "../../utils/utility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getCustomFilterDate } from "../../utils/utility";

const DropDownFilter = ({ type }: any) => {
  const [date, setDate] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    setFilterDate,
    filterDate,
    getUserManagementUsers,
    searchQuery,
    limit,
    setPageNo,
  } = useUserManagementStore() as IUserManagementStore;

  const handleChange = async (event: SelectChangeEvent<typeof date>) => {
    setDate(event.target.value);
    setPageNo(1);
    if (type === "adminUser") {
      if (event.target.value !== "All" && event.target.value !== "Custom") {
        setIsCustom(false);
        const filterDate: any = getDateRange(event.target.value);
        setFilterDate(filterDate.startDate, filterDate.endDate, true);
        await getUserManagementUsers(
          1,
          limit,
          searchQuery,
          filterDate.startDate,
          filterDate.endDate,
        );
      } else if (event.target.value === "All") {
        setIsCustom(false);
        setFilterDate(filterDate.startDate, filterDate.endDate, false);
        getUserManagementUsers(
          1,
          limit,
          searchQuery,
          filterDate.startDate,
          filterDate.endDate,
        );
      } else {
        setFilterDate(filterDate.startDate, filterDate.endDate, true);
        setIsCustom(true);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function callFilterUser() {
      await getUserManagementUsers(1, limit, searchQuery, startDate, endDate);
    }
    if (filterDate?.active) {
      callFilterUser();
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="dropdown-main">
        <FormControl className="dropdown">
          <InputLabel id="demo-controlled-open-select-label">
            Select Date
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={date}
            label="This Week"
            onChange={handleChange}
            IconComponent={() => <Icon src="expandMore" />}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"This Week"}>This Week</MenuItem>
            <MenuItem value={"Last Week"}>Last Week</MenuItem>
            <MenuItem value={"Last 3 Months"}>Last 3 Months</MenuItem>
            <MenuItem value={"Custom"}>Custom</MenuItem>
          </Select>
        </FormControl>
        {isCustom && (
          <div className="custom-date-picker-container">
            <div className="start-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  onChange={(date: any) => {
                    console.log(date.$d);
                    const customDate = getCustomFilterDate(date.$d);
                    setStartDate(customDate);
                  }}
                  format="DD-MM-YYYY"
                  disableFuture
                />
              </LocalizationProvider>
            </div>
            <div className="end-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End date"
                  onChange={(date: any) => {
                    console.log(date.$d);
                    const customDate = getCustomFilterDate(date.$d);
                    setEndDate(customDate);
                  }}
                  format="DD-MM-YYYY"
                  disableFuture
                />
              </LocalizationProvider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropDownFilter;
