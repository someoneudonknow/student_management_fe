import { Outlet } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "../../contexts/ThemeProvider/ThemeProvider";
import UserProvider from "../../contexts/UserProvider/UserProvider";

const AppRoot = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} >
      <ThemeProvider>
        <SnackbarProvider
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <UserProvider>
            <Outlet />
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider >
  );
};

export default AppRoot;
