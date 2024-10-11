import { Delete, ViewColumn } from "@mui/icons-material"
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material"

const TableHeader = ({ title, selectedRowsNum, onDeleteClick, onManageColumnClick }) => {
  return (
    <Toolbar disableGutters sx={{
      pr: 4
    }}>
      {selectedRowsNum > 0 && <Typography variant="h5" sx={{ flex: "1 1 100%" }}>Đã chọn {selectedRowsNum} hàng</Typography>}
      {selectedRowsNum <= 0 && <Typography variant="h5" sx={{ flex: "1 1 100%" }}>{title}</Typography>}
      {selectedRowsNum > 0 && (
        <Tooltip title="Xoá">
          <IconButton edge="end" color="error" onClick={onDeleteClick}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
      {selectedRowsNum <= 0 && (
        <Tooltip title="Quản lý cột">
          <IconButton edge="end" onClick={onManageColumnClick}>
            <ViewColumn />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default TableHeader
