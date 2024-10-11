import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useRef, useState } from "react"
import TableHeader from "./TableHeader";
import ColumnsManager from "./ColumnsManager";

const PrimaryTable = ({
  title = "",
  onRowSelectionChange,
  paginationModel = { pageSize: 25 },
  pageSizeOptions = [25, 50, 100],
  rows = [],
  wrapperSx,
  columns = [],
  ...rest
}) => {
  const [selectedRowIds, setSelectedRowIds] = useState([])
  const [dataGridMaxHeight, setDataGridMaxHeight] = useState(500);
  const [manageColumnsAnchor, setManageColumnsAnchor] = useState(null)
  const dataGridContainerRef = useRef()
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(columns.reduce((acc, curr) => {
    return { ...acc, [curr.field]: true }
  }, {}))

  useEffect(() => {
    onRowSelectionChange && onRowSelectionChange(selectedRowIds)
  }, [selectedRowIds])

  useEffect(() => {
    const maxHeight = dataGridContainerRef.current?.offsetHeight || dataGridContainerRef.current?.clientHeight

    if (maxHeight) {
      setDataGridMaxHeight(maxHeight)
    }

  }, [dataGridContainerRef.current])

  const handleColumnToggle = (field) => {
    setColumnVisibilityModel((prevColumns) => ({
      ...prevColumns,
      [field]: !prevColumns[field]
    }))
  };

  const handleRowSelectionModelChanged = (selectedIds) => {
    setSelectedRowIds(selectedIds)
  }

  const handleOpenManageColumns = (e) => {
    setManageColumnsAnchor(e.currentTarget)
  }

  const handleCloseManageColumns = () => {
    setManageColumnsAnchor(null)
  }

  const handleToggleHideShowAllCols = () => {
    const isAllColsVisible = Object.keys(columnVisibilityModel).every(key => columnVisibilityModel[key])

    setColumnVisibilityModel((prevColumns) => {
      const cloned = { ...prevColumns }

      for (const key in prevColumns) {
        cloned[key] = !isAllColsVisible
      }

      return cloned
    })
  }

  const handleColumnVisibilityModelChange = (model) => {
    setColumnVisibilityModel(prev => {
      const cloned = { ...prev }

      for (const key in model) {
        cloned[key] = model[key]
      }

      return cloned
    })
  }

  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "column", ...wrapperSx }}
    >
      <ColumnsManager
        columnVisibilityModel={columnVisibilityModel}
        anchor={manageColumnsAnchor}
        onClose={handleCloseManageColumns}
        columns={columns}
        onColumnToggle={handleColumnToggle}
        onToggleShowHideAll={handleToggleHideShowAllCols}
      />
      <TableHeader
        title={title}
        selectedRowsNum={selectedRowIds.length}
        onManageColumnClick={handleOpenManageColumns}
      />
      <Box
        ref={dataGridContainerRef}
        component="div"
        sx={{ flex: 1 }}
      >
        <DataGrid
          sx={{ maxHeight: dataGridMaxHeight, maxWidth: "100%" }}
          rows={rows}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          onRowSelectionModelChange={handleRowSelectionModelChanged}
          columnVisibilityModel={columnVisibilityModel}
          disableColumnSelector
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            pagination: {
              paginationModel
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          localeText={{
            columnMenuFilter: "Bộ lọc",
            columnMenuSortAsc: "Xắp xếp tăng dần",
            columnMenuSortDesc: 'Xắp xếp giảm dần',
            columnMenuHideColumn: "Ẩn cột",
            columnMenuManageColumns: "Quản lý cột",
            columnMenuUnsort: "Huỷ sắp xếp",
            filterPanelInputLabel: "Giá trị lọc",
            filterPanelOperator: "Toán tử...",
            filterPanelColumns: "Cột...",
            filterPanelInputPlaceholder: "Giá trị lọc...",
            filterOperatorEquals: "Bằng",
            filterOperatorDoesNotContain: "Không chứa",
            filterOperatorNotEquals: "Khác",
            filterOperatorGreaterThan: "Lớn hơn",
            filterOperatorGreaterThanOrEqual: "Lớn hơn hoặc bằng",
            filterOperatorLessThan: "Nhỏ hơn",
            filterOperatorLessThanOrEqual: "Nhỏ hơn hoặc bằng",
            filterOperatorContains: "Chứa",
            filterOperatorStartsWith: "Bắt đầu bằng",
            filterOperatorEndsWith: "Kết thúc bằng",
            filterOperatorDoesNotEqual: "Không bằng",
            filterOperatorIsNotEmpty: "Không trống",
            filterOperatorIsEmpty: "Trống",
            filterOperatorIsAnyOf: "Một trong",
            footerRowSelected: (count) => `${count} hàng đã được chọn`,
          }}
          {...rest}
        />
      </Box>
    </Box>
  )
}

export default PrimaryTable
