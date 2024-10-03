import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./global/global.css";
import ThemeProvider from "./contexts/ThemeProvider/ThemeProvider.jsx";
import UserProvider from "./contexts/UserProvider/UserProvider.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <UserProvider>
            <App />
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>
);
