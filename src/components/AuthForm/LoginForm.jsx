import { useForm } from "react-hook-form";
import FormTextInput from "../FormTextInput/FormTextInput";
import { Link, Typography } from "@mui/material";
import LoadingButton from "../UI/LoadingButton";
import { AccountCircle } from "@mui/icons-material";
import FormWrapper from "./FormWrapper";

const LoginForm = ({ sx }) => {
  const { control, handleSubmit } = useForm();

  const handleLogin = async (values) => {
    console.log(values);
  };

  return (
    <FormWrapper
      sx={{ zIndex: 1, opacity: 0, ...sx }}
      component="form"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: (theme) => theme.palette.primary.main,
          mb: 5,
        }}
        variant="h4"
      >
        Login
      </Typography>
      <FormTextInput
        name="username"
        control={control}
        rules={{
          required: "Please enter your username",
        }}
        textFieldProps={{
          sx: { mt: 1 },
          label: "Username",
          fullWidth: true,
        }}
        startIcon={<AccountCircle />}
      />
      <FormTextInput
        name="password"
        control={control}
        rules={{
          required: "Please enter your username",
        }}
        textFieldProps={{
          sx: { mt: 3 },
          fullWidth: true,
          label: "Password",
        }}
        startIcon={<AccountCircle />}
      />
      <Typography
        variant="body2"
        component="p"
        textAlign="left"
        width="100%"
        mt={2}
      >
        <Link>Quên mật khẩu?</Link>
      </Typography>

      <LoadingButton
        sx={{ mt: "80px", py: 1.5 }}
        type="submit"
        variant="contained"
        fullWidth
      >
        Đăng nhập
      </LoadingButton>
    </FormWrapper>
  );
};

export default LoginForm;
