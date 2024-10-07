import { useState } from "react";
import FormTextInput from "../FormTextInput/FormTextInput"
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const FormPasswordInput = ({ name = "password", control, label = 'Mật khẩu', rules, textFieldProps = {} }) => {
  const [showPass, setShowPass] = useState(false);

  const toggleShowPassword = () => {
    setShowPass(prev => !prev)
  }

  return (
    <FormTextInput
      name={name}
      control={control}
      rules={rules}
      textFieldProps={{
        fullWidth: true,
        label: label,
        type: showPass ? "text" : "password",
        ...textFieldProps
      }}
      startIcon={<Key />}
      endIcon={
        <IconButton onClick={toggleShowPassword}>
          {showPass ? <Visibility /> : <VisibilityOff />}
        </IconButton>}
    />
  )
}

export default FormPasswordInput
