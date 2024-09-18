import { Box, Typography } from "@mui/material";
import RoundedButton from "../../components/UI/RoundedButton";
import Image from "../../components/UI/Image";
import loginImage from "../../assets/images/login_img.png";

const LeftPanel = ({ sx, onSignUpModeClick }) => {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 6,
        pointerEvents: "all",
        padding: "3rem 17% 2rem 12%",
        ...sx,
      }}
    >
      <Box
        component="div"
        sx={{
          pt: 5,
          transition: "transform 0.9s ease-in-out",
          transitionDelay: "0.6s",
        }}
      >
        <Typography color="white" variant="h4">
          Đã có tài khoản?
        </Typography>
        <Typography color="white" mt={1} mb={1} sx={{
          fontSize: "18px"
        }}>
          Thực hiện đăng nhập
        </Typography>
        <RoundedButton
          onClick={onSignUpModeClick}
          variant="outlined"
          sx={{ color: "white", borderColor: "white", mt: 1, px: 5, fontSize: "16px" }}
        >
          Đăng nhập
        </RoundedButton>
      </Box>
      <Image
        sx={{
          transition: "transform 1.1s ease-in-out",
          transitionDelay: "0.4s",
        }}
        src={loginImage}
      />
    </Box>
  );
};

export default LeftPanel;
