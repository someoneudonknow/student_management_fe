import { Box, Button, Stack, Toolbar } from "@mui/material"
import EditStudentFormDialog from "../../../components/EditStudentFormDialog/EditStudentFormDialog.jsx"
import SearchBox from "../../../components/SearchBox/SearchBox"
import PrimaryTable from "../../../components/PrimaryTable/PrimaryTable"
import { Add, Delete, Edit, FontDownload } from "@mui/icons-material"
import useServerPagination from "../../../hooks/useServerPagination.js"
import { useNavigate } from "react-router-dom"
import StudentService from "../../../services/StudentService"
import { useState, useMemo, useRef } from "react"
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog.jsx"
import useStudentCRUD from "../../../hooks/useStudentCRUD.js"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { STUDENT_FIELDS } from "./constants/index.js"
import { generateODataQueryString } from "../../../utils/index.js"
import AddStudentDialog from "../../../components/ClassesSelection/ClassesSelection.jsx"
import { enqueueSnackbar } from "notistack"

const AllStudents = () => {
  const navigate = useNavigate()
  const studentServiceRef = useRef(new StudentService())
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([])
  const [openAddStudentsToClass, setOpenAddStudentsToClass] = useState(false)
  const { loading, deleteStudents, updateStudent } = useStudentCRUD()
  const { props, rows, setRows, setFilterObj } = useServerPagination({
    fetchDataFunc: async (limit, page, filterObj) => {
      const skip = (page - 1) * limit

      filterObj.skip = skip
      filterObj.top = limit

      const filterQuery = generateODataQueryString(filterObj)
      const res = await studentServiceRef.current.filterStudent(filterQuery)
      const data = res.data.metadata

      return {
        totalPages: data?.totalPages || Math.ceil(data.count / limit),
        page,
        list: data.list,
      }
    },
  })

  const handleFilterChange = (filtersObj) => {
    if(!filtersObj) {
      setFilterObj({})
      return;
    }

    setFilterObj({ filters: filtersObj })
  }

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

  const onSearchChange = (text) => {
    setFilterObj({
      ...(text.trim() !== "" && {
        filters: {
          or: [
            { function: "substringof", args: [text.trim(), "first_name"] },
            { function: "substringof", args: [text.trim(), "last_name"] },
            { function: "substringof", args: [text.trim(), "email"] },
          ],
        },
      }),
    })
  }

  const handleCloseAddStudentToClassDialog = () => {
    setOpenAddStudentsToClass(false)
  }

  const handleOpenAddStudentToClassDialog = () => {
    setOpenAddStudentsToClass(true)
  }

  const handleAddToClass = async (selectedClass) => {
    const selectedIds = selectedRowIds
    try {
      await studentServiceRef.current.addStudentToClass({
        stuIds: selectedIds,
        classId: selectedClass.id,
      })

      setOpenAddStudentsToClass(false)
      enqueueSnackbar("Đã thêm vào lớp thành công", { variant: "success" })
    } catch (e) {
      console.log(e)
      enqueueSnackbar(e.message, { variant: "error" })
    }

    setSelectedRowIds([])
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
      <AddStudentDialog
        onClose={handleCloseAddStudentToClassDialog}
        onCancel={handleCloseAddStudentToClassDialog}
        onSubmit={handleAddToClass}
        open={openAddStudentsToClass}
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
          <SearchBox
            onChange={onSearchChange}
            debounceDelay={500}
            sx={{ minWidth: "400px" }}
            label="Tìm kiếm học sinh"
          />
        </Box>
        <Stack spacing={2} direction="row">
          {selectedRowIds.length > 0 && (
            <Button
              onClick={handleOpenAddStudentToClassDialog}
              startIcon={<FontDownload />}
              color="info"
              variant="contained"
            >
              Thêm vào lớp
            </Button>
          )}
          <Button
            startIcon={<Add />}
            variant="contained"
            color="info"
            onClick={handleAddStudentButtonClicked}
          >
            Thêm học sinh
          </Button>
        </Stack>
      </Toolbar>
      <PrimaryTable
        onFilterChange={handleFilterChange}
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
