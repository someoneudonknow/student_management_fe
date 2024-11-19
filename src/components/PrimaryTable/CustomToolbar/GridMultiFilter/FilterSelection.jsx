import { Close } from "@mui/icons-material"
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useEffect, useId, useMemo, useState } from "react"

const groupConditions = [
  {
    text: "Và",
    value: "and",
  },
  {
    text: "Hoặc",
    value: "or",
  },
]

const FilterSelection = ({ columns, operators, onSelectionChange, noGroupConditions = true }) => {
  const [selection, setSelection] = useState({
    field: columns[0].field,
    value: "",
    operator: operators[0].value,
    ...(!noGroupConditions && { groupCondition: groupConditions[0].value }),
  })

  const filterableCols = useMemo(
    () => columns.map((c) => ({ text: c.headerName, value: c.field })),
    [columns],
  )

  useEffect(() => {
    onSelectionChange && onSelectionChange(selection)
    // eslint-disable-next-line
  }, [selection])

  const handleColumnSelectionChanged = (e) => {
    const value = e.target.value
    setSelection((prev) => ({ ...prev, field: value }))
  }

  const handleOperatorSelectionChanged = (e) => {
    const value = e.target.value
    setSelection((prev) => ({ ...prev, operator: value }))
  }

  const handleGroupConditionChanged = (e) => {
    const value = e.target.value
    setSelection((prev) => ({ ...prev, groupCondition: value }))
  }

  const handleValueChanged = (e) => {
    const value = e.target.value
    setSelection((prev) => ({ ...prev, value }))
  }

  return (
    <Box sx={{ width: "600px", gap: 1, display: "flex", justifyContent: "center" }} spacing={1}>
      {!noGroupConditions && (
        <Box width="100%" sx={{ display: "flex", alignItems: "end" }}>
          <IconButton size="small">
            <Close />
          </IconButton>
          <FilterSelectionItem
            onSelectionChange={handleGroupConditionChanged}
            defaultValue={groupConditions[0].value}
            menuItems={groupConditions}
          />
        </Box>
      )}
      <FilterSelectionItem
        defaultValue={filterableCols[0].value}
        label="Cột"
        menuItems={filterableCols}
        onSelectionChange={handleColumnSelectionChanged}
      />
      <FilterSelectionItem
        defaultValue={operators[0].value}
        label="Toán tử"
        menuItems={operators}
        onSelectionChange={handleOperatorSelectionChanged}
      />
      <TextField
        autoFocus
        placeholder="Giá trị cần lọc"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        variant="standard"
        label="Giá trị"
        onChange={handleValueChanged}
      />
    </Box>
  )
}

export default FilterSelection

const FilterSelectionItem = ({
  menuItems = [],
  label,
  defaultValue,
  formControlProps = {},
  onSelectionChange,
}) => {
  const id = useId()

  return (
    <FormControl fullWidth variant="standard" {...formControlProps}>
      <InputLabel id={`${id}:${label}`}>{label}</InputLabel>
      <Select
        onChange={onSelectionChange}
        defaultValue={defaultValue}
        labelId={`${id}:${label}`}
        id={`select:${id}`}
      >
        {menuItems?.length > 0 &&
          menuItems.map(({ value, text }, i) => (
            <MenuItem key={`${i}:${text}`} value={value}>
              {text}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
