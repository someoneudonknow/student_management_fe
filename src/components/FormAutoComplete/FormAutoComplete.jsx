import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormAutoComplete = ({
  name,
  disabled = false,
  control,
  rules = {},
  options,
  label = "label",
  displayLabel,
  handleSetState,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options || []}
          disabled={disabled}
          getOptionLabel={(option) => option[label]}
          onChange={(e, val) => {
            handleSetState(e, val);
            field.onChange(val);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={displayLabel}
              error={!!error}
              helperText={error?.message}
            />
          )}
        ></Autocomplete>
      )}
    />
  );
};

export default FormAutoComplete;
