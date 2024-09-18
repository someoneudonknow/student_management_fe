import { Box, styled } from "@mui/material";

const FormWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0rem 10rem",
  transition: "all 0.2s 0.7s",
  overflow: "hidden",
  gridColumn: "1 / 2",
  gridRow: "1 / 2",
});

export default FormWrapper;
