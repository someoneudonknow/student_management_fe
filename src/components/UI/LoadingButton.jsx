import { Box, Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ loading, children, fullWidth, wrapperSx, ...rest }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: fullWidth ? "100%" : "auto",
        ...wrapperSx
      }}
    >
      <Button disabled={loading} fullWidth={fullWidth} {...rest}>
        {children}
      </Button>
      {loading && (
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  );
};

export default LoadingButton;
