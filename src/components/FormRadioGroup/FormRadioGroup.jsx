import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";

const FormRadioGroup = ({
  name,
  control,
  rules = {},
  defaultVal,
  orientation,
  sx,
  radioOption = [],
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <RadioGroup
          {...field}
          defaultValue={defaultVal}
          row={orientation === "row"}
          sx={{ justifyContent: "space-around", ...sx }}
          {...rest}
        >
          {radioOption.map((el, idx) => (
            <FormControlLabel
              key={idx}
              label={el?.label}
              value={el?.value}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      )}
    ></Controller>
  );
};

export default FormRadioGroup;
