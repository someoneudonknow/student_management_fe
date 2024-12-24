import { Box, Button, Paper, Popover, Stack } from "@mui/material"
import { useGridApiContext } from "@mui/x-data-grid"
import { useEffect, useMemo, useState } from "react"
import FilterSelection from "./FilterSelection"
import { Add, Clear } from "@mui/icons-material"
import FilterSelectionList from "./FilterSelectionList"
import { v4 as uuidv4 } from 'uuid';

const operator = {
  EQUALS: "eq",
  NOT_EQUALS: "ne",
  LESS_THAN: "lt",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUALS: "ge",
  LESS_THAN_OR_EQUALS: "le",
}

const operators = [
  { text: "Bằng", value: operator.EQUALS },
  { text: "Không bằng", value: operator.NOT_EQUALS },
  { text: "Bé hơn", value: operator.LESS_THAN },
  { text: "Lớn hơn", value: operator.GREATER_THAN },
  { text: "Bé hơn hoặc bằng", value: operator.LESS_THAN_OR_EQUALS },
  { text: "Lớn hơn hoặc bằng", value: operator.GREATER_THAN_OR_EQUALS },
]

const MultiFilter = ({ anchor, onClose, onFiltersChange }) => {
  const apiRef = useGridApiContext()
  const [fields, setFields] = useState([])
  const [multiFilterMode, setMultiFilterMode] = useState("and")

  useEffect(() => {
    const filter = buildFilter()
    onFiltersChange?.(filter)
  }, [fields, multiFilterMode])

  const buildFilter = () => {
    const validFields = fields.filter(field => field.value !== null && field.value !== '')
    
    if (validFields.length === 0) return null
    
    if (validFields.length === 1) {
      return {
        field: validFields[0].field,
        operator: validFields[0].operator,
        value: validFields[0].value
      }
    } else {
      return {
        [multiFilterMode]: validFields.map(field => ({
          field: field.field,
          operator: field.operator,
          value: field.value
        }))
      }
    }
  }

  const handleMultiFilterModeChange = (mode) => {
    setMultiFilterMode(mode)
  }

  const getColumnType = (column) => {
    if (column.type) return column.type
    
    if (column.valueGetter && column.valueGetter.toString().includes('new Date')) {
      return 'date'
    }
    if (column.type === 'number' || column.valueFormatter?.toString().includes('parseInt')) {
      return 'number'
    }
    
    return 'string'
  }

  const filterableCols = useMemo(() => {
    if (apiRef.current?.getAllColumns) {
      const filterableColumns = apiRef.current
        .getAllColumns()
        .filter((c) => c.filterable !== false)
        .map(col => ({
          ...col,
          type: getColumnType(col)
        }))

      if (fields.length === 0) {
        setFields([{
          id: uuidv4(),
          field: filterableColumns[0]?.field,
          operator: operators[0].value,
          value: "",
        }])
      }
      
      return filterableColumns
    }
    return []
  }, [apiRef.current?.getAllColumns])

  const handleSelectionChange = (id, data) => {
    setFields(prev => prev.map(f => f.id === id ? {id, ...data} : f))
  }

  const handleAddField = () => {
    setFields((prev) => [...prev, {
      id: uuidv4(),
      field: filterableCols[0]?.field,
      operator: operators[0].value,
      value: "",
    }])
  }

  const handleRemoveField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id))
  }

  const handleResetFields = () => {
    setFields([
      {
            id: uuidv4(),
            field: filterableCols[0]?.field,
            operator: operators[0].value,
            value: "",
      }
    ])
    onClose()
  }

  return (
    <Popover
      open={!!anchor}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Stack
        component="div"
        p={1}
        sx={{
          position: "relative",
          maxHeight: "50%",
          display: "flex",
        }}
      >
        <FilterSelectionList
          fields={fields}
          operators={operators}
          filterableCols={filterableCols}
          onSelectionChange={handleSelectionChange}
          onRemove={handleRemoveField}
          onMultiFilterModeChange={handleMultiFilterModeChange}
          multiFilterMode={multiFilterMode}
        />
        <Box
          sx={{
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Button onClick={handleAddField} startIcon={<Add />}>
            Thêm trường
          </Button>
          <Button onClick={handleResetFields} startIcon={<Clear />}>
            Đặt lại
          </Button>
        </Box>
      </Stack>
    </Popover>
  )
}

export default MultiFilter
