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
import moment from "moment"

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
  multiFilterMode,
  canChangeGroupCondition,
  onGroupConditionChange,
  value,
}) => {
  const [selection, setSelection] = useState(value)
  const selectedColumn = useMemo(() => 
    columns.find(col => col.field === value?.field), 
    [columns, value?.field]
  )

  const gridSize = useMemo(() => {
    if (!noGroupConditions) return 3
    return 4
  }, [noGroupConditions])

  const handleColumnSelectionChanged = (e) => {
    const field = e.target.value
    const selectedCol = columns.find(col => col.field === field)
    const newSelection = { 
      ...selection, 
      field,
      // Reset value when changing column type
      value: ""
    }
    setSelection(newSelection)
    onSelectionChange(newSelection)
  }

  const handleOperatorSelectionChanged = (e) => {
    const operator = e.target.value
    const newSelection = { ...selection, operator }
    setSelection(newSelection)
    onSelectionChange(newSelection)
  }

  const handleGroupConditionChanged = (e) => {
    if(!canChangeGroupCondition) return
    const value = e.target.value
    onGroupConditionChange(value)
  }

  const handleValueChanged = (e) => {
    const newValue = e.target.value
    const newSelection = { ...selection, value: newValue }
    setSelection(newSelection)
    onSelectionChange(newSelection)
  }

  const handleDateValueChanged = (e) => {
    const newValue = e.target.value
    // Convert from input format to DD/MM/YYYY
    const formattedDate = moment(newValue).format('DD/MM/YYYY')
    const newSelection = { ...selection, value: formattedDate }
    setSelection(newSelection)
    onSelectionChange(newSelection)
  }

  const renderValueInput = () => {
    const type = selectedColumn?.type || 'string'
    
    switch(type) {
      case 'date':
        return (
          <TextField
            type="date"
            fullWidth
            variant="standard"
            label="Giá trị"
            onChange={handleDateValueChanged}
            // Convert DD/MM/YYYY to YYYY-MM-DD for input
            value={value?.value ? moment(value.value, 'DD/MM/YYYY').format('YYYY-MM-DD') : ""}
            InputLabelProps={{ shrink: true }}
          />
        )
      case 'number':
        return (
          <TextField
            type="number"
            fullWidth
            variant="standard"
            label="Giá trị"
            onChange={handleValueChanged}
            value={value?.value || ""}
          />
        )
      default:
        return (
          <TextField
            fullWidth
            variant="standard"
            label="Giá trị"
            onChange={handleValueChanged}
            value={value?.value || ""}
          />
        )
    }
  }

  return (
    <Grid container spacing={2}>
      {!noGroupConditions && (
        <Grid size={gridSize} item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" onClick={onRemove}>
              <Close />
            </IconButton>
            <FilterSelectionItem
              disabled={!canChangeGroupCondition}
              onSelectionChange={handleGroupConditionChanged}
              defaultValue={multiFilterMode}
              value={multiFilterMode}
              menuItems={groupConditions}
            />
          </Box>
        </Grid>
      )}
      <Grid size={gridSize} item>
        <FilterSelectionItem
          defaultValue={columns[0].field}
          value={value?.field}
          label="Cột"
          menuItems={columns.map(col => ({
            text: col.headerName || col.field,
            value: col.field
          }))}
          onSelectionChange={handleColumnSelectionChanged}
        />
      </Grid>
      <Grid size={gridSize} item>
        <FilterSelectionItem
          defaultValue={operators[0].value}
          label="Toán tử"
          value={value?.operator}
          menuItems={operators}
          onSelectionChange={handleOperatorSelectionChanged}
        />
      </Grid>
      <Grid size={gridSize} item>
        {renderValueInput()}
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
  disabled,
  value
}) => {
  const id = useId()

  return (
    <FormControl {...formControlProps} disabled={disabled} fullWidth variant="standard">
      <InputLabel id={`${id}:${label}`}>{label}</InputLabel>
      <Select
        value={value}
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
