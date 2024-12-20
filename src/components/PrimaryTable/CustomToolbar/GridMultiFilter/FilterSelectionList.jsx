import { Stack } from "@mui/material"
import FilterSelection from "./FilterSelection"
import { range } from "@mui/x-data-grid/internals"
import { mapRange } from "../../../../utils"

const FilterSelectionList = ({ onChange, fieldAmount = 1, filterableCols, operators }) => {
  return (
    <Stack sx={{ flex: 1, overflow: "auto", pb: 1 }} spacing={1}>
      {mapRange(0, fieldAmount).map((_, i) => (
        <FilterSelection
          noGroupConditions={i === 0}
          key={i}
          columns={filterableCols}
          operators={operators}
        />
      ))}
    </Stack>
  )
}

export default FilterSelectionList
