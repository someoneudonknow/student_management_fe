import { Box, Button, Stack, Toolbar } from "@mui/material"
import EditStudentFormDialog from "../../../components/EditStudentFormDialog/EditStudentFormDialog.jsx"
import SearchBox from "../../../components/SearchBox/SearchBox"
import PrimaryTable from "../../../components/PrimaryTable/PrimaryTable"
import { Add, Delete, Edit } from "@mui/icons-material"
import useServerPagination from "../../../hooks/useServerPagination.js"
import { useNavigate } from "react-router-dom"
import StudentService from "../../../services/StudentService"
import { useState, useMemo } from "react"
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog.jsx"
import useStudentCRUD from "../../../hooks/useStudentCRUD.js"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { STUDENT_FIELDS } from "./constants/index.js"

const AllStudents = () => {
  const navigate = useNavigate()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([])
  const { loading, deleteStudents, updateStudent } = useStudentCRUD()
  const { props, rows, setRows } = useServerPagination({
    fetchDataFunc: async (limit, page) => {
      const studentService = new StudentService()
      const res = await studentService.getAllStudents({
        limit,
        page,
      })

      return res.data.metadata
    },
  })

  const STUDENT_INFO_COLUMNS = useMemo(
    () => [
      ...STUDENT_FIELDS,
      {
        field: "actions",
        type: "actions",
        headerName: "Hành động",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<Edit />}
            onClick={() => {
              setCurrentStudent(row)
              setEditDialogOpen(true)
            }}
            label="Sửa"
          />,
          <GridActionsCellItem
            key={0}
            icon={<Delete />}
            color="error"
            onClick={() => {
              setSelectedRowIds([row.id])
              setDeleteConfirmDialogOpen(true)
            }}
            label="Xoá"
          />,
        ],
      },
    ],
    [],
  )

  const handleDeleteStudents = async () => {
    if (selectedRowIds.length > 0) {
      await deleteStudents(selectedRowIds, ({ data: { metadata } }) => {
        if (metadata > 0) {
          setRows((prev) => prev.filter((r) => !selectedRowIds.find((id) => r.id === id)))
        }

        setDeleteConfirmDialogOpen(false)
        setSelectedRowIds([])
      })
    }
  }

  const handleEditStudent = async (id, studentData) => {
    await updateStudent({ id, studentData }, ({ data: { metadata } }) => {
      setRows((prev) => {
        const clonedStudentsArr = [...prev]
        const foundIndex = clonedStudentsArr.findIndex((s) => s.id === metadata.id)

        if (foundIndex !== -1) {
          clonedStudentsArr[foundIndex] = metadata
        }

        return clonedStudentsArr
      })
      setEditDialogOpen(false)
      setCurrentStudent(null)
    })
  }

  const handleAddStudentButtonClicked = () => {
    navigate("/admin/student/create")
  }

  const handleCloseEditStudentDialog = () => {
    setEditDialogOpen(false)
  }

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmDialogOpen(false)
  }

  const handleRowSelectionChanged = (selectedIds) => {
    setSelectedRowIds(selectedIds)
  }

  const handleDeleteStudentBtnClicked = async () => {
    setDeleteConfirmDialogOpen(true)
  }

  return (
    <Box p={1} component="div" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ConfirmDialog
        loading={loading}
        open={deleteConfirmDialogOpen}
        title="Xoá học sinh"
        body={`Bạn có chắc muốn xoá ${selectedRowIds.length} học sinh?`}
        onClose={handleDeleteConfirmDialogClose}
        onCancel={handleDeleteConfirmDialogClose}
        onConfirm={handleDeleteStudents}
      />
      {currentStudent && (
        <EditStudentFormDialog
          onClose={handleCloseEditStudentDialog}
          onCancel={handleCloseEditStudentDialog}
          onSubmit={handleEditStudent}
          open={editDialogOpen}
          initValue={currentStudent}
        />
      )}
      <Toolbar sx={{ justifyContent: "space-between" }} disableGutters py={3}>
        <Box>
          <SearchBox sx={{ minWidth: "400px" }} label="Tìm kiếm học sinh" />
        </Box>
        <Stack>
          <Button startIcon={<Add />} variant="outlined" onClick={handleAddStudentButtonClicked}>
            Thêm học sinh
          </Button>
        </Stack>
      </Toolbar>
      <PrimaryTable
        rowSelectionModel={selectedRowIds}
        onDeleteColumns={handleDeleteStudentBtnClicked}
        onRowSelectionModelChange={handleRowSelectionChanged}
        selectedRowIds={selectedRowIds}
        wrapperSx={{ flex: 1 }}
        rows={rows}
        columns={STUDENT_INFO_COLUMNS}
        title="Thông tin học sinh"
        autoPageSizeOnMount
        {...props}
      />
    </Box>
  )
}

export default AllStudents
