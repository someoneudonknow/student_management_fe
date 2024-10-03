import { useForm } from "react-hook-form";
import FormTextInput from "../FormTextInput/FormTextInput";
import { IconButton, Typography } from "@mui/material";
import LoadingButton from "../UI/LoadingButton";
import { AccountCircle, AlternateEmail, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import FormWrapper from "./FormWrapper";
import { useState } from "react";
import { notEmailRegex } from "../../constants/regex";
import { useUser } from "../../contexts/UserProvider/UserProvider";

const SignUpForm = ({ sx }) => {
  const { control, handleSubmit, watch } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const { isLoading, signUp } = useUser()
  const password = watch("password")

  const handleSignUp = async (values) => {
    const data = {
      userName: values.username,
      password: values.password,
      email: values.email
    }

    await signUp(data)
  };

  const toggleShowPassword = () => {
    setShowPass(prev => !prev)
  }

  const toggleShowPasswordConfirm = () => {
    setShowPassConfirm(prev => !prev)
  }

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
        Đăng ký
      </Typography>
      <FormTextInput
        name="username"
        control={control}
        rules={{
          required: "Vui lòng nhập tên đăng nhập",
          maxLength: {
            value: 50,
            message: "Tên đăng nhập không được vượt quá 50 kí tự"
          }
        }}
        textFieldProps={{
          sx: { mt: 1 },
          label: "Tên đăng nhập",
          fullWidth: true,
        }}
        startIcon={<AccountCircle />}
      />
      <FormTextInput
        name="email"
        control={control}
        rules={{
          required: "Vui lòng nhập email",
          pattern: {
            value: notEmailRegex,
            message: "Địa chỉ email không hợp lệ"
          }
        }}
        textFieldProps={{
          sx: { mt: 1 },
          label: "Email",
          fullWidth: true,
        }}
        startIcon={<AlternateEmail />}
      />
      <FormTextInput
        name="password"
        control={control}
        rules={{
          required: "Vui lòng nhập mật khẩu",
          minLength: {
            value: 6,
            message: "Mật khẩu tối thiểu 6 kí tự"
          }
        }}
        textFieldProps={{
          sx: { mt: 3 },
          fullWidth: true,
          label: "Mật khẩu",
          type: showPass ? "text" : "password"
        }}
        startIcon={<Key />}
        endIcon={
          <IconButton onClick={toggleShowPassword}>
            {showPass ? <Visibility /> : <VisibilityOff />}
          </IconButton>}
      />
      <FormTextInput
        name="password-confirm"
        control={control}
        rules={{
          required: "Vui lòng xác nhập mật khẩu",
          minLength: {
            value: 6,
            message: "Mật khẩu tối thiểu 6 kí tự"
          },
          validate: {
            isEqualPass: value => value === password || "Mật khẩu xác nhận không trùng khớp"
          }
        }}
        textFieldProps={{
          sx: { mt: 3 },
          fullWidth: true,
          label: "Xác nhận mật khẩu",
          type: showPassConfirm ? "text" : "password"
        }}
        startIcon={<Key />}
        endIcon={
          <IconButton onClick={toggleShowPasswordConfirm}>
            {showPassConfirm ? <Visibility /> : <VisibilityOff />}
          </IconButton>}
      />
      <LoadingButton
        loading={isLoading}
        wrapperSx={{ mt: "80px" }}
        sx={{ py: 1.5 }}
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
