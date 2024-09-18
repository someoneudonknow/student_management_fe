import { createTheme } from "@mui/material";
console.log("init");
const defaultLight = createTheme({
  palette: {
    mode: "light",
  },
});

const defaultDark = createTheme({
  palette: {
    mode: "dark",
  },
});

export const defaultTheme = {
  dark: {
    palette: {
      ...defaultDark.palette,
    },
  },
  light: {
    palette: {
      ...defaultLight.palette,
    },
  },
};
