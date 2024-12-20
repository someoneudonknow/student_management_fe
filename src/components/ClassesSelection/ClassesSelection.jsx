import {
  Grid2 as Grid,
  Box,
  Button,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemButton,
} from "@mui/material"
import PrimaryModal from "../PrimaryModal/PrimaryModal"
import { useEffect, useRef, useState } from "react"
import ClassService from "../../services/ClassService"

const AddStudentDialog = ({ onCancel, onSubmit, open, onClose, loading }) => {
  const classServiceRef = useRef(new ClassService())
  const [fetchLoading, setFetchLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      setFetchLoading(true)

      const classesRes = await classServiceRef.current.getClasses()
      const list = classesRes.data.metadata

      setClasses(list)
      setFetchLoading(false)
    })()
  }, [])

  const handleSubmit = () => {
    if (selectedClass === null) {
      return setError("Vui lòng chọn lớp.")
    }
    setError(null)
    onSubmit(selectedClass)
  }

  return (
    <PrimaryModal open={open} onClose={onClose}>
      <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h6">Chọn lớp</Typography>
          </Grid>
          <Grid size={12}>
            {classes && (
              <Autocomplete
                name="class"
                value={selectedClass}
                options={classes}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                onChange={(_, newVal) => {
                  setSelectedClass(newVal)
                }}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props

                  return (
                    <ListItemButton key={key} {...optionProps}>
                      <ListItemIcon>
                        <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${option.name}`}
                        secondary={`Khối: ${option.grade} - Sỉ số: ${option.size}`}
                      />
                    </ListItemButton>
                  )
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={Boolean(error)}
                      helperText={error ? error : ""}
                      label="Chọn lớp"
                      placeholder="Lớp học"
                    />
                  )
                }}
              />
            )}
          </Grid>
          <Grid size={12}>
            <Stack direction="row" justifyContent="flex-end" component="div" gap={2}>
              <Button
                variant="outlined"
                sx={{ minWidth: "80px" }}
                disable={fetchLoading || loading}
                onClick={onCancel}
              >
                Huỷ
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disable={fetchLoading || loading}
                sx={{ minWidth: "120px" }}
              >
                Thêm
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PrimaryModal>
  )
}

export default AddStudentDialog
