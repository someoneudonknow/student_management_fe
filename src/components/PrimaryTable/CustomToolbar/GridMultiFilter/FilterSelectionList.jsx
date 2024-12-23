import { Stack } from "@mui/material"
import FilterSelection from "./FilterSelection"
import { mapRange } from "../../../../utils"
import { useState } from "react"

const FilterSelectionList = ({ onChange, fieldAmount = 1, filterableCols, operators }) => {
  const [fields, setFields] = useState([])

  const handleFieldRemove = (i) => {
    console.log(i)
  }

  return (
    <Stack sx={{ flex: 1, overflow: "auto", pb: 1 }} spacing={1}>
      {mapRange(0, fieldAmount).map((_, i) => (
        <FilterSelection
          noGroupConditions={i === 0}
          key={i}
          columns={filterableCols}
          operators={operators}
          onRemove={() => handleFieldRemove(i)}
        />
      ))}
    </Stack>
  )
}

export default FilterSelectionList
