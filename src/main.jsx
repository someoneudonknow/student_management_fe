import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./global/global.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "./contexts/ThemeProvider/ThemeProvider";
import UserProvider from "./contexts/UserProvider/UserProvider";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment} >
        <ThemeProvider>
          <SnackbarProvider
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <UserProvider>
              <App />
            </UserProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider >
    </BrowserRouter>
  </StrictMode>
);
