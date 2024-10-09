import { FormControl, FormHelperText } from "@mui/material"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { Controller } from "react-hook-form"

const FormFileInput = ({ control, name = "file-input", rules = {}, onChange, ...rest }, ref) => {
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    click: () => {
      inputRef.current?.click()
    }
  }))

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={
        ({ field, fieldState: { error } }) =>
          <FormControl error={!!error}>
            <input
              ref={inputRef}
              type="file"
              onChange={(val) => {
                field.onChange(val)
                onChange && onChange(val)
              }}
              value={field.value}
              {...rest}
            />
            {!!error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
      }
    />
  )
}

export default forwardRef(FormFileInput)
