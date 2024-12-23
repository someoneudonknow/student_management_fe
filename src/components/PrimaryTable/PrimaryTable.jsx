import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useRef, useState } from "react"
import TableHeader from "./TableHeader"
import CustomToolBar from "./CustomToolbar/CustomToolBar"
import { localeText } from "./constants"

const PrimaryTable = ({
  title = "",
  onDeleteColumns,
  onFilterChange,
  selectedRowIds,
  paginationModel = { pageSize: 25 },
  pageSizeOptions = [25, 50, 100],
  rows = [],
  wrapperSx,
  columns = [],
  ...rest
}) => {
  const [dataGridMaxHeight, setDataGridMaxHeight] = useState(500)
  const dataGridContainerRef = useRef()

  useEffect(() => {
    const maxHeight =
      dataGridContainerRef.current?.offsetHeight || dataGridContainerRef.current?.clientHeight

    if (maxHeight) {
      setDataGridMaxHeight(maxHeight)
    }
  }, [])

  const handleDeleteColumnsClicked = async () => {
    onDeleteColumns && (await onDeleteColumns())
  }

  return (
    <Box component="div" sx={{ display: "flex", flexDirection: "column", ...wrapperSx }}>
      <TableHeader
        onDeleteClick={handleDeleteColumnsClicked}
        title={title}
        selectedRowsNum={selectedRowIds?.length || 0}
      />
      <Box ref={dataGridContainerRef} component="div" sx={{ flex: 1 }}>
        <DataGrid
          sx={{ maxHeight: dataGridMaxHeight, maxWidth: "100%" }}
          rows={rows}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          disableColumnSelector
          initialState={{
            pagination: {
              paginationModel,
            },
          }}
          slots={{
            toolbar: CustomToolBar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              onFilterChange: onFilterChange,
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          localeText={localeText}
          {...rest}
        />
      </Box>
    </Box>
  )
}

export default PrimaryTable
