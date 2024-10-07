import { useForm } from "react-hook-form";
import FormTextInput from "../FormTextInput/FormTextInput";
import { IconButton, Typography } from "@mui/material";
import LoadingButton from "../UI/LoadingButton";
import { AccountCircle, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import FormWrapper from "./FormWrapper";
import { useState } from "react";
import { useUser } from "../../contexts/UserProvider/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import FormPasswordInput from "../FormPasswordInput/FormPasswordInput";

const LoginForm = ({ sx }) => {
  const { control, handleSubmit } = useForm();
  const { login, isLoading } = useUser()

  const handleLogin = async ({ username, password }) => {
    const data = {
      identifier: username,
      password
    }

    await login(data)
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
        Đăng nhập
      </Typography>
      <FormTextInput
        name="username"
        control={control}
        rules={{
          required: "Vui lòng nhập tên đăng nhập",
        }}
        textFieldProps={{
          sx: { mt: 1 },
          label: "Tên đăng nhập",
          fullWidth: true,
        }}
        startIcon={<AccountCircle />}
      />
      <FormPasswordInput
        control={control}
        name="password"
        rules={{
          required: "Vui lòng nhập mật khẩu",
          minLength: {
            value: 6,
            message: "Mật khẩu tối thiểu 6 kí tự"
          }
        }}
        textFieldProps={{
          sx: { mt: 3 }
        }}
      />
      <Typography
        variant="body2"
        component="p"
        textAlign="left"
        width="100%"
        mt={2}
      >
        <Link to="/auth/forgot-password">Quên mật khẩu?</Link>
      </Typography>
      <LoadingButton
        loading={isLoading}
        wrapperSx={{ mt: "80px", py: 1.5 }}
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
