import { Stack } from "@mui/material"
import FilterSelection from "./FilterSelection"

const FilterSelectionList = ({ onRemove, multiFilterMode, fields, filterableCols, onSelectionChange, onMultiFilterModeChange, operators }) => {
  return (
    <Stack sx={{ flex: 1, overflow: "auto", pb: 1 }} spacing={1}>
      {fields.map((field, i) => (
        <FilterSelection
          value={field}
          onGroupConditionChange={onMultiFilterModeChange}
          canChangeGroupCondition={i === 1}
          noGroupConditions={i === 0}
          key={field.id}
          columns={filterableCols}
          operators={operators}
          onRemove={() => onRemove(field.id)}
          multiFilterMode={multiFilterMode}
          onSelectionChange={(data) => onSelectionChange(field.id, data)}
        />
      ))}
    </Stack>
  )
}

export default FilterSelectionList
