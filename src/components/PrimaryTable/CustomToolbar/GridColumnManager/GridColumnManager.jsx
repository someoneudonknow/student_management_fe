import { Button } from "@mui/material"
import ColumnsManager from "./ColumnsManager"
import { ViewColumn } from "@mui/icons-material"
import { useState } from "react"

const GridColumnManager = () => {
  const [manageColumnsAnchor, setManageColumnsAnchor] = useState(null)

  const handleOpenManageColumns = (e) => {
    setManageColumnsAnchor(e.currentTarget)
  }

  const handleCloseManageColumns = () => {
    setManageColumnsAnchor(null)
  }

  return (
    <>
      <Button startIcon={<ViewColumn />} edge="end" onClick={handleOpenManageColumns}>
        Quản lý cột
      </Button>
      <ColumnsManager anchor={manageColumnsAnchor} onClose={handleCloseManageColumns} />
    </>
  )
}

export default GridColumnManager
