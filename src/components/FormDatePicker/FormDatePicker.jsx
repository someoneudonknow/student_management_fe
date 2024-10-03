import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Controller } from "react-hook-form";

const FormDatePicker = ({
  name,
  control,
  rules = {},
  label,
  defaultValue,
  slotProps = {},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={moment(defaultValue)}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          onChange={(val) => {
            field.onChange(val);
          }}
          value={field.value}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
            },
            ...slotProps,
          }}
        />
      )}
    ></Controller>
  );
};

export default FormDatePicker;
