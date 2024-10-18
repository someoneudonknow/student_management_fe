import { Box, Button, IconButton, Stack, Toolbar } from "@mui/material"
import SearchBox from "../../../components/SearchBox/SearchBox"
import PrimaryTable from "../../../components/PrimaryTable/PrimaryTable"
import { Add, Delete, Edit } from "@mui/icons-material"
import { useState } from "react"
import CreateSubjectFormDialog from "../../../components/CreateSubjectFormDialog/CreateSubjectFormDialog"

const SUBJECT_INFO_COLUMNS = [
  { field: "id", headerName: "ID", flex: 2 },
  {
    field: "name",
    headerName: "Tên môn học",
    flex: 6,
  },
  {
    field: "numberOfPeriod",
    headerName: "Tổng số tiết tối đa",
    flex: 4,
  },
  {
    field: "actions",
    headerName: "Hành động",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    width: 150,
    renderCell: (params) => {
      return (
        <div style={{ width: "100%", display: "flex", alignItems: "center", height: "100%" }}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton color="error" sx={{ ml: 1 }}>
            <Delete />
          </IconButton>
        </div>
      )
    },
  },
]

const rows = [
  { id: Math.random(), name: "Snow", NumberOfPeriod: 14 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Stark", NumberOfPeriod: 11 },
  { id: Math.random(), name: "Targaryen", NumberOfPeriod: null },
  { id: Math.random(), name: "Melisandre", NumberOfPeriod: 150 },
  { id: Math.random(), name: "Clifford", NumberOfPeriod: 44 },
  { id: Math.random(), name: "Frances", NumberOfPeriod: 36 },
  { id: Math.random(), name: "Roxie", NumberOfPeriod: 65 },

  { id: Math.random(), name: "Snow", NumberOfPeriod: 14 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Stark", NumberOfPeriod: 11 },
  { id: Math.random(), name: "Targaryen", NumberOfPeriod: null },
  { id: Math.random(), name: "Melisandre", NumberOfPeriod: 150 },
  { id: Math.random(), name: "Clifford", NumberOfPeriod: 44 },
  { id: Math.random(), name: "Frances", NumberOfPeriod: 36 },
  { id: Math.random(), name: "Roxie", NumberOfPeriod: 65 },

  { id: Math.random(), name: "Snow", NumberOfPeriod: 14 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Stark", NumberOfPeriod: 11 },
  { id: Math.random(), name: "Targaryen", NumberOfPeriod: null },
  { id: Math.random(), name: "Melisandre", NumberOfPeriod: 150 },
  { id: Math.random(), name: "Clifford", NumberOfPeriod: 44 },
  { id: Math.random(), name: "Frances", NumberOfPeriod: 36 },
  { id: Math.random(), name: "Roxie", NumberOfPeriod: 65 },

  { id: Math.random(), name: "Snow", NumberOfPeriod: 14 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Lannister", NumberOfPeriod: 31 },
  { id: Math.random(), name: "Stark", NumberOfPeriod: 11 },
  { id: Math.random(), name: "Targaryen", NumberOfPeriod: null },
  { id: Math.random(), name: "Melisandre", NumberOfPeriod: 150 },
  { id: Math.random(), name: "Clifford", NumberOfPeriod: 44 },
  { id: Math.random(), name: "Frances", NumberOfPeriod: 36 },
  { id: Math.random(), name: "Roxie", NumberOfPeriod: 65 },
]

const AllSubjects = () => {
  const [isShowAddSubjectDialog, setIsShowAddSubjectDialog] = useState(false)

  const handleOpenCreateSubjectModal = () => {
    setIsShowAddSubjectDialog(true)
  }

  const handleCloseCreateSubjectModal = () => {
    setIsShowAddSubjectDialog(false)
  }

  const handleSubmitCreateSubjectForm = (values) => {
    const data = {
      name: values.name,
      number_of_period: values.numberOfPeriod,
    }

    console.log(data)
  }

  return (
    <Box p={1} component="div" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ justifyContent: "space-between" }} disableGutters py={3}>
        <Box>
          <SearchBox sx={{ minWidth: "400px" }} label="Tìm kiếm môn học" />
        </Box>
        <Stack>
          <Button startIcon={<Add />} variant="outlined" onClick={handleOpenCreateSubjectModal}>
            Thêm môn học
          </Button>
        </Stack>
      </Toolbar>
      <PrimaryTable
        wrapperSx={{ flex: 1 }}
        rows={rows}
        columns={SUBJECT_INFO_COLUMNS}
        title="Thông tin môn học"
        autoPageSizeOnMount
      />

      <CreateSubjectFormDialog
        open={isShowAddSubjectDialog}
        onCancel={handleCloseCreateSubjectModal}
        onSubmit={handleSubmitCreateSubjectForm}
      />
    </Box>
  )
}

export default AllSubjects
