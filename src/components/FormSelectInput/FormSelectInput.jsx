import {
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

const FormTextInput = ({
  name,
  control,
  defaultValue,
  rules = {},
  options = [],
  label = "",
  inputProps = {
    formControl: {},
    select: {},
    menuItem: {},
  },
}) => {
  return (
    <FormControl fullWidth {...inputProps.formControl}>
      <InputLabel id={`input-label-${name}`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ""}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            fullWidth
            error={!!error}
            value={value}
            onChange={onChange}
            {...inputProps.select}
          >
            {options.map((option, index) => (
              <MenuItem
                key={`menu-item-${name}-${option?.key}-${index}`}
                value={option.value}
                {...inputProps.menuItem}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default FormTextInput;
