import { Box, Paper, useScrollTrigger, useTheme } from "@mui/material";
import SignUpForm from "../../components/AuthForm/SignUpForm";
import LoginForm from "../../components/AuthForm/LoginForm";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useState } from "react";
import authViewBg from "../../assets/images/auth_view_bg.jpg";

export const authFormMode = {
  LOGIN: "login",
  SIGN_UP: "sign_up",
};

const Auth = () => {
  const theme = useTheme();
  const [mode, setMode] = useState(authFormMode.LOGIN);

  const handleLoginModeClicked = () => {
    setMode(authFormMode.LOGIN);
  };

  const handleSignUpModeClicked = () => {
    setMode(authFormMode.SIGN_UP);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#white",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: "''",
          position: "absolute",
          height: "200vw",
          width: "200vw",
          top: "-50%",
          right: "48%",
          transform: "translateY(-50%)",
          backgroundImage: "linear-gradient(-45deg, #4481eb 0%, #04befe 100%)",
          transition: "1.8s ease-in-out",
          borderRadius: "50%",
          zIndex: 6,
          ...(mode === authFormMode.LOGIN && {
            transform: "translate(100%, -50%)",
            right: "52%",
          }),
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            width: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            display: "grid",
            gridTemplateColumns: "1fr",
            left: mode === authFormMode.LOGIN ? "25%" : "75%",
            top: "50%",
            transition: "1s 0.7s ease-in-out",
            zIndex: 5,
          }}
        >
          <LoginForm
            sx={{
              ...(mode === authFormMode.LOGIN && { opacity: 1, zIndex: 2 }),
            }}
          />
          <SignUpForm
            sx={{
              ...(mode === authFormMode.LOGIN && { opacity: 0, zIndex: 1 }),
            }}
          />
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          width: "100%",
          height: "100%",
        }}
      >
        <LeftPanel
          onSignUpModeClick={handleLoginModeClicked}
          sx={{
            "& > div, img": {
              transform:
                mode === authFormMode.LOGIN
                  ? "translateX(-800px)"
                  : "translateX(0%)",
            },
            pointerEvents: mode === authFormMode.LOGIN ? "none" : "all",
          }}
        />
        <RightPanel
          onLoginModeClick={handleSignUpModeClicked}
          sx={{
            "& > div, img": {
              transform:
                mode === authFormMode.LOGIN
                  ? "translateX(0%)"
                  : "translateX(800px)",
            },
            pointerEvents: mode === authFormMode.LOGIN ? "all" : "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default Auth;
