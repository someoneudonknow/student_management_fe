import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid"
import GridColumnManager from "./GridColumnManager/GridColumnManager"
import GridMultiFilter from "./GridMultiFilter/GridMultiFilter"

const CustomToolBar = ({onFilterChange}) => {
  return (
    <GridToolbarContainer
      sx={{
        py: 1,
      }}
    >
      <GridColumnManager />
      <GridToolbarExport variant="contained" csvOptions={{ utf8WithBom: true }} />
      <GridToolbarDensitySelector />
      <GridMultiFilter onFilterChange={onFilterChange} />
    </GridToolbarContainer>
  )
}

export default CustomToolBar
