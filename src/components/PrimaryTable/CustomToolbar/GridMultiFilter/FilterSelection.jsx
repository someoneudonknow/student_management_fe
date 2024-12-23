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
  Grid2 as Grid,
  Button,
} from "@mui/material"
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

const FilterSelection = ({
  columns,
  operators,
  onRemove,
  onSelectionChange,
  noGroupConditions = true,
}) => {
  const [selection, setSelection] = useState({
    field: columns[0].field,
    value: "",
    operator: operators[0].value,
    ...(!noGroupConditions && { groupCondition: groupConditions[0].value }),
  })

  const gridSize = useMemo(() => {
    if (!noGroupConditions) return 3
    return 4
  }, [noGroupConditions])

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
    <Grid container sx={{ width: "600px" }} spacing={1}>
      {!noGroupConditions && (
        <Grid size={gridSize}>
          <Box sx={{ display: "flex", alignItems: "end", justifyContent: "center", width: "100%" }}>
            <IconButton size="small" onClick={onRemove}>
              <Close />
            </IconButton>
            <FilterSelectionItem
              onSelectionChange={handleGroupConditionChanged}
              defaultValue={groupConditions[0].value}
              menuItems={groupConditions}
            />
          </Box>
        </Grid>
      )}
      <Grid size={gridSize} item>
        <FilterSelectionItem
          defaultValue={filterableCols[0].value}
          label="Cột"
          menuItems={filterableCols}
          onSelectionChange={handleColumnSelectionChanged}
        />
      </Grid>
      <Grid size={gridSize} item>
        <FilterSelectionItem
          defaultValue={operators[0].value}
          label="Toán tử"
          menuItems={operators}
          onSelectionChange={handleOperatorSelectionChanged}
        />{" "}
      </Grid>
      <Grid size={gridSize} item>
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
      </Grid>
    </Grid>
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
