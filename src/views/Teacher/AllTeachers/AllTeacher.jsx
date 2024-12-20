import { useNavigate } from "react-router-dom"
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog"
import { Box, Button, Stack, Toolbar } from "@mui/material"
import SearchBox from "../../../components/SearchBox/SearchBox"
import { Add, Delete, Edit } from "@mui/icons-material"
import PrimaryTable from "../../../components/PrimaryTable/PrimaryTable"
import useServerPagination from "../../../hooks/useServerPagination"
import useStudentCRUD from "../../../hooks/useStudentCRUD"
import { useMemo, useState } from "react"
import { TEACHER_FIELDS } from "./constants/index.js"
import { GridActionsCellItem } from "@mui/x-data-grid"
import TeacherService from "../../../services/TeacherService.js"
import useTeacherCRUD from "../../../hooks/useTeacherCRUD.js"
import EditTeacherFormDialog from "../../../components/EditTeacherFormDialog/EditTeacherFormDialog.jsx"

const AllTeachers = () => {
  const navigate = useNavigate()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState(null)
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([])
  const { loading, deleteTeachers, updateTeacher } = useTeacherCRUD()
  const { props, rows, setRows } = useServerPagination({
    fetchDataFunc: async (limit, page) => {
      const teacherService = new TeacherService()
      const result = await teacherService.getAllTeachers({ page, limit })
      return result.data.metadata
    },
  })

  const TEACHER_FIELDS_COLUMNS = useMemo(
    () => [
      ...TEACHER_FIELDS,
      {
        field: "actions",
        type: "actions",
        headerName: "Hành động",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<Edit />}
            onClick={() => {
              setCurrentTeacher(row)
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

  const handleDeleteTeachers = async () => {
    if (selectedRowIds.length > 0) {
      await deleteTeachers(selectedRowIds, ({ data: { metadata } }) => {
        console.log(selectedRowIds)
        if (metadata > 0) {
          setRows((prev) => prev.filter((r) => !selectedRowIds.find((id) => r.id === id)))
        }

        setDeleteConfirmDialogOpen(false)
        setSelectedRowIds([])
      })
    }
  }

  const handleEditTeacher = async (id, payload) => {
    await updateTeacher({ id, teacherData: payload }, ({ data: { metadata } }) => {
      setRows((prev) => {
        const clonedTeachersArr = [...prev]
        const foundIndex = clonedTeachersArr.findIndex((s) => s.id === metadata.id)

        if (foundIndex !== -1) {
          clonedTeachersArr[foundIndex] = metadata
        }

        return clonedTeachersArr
      })
      setEditDialogOpen(false)
      setCurrentTeacher(null)
    })
  }

  const handleCloseEditTeacherDialog = () => {
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

  const handleAddTeacherButtonClicked = () => {
    navigate("/admin/teacher/create")
  }

  return (
    <Box p={1} component="div" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ConfirmDialog
        loading={loading}
        open={deleteConfirmDialogOpen}
        title="Xoá giáo viên?"
        body={`Bạn có chắc muốn xoá ${selectedRowIds.length} giáo viên?`}
        onClose={handleDeleteConfirmDialogClose}
        onCancel={handleDeleteConfirmDialogClose}
        onConfirm={handleDeleteTeachers}
      />
      {currentTeacher && (
        <EditTeacherFormDialog
          onClose={handleCloseEditTeacherDialog}
          onCancel={handleCloseEditTeacherDialog}
          onSubmit={handleEditTeacher}
          open={editDialogOpen}
          initValue={currentTeacher}
        />
      )}
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
        rowSelectionModel={selectedRowIds}
        onDeleteColumns={handleDeleteStudentBtnClicked}
        onRowSelectionModelChange={handleRowSelectionChanged}
        selectedRowIds={selectedRowIds}
        wrapperSx={{ flex: 1 }}
        rows={rows}
        columns={TEACHER_FIELDS_COLUMNS}
        title="Thông tin giáo viên"
        autoPageSizeOnMount
        {...props}
      />
    </Box>
  )
}

export default AllTeachers
