import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormTextInput = ({
  name,
  control,
  defaultValue = "",
  rules = {},
  textFieldProps = {},
  startIcon,
  endIcon,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { error },
      }) => (
        <TextField
          onBlur={onBlur}
          inputRef={ref}
          onChange={onChange}
          value={value}
          error={!!error}
          helperText={error?.message}
          slotProps={{
            input: {
              ...(startIcon && {
                startAdornment: (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
              }),
              ...(endIcon && {
                endAdornment: (
                  <InputAdornment position="end">{endIcon}</InputAdornment>
                ),
              }),
            },
          }}
          {...textFieldProps}
        />
      )}
    />
  );
};

export default FormTextInput;
