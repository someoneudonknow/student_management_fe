import { Filter, FilterList } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useState } from "react"
import MultiFilter from "./MultiFilter"

const GridMultiFilter = ({ onFilterChange }) => {
  const [anchor, setAnchor] = useState(null)

  const handleOpenMultiFilter = (e) => {
    setAnchor(e.currentTarget)
  }

  const handleCloseMultiFilter = () => {
    setAnchor(null)
  }

  return (
    <>
      <Button startIcon={<FilterList />} edge="end" onClick={handleOpenMultiFilter}>
        Bộ lọc
      </Button>
      <MultiFilter onFiltersChange={onFilterChange} anchor={anchor} onClose={handleCloseMultiFilter} />
    </>
  )
}

export default GridMultiFilter
