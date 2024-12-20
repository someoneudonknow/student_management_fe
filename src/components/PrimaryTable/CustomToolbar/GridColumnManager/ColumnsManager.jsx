import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import SearchBox from "../../../SearchBox/SearchBox"
import { useGridApiContext } from "@mui/x-data-grid"

const ColumnsManager = ({ anchor, onClose, unFoundText = "Không có cột nào" }) => {
  const [cols, setCols] = useState([])
  const apiRef = useGridApiContext()
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({})

  const columns = useMemo(
    () => apiRef.current?.getAllColumns() || [],
    [apiRef.current.getAllColumns],
  )

  useEffect(() => {
    setCols(columns)
  }, [columns])

  const handleSearchColumnsChanged = (textSearch) => {
    if (textSearch === "") setCols(columns || [])

    setCols(columns.filter((c) => c.headerName.toLowerCase().includes(textSearch.toLowerCase())))
  }

  useEffect(() => {
    if (columns) {
      setColumnVisibilityModel(columns.reduce((acc, curr) => ({ ...acc, [curr.field]: true }), {}))
    }
  }, [columns])

  useEffect(() => {
    if (apiRef.current?.setColumnVisibility) {
      Object.entries(columnVisibilityModel).forEach(([field, value]) =>
        apiRef.current.setColumnVisibility(field, value),
      )
    }
  }, [columnVisibilityModel, apiRef.current?.setColumnVisibility])

  const handleColumnToggle = (field) => {
    setColumnVisibilityModel((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleToggleHideShowAllCols = () => {
    const isAllColsVisible =
      apiRef.current.getVisibleColumns().length === apiRef.current.getAllColumns().length

    setColumnVisibilityModel((prevColumns) => {
      const cloned = { ...prevColumns }

      for (const key in prevColumns) {
        cloned[key] = !isAllColsVisible
      }

      return cloned
    })
  }

  return (
    <Popover
      open={!!anchor}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Paper sx={{ width: "300px", maxHeight: 400, display: "flex", flexDirection: "column" }}>
        <ListItem sx={{ py: 1 }}>
          <SearchBox fullWidth label="Tìm cột" onChange={handleSearchColumnsChanged} />
        </ListItem>
        <Divider />
        <List sx={{ position: "relative", flex: 1, overflowY: "auto" }}>
          {cols.length <= 0 && <ListItem>{unFoundText}</ListItem>}
          {cols.length > 0 &&
            cols.map((column) => (
              <ListItem key={column.field} sx={{ p: 0 }}>
                <ListItemButton sx={{ py: 0 }} onClick={() => handleColumnToggle(column.field)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={columnVisibilityModel?.[column.field]}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": `checkbox-list-label-${column.field}` }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`checkbox-list-label-${column.field}`}
                    primary={column.headerName}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Divider />
        <ListItem sx={{ p: 0 }}>
          <ListItemButton sx={{ py: 0 }} onClick={() => handleToggleHideShowAllCols()}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                checked={Object.keys(columnVisibilityModel).every(
                  (key) => columnVisibilityModel?.[key],
                )}
                disableRipple
                inputProps={{ "aria-labelledby": `checkbox-show-hide-all` }}
              />
            </ListItemIcon>
            <ListItemText id={`checkbox-show-hide-all`} primary="Ẩn/Hiện tất cả" />
          </ListItemButton>
        </ListItem>
      </Paper>
    </Popover>
  )
}

export default ColumnsManager
