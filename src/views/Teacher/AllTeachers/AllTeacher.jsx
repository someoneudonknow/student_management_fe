import { Box, Button, IconButton, Stack, Toolbar } from "@mui/material"
import SearchBox from "../../../components/SearchBox/SearchBox"
import PrimaryTable from "../../../components/PrimaryTable/PrimaryTable"
import { Add, Delete, Edit } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const TEACHER_INFO_COLUMNS = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "firstName",
    headerName: "Họ và tên đệm",
    flex: 2,
  },
  {
    field: "lastName",
    headerName: "Tên",
    flex: 1.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2.5,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    flex: 1,
  },
  {
    field: "birthday",
    headerName: "Ngày sinh",
    flex: 1.5,
  },
  {
    field: "phoneNumber",
    headerName: "SĐT",
    flex: 1.5,
  },
  {
    field: "country",
    headerName: "Quê quán",
    flex: 1.5,
  },
  {
    field: "admissionDate",
    headerName: "Ngày vào làm",
    flex: 1.5,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    flex: 2,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 1,
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
  { id: Math.random(), lastName: "Snow", firstName: "Jon", age: 14 },
  { id: Math.random(), lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: Math.random(), lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: Math.random(), lastName: "Stark", firstName: "Arya", age: 11 },
  { id: Math.random(), lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: Math.random(), lastName: "Melisandre", firstName: null, age: 150 },
  { id: Math.random(), lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: Math.random(), lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: Math.random(), lastName: "Roxie", firstName: "Harvey", age: 65 },

  { id: Math.random(), lastName: "Snow", firstName: "Jon", age: 14 },
  { id: Math.random(), lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: Math.random(), lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: Math.random(), lastName: "Stark", firstName: "Arya", age: 11 },
  { id: Math.random(), lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: Math.random(), lastName: "Melisandre", firstName: null, age: 150 },
  { id: Math.random(), lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: Math.random(), lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: Math.random(), lastName: "Roxie", firstName: "Harvey", age: 65 },

  { id: Math.random(), lastName: "Snow", firstName: "Jon", age: 14 },
  { id: Math.random(), lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: Math.random(), lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: Math.random(), lastName: "Stark", firstName: "Arya", age: 11 },
  { id: Math.random(), lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: Math.random(), lastName: "Melisandre", firstName: null, age: 150 },
  { id: Math.random(), lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: Math.random(), lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: Math.random(), lastName: "Roxie", firstName: "Harvey", age: 65 },

  { id: Math.random(), lastName: "Snow", firstName: "Jon", age: 14 },
  { id: Math.random(), lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: Math.random(), lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: Math.random(), lastName: "Stark", firstName: "Arya", age: 11 },
  { id: Math.random(), lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: Math.random(), lastName: "Melisandre", firstName: null, age: 150 },
  { id: Math.random(), lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: Math.random(), lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: Math.random(), lastName: "Roxie", firstName: "Harvey", age: 65 },
]

const AllTeachers = () => {
  const navigate = useNavigate()

  const handleAddTeacherButtonClicked = () => {
    navigate("/admin/teacher/create")
  }

  return (
    <Box p={1} component="div" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ justifyContent: "space-between" }} disableGutters py={3}>
        <Box>
          <SearchBox sx={{ minWidth: "400px" }} label="Tìm kiếm giáo viên" />
        </Box>
        <Stack>
          <Button startIcon={<Add />} variant="outlined" onClick={handleAddTeacherButtonClicked}>
            Thêm giáo viên
          </Button>
        </Stack>
      </Toolbar>
      <PrimaryTable
        wrapperSx={{ flex: 1 }}
        rows={rows}
        columns={TEACHER_INFO_COLUMNS}
        title="Thông tin giáo viên"
        autoPageSizeOnMount
      />
    </Box>
  )
}

export default AllTeachers
