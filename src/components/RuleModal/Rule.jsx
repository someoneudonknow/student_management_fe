import { Box, FormControl, Input, InputBase, InputLabel, Typography } from "@mui/material"
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput"
import { BOOLEAN, DECIMAL, NUMBER, STRING } from "../../constants/fieldType"
import QuantityInput from "../QuantityInput/QuantityInput"
import { useEffect, useState } from "react"

const RuleTextInput = ({ id, onChange, ...rest }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value)
  }

  return <Input onChange={handleChange} id={id} sx={{ flex: 1, ml: 1 }} {...rest} />
}

const RuleNumberInput = ({ id, onChange, ...rest }) => {
  const handleChange = (_, val) => {
    onChange && onChange(val)
  }

  return <QuantityInput onChange={handleChange} id={id} sx={{ ml: 1 }} {...rest} />
}

const RuleInput = ({ id, fieldType, ...rest }) => {
  if (fieldType === NUMBER) return <RuleNumberInput id={id} {...rest} />
  if (fieldType === STRING) return <RuleTextInput id={id} {...rest} />
  if (fieldType === BOOLEAN) return <RuleTextInput id={id} {...rest} />
  if (fieldType === DECIMAL) return <RuleTextInput id={id} {...rest} />

  return <InputBase disabled />
}

const Rule = ({ rule, onChange }) => {
  const [ruleVal, setRuleVal] = useState(rule)

  useEffect(() => {
    onChange && onChange(ruleVal)

    //eslint-disable-next-line
  }, [ruleVal])

  const handleChange = (value) => {
    setRuleVal((prev) => ({ ...prev, compare_value: value }))
  }

  const formatName = (name) => {
    return name
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
      .join(" ")
  }

  return (
    <Box
      p={1}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <InputLabel htmlFor={rule.id}>{formatName(rule.field)}</InputLabel>
      <span> : </span>
      <RuleInput
        value={ruleVal.compare_value}
        onChange={handleChange}
        id={rule.id}
        fieldType={rule.field_type}
      />
    </Box>
  )
}

export default Rule
