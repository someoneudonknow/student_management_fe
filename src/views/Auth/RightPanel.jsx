import { Box, Typography } from "@mui/material";
import RoundedButton from "../../components/UI/RoundedButton";
import signUpImage from "../../assets/images/sign_up_img.png";
import Image from "../../components/UI/Image";

const RightPanel = ({ sx, onLoginModeClick }) => {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 6,
        pointerEvents: "all",
        padding: "3rem 12% 2rem 17%",
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
          Chưa có tài khoản?
        </Typography>
        <Typography variant="body1" sx={{
          fontSize: "18px"
        }} color="white" mt={1} mb={1}>
          Nhấn vào nút đăng ký để thực hiện đăng kí tài khoản
        </Typography>
        <RoundedButton
          onClick={onLoginModeClick}
          variant="outlined"
          sx={{ color: "white", borderColor: "white", mt: 1, px: 5, fontSize: "16px" }}
        >
          Đăng ký
        </RoundedButton>
      </Box>
      <Image
        sx={{
          transition: "transform 1.1s ease-in-out",
          transitionDelay: "0.4s",
        }}
        src={signUpImage}
      />
    </Box>
  );
};

export default RightPanel;
