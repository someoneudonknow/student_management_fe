import { useForm } from "react-hook-form";
import FormTextInput from "../FormTextInput/FormTextInput";
import { Typography } from "@mui/material";
import LoadingButton from "../UI/LoadingButton";
import { AccountCircle } from "@mui/icons-material";
import FormWrapper from "./FormWrapper";

const SignUpForm = ({ sx }) => {
  const { control, handleSubmit } = useForm();

  const handleSignUp = async (values) => {
    console.log(values);
  };

  return (
    <FormWrapper
      sx={{ zIndex: 2, ...sx }}
      component="form"
      onSubmit={handleSubmit(handleSignUp)}
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
        Sign Up
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
      <LoadingButton
        sx={{ mt: "80px", py: 1.5 }}
        type="submit"
        variant="contained"
        fullWidth
      >
        Đăng ký
      </LoadingButton>
    </FormWrapper>
  );
};

export default SignUpForm;
