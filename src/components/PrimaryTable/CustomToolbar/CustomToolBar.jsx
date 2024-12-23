import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid"
import GridColumnManager from "./GridColumnManager/GridColumnManager"
import GridMultiFilter from "./GridMultiFilter/GridMultiFilter"

const CustomToolBar = () => {
  return (
    <GridToolbarContainer
      sx={{
        py: 1,
      }}
    >
      <GridColumnManager />
      <GridToolbarExport variant="contained" csvOptions={{ utf8WithBom: true }} />
      <GridToolbarDensitySelector />
      <GridMultiFilter />
    </GridToolbarContainer>
  )
}

export default CustomToolBar
