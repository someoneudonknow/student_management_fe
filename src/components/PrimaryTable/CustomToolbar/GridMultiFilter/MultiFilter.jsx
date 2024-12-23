import { Box, Button, Paper, Popover, Stack } from "@mui/material"
import { useGridApiContext } from "@mui/x-data-grid"
import { useEffect, useMemo, useState } from "react"
import FilterSelection from "./FilterSelection"
import { Add, Clear } from "@mui/icons-material"
import FilterSelectionList from "./FilterSelectionList"

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

const MultiFilter = ({ anchor, onClose }) => {
  const [filters, setFilter] = useState([])
  const [currentFields, setCurrentFields] = useState([])
  const [multiFilterMode, setMultiFilterMode] = useState("and")
  const [filterFieldAmount, setFilterFieldAmount] = useState(1)
  const apiRef = useGridApiContext()

  const filterableCols = useMemo(() => {
    if (apiRef.current?.getAllColumns && currentFields.length === 0) {
      const filterableColumns = apiRef.current.getAllColumns().filter((c) => c.filterable)

      setCurrentFields([filterableColumns[0]])
      return filterableColumns
    }
    return []
  }, [apiRef.current?.getAllColumns, apiRef.current])

  const handleAddField = () => {
    setFilterFieldAmount((prev) => prev + 1)
  }

  const handleFiltersChange = () => {}

  const handleResetFields = () => {
    setCurrentFields([filterableCols[0]])
    setFilterFieldAmount(1)
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
          fieldAmount={filterFieldAmount}
          operators={operators}
          filterableCols={filterableCols}
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
