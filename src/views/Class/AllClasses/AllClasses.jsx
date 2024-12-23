import { Box, Button, Stack, Toolbar } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import ClassService from "../../../services/ClassService"
import ClassCard from "../../../components/ClassCard/ClassCard"
import SearchBox from "../../../components/SearchBox/SearchBox"
import { Add } from "@mui/icons-material"
import CreateClassFormDialog from "../../../components/CreateClassFormDialog/CreateClassFormDialog"
import { useNavigate } from "react-router-dom"
import { enqueueSnackbar } from "notistack"
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog"
import EditClassDialog from "../../../components/EditClassDialog/EditClassDialog"

const AllClasses = () => {
  const classesServiceRef = useRef(new ClassService())
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const [openRemoveClassDialog, setOpenRemoveClassDialog] = useState(false)
  const [editClassDialogOpen, setEditClassDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const classesRes = await classesServiceRef.current.getClasses()
      const list = classesRes.data.metadata

      setClasses(list)
    })()
  }, [])

  const handleOpenCreateClassModal = async () => {
    setOpenCreateForm(true)
  }

  const handleCloseCreateClassModal = async () => {
    setOpenCreateForm(false)
  }

  const handleCreateClass = async (values) => {
    const data = {
      name: values.className,
      grade: values.grade,
    }

    setLoading(true)

    try {
      const res = await classesServiceRef.current.create(data)
      const newClass = res.data.metadata

      setClasses([...classes, newClass])
      enqueueSnackbar("Lớp học đã được tạo thành công", { variant: "success" })
    } catch (e) {
      enqueueSnackbar("Tạo lớp học thất bại", { variant: "error" })
      console.log(e)
    }
    setLoading(false)
  }

  const handleClassCardClick = (id) => {
    navigate(`/admin/classes/${id}`)
  }

  const handleOpenRemoveClassDialog = (id) => {
    setSelectedClass(id)
    setOpenRemoveClassDialog(true)
  }

  const handleCloseRemoveClassDialog = () => {
    setOpenRemoveClassDialog(false)
  }

  const handleRemoveClass = async () => {
    setLoading(true)
    try {
      await classesServiceRef.current.remove(selectedClass)
      setClasses(classes.filter((c) => c.id !== selectedClass))
      enqueueSnackbar("Xóa lớp học thành công", { variant: "success" })
    } catch (e) {
      enqueueSnackbar("Xóa lớp học thất bại", { variant: "error" })
      console.log(e)
    }

    setLoading(false)
    setOpenRemoveClassDialog(false)
    setSelectedClass(null)
  }

  const handleOpenEditClassDialog = (id) => {
    setSelectedClass(id)
    setEditClassDialogOpen(true)
  }
  
  const handleCloseEditClassDialog = () => {
    setEditClassDialogOpen(false)
  }

  const handleEditClass = async (values) => {
    const currentValue = classes.find((c) => c.id === selectedClass)

    try {
      const updated = await classesServiceRef.current.update(selectedClass, {name: values.name, grade: values.grade})
      const updatedData = updated.data.metadata

      setClasses(classes.map((c) => c.id === selectedClass ? {...c, name: updatedData.name, grade: updatedData.grade} : c))
      enqueueSnackbar("Cập nhật lớp học thành công", { variant: "success" })
    }catch(e) {
      enqueueSnackbar("Cập nhật lớp học thất bại", { variant: "error" })
    }

    setSelectedClass(null)
    setEditClassDialogOpen(false)
  }  

  return (
    <>
      <EditClassDialog
        open={editClassDialogOpen}
        onCancel={handleCloseEditClassDialog}
        onClose={handleCloseEditClassDialog}
        onSubmit={handleEditClass}
        disableScrollLock
        loading={loading}
        defaultValues={classes.find((c) => c.id === selectedClass)}
      />
      <ConfirmDialog 
        title="Xóa lớp học" 
        body="Bạn có chắc muốn xoá lớp học này? Tất cả học sinh trong lớp sẽ được chuyển thành trạng thái không có lớp." 
        onConfirm={handleRemoveClass}
        open={openRemoveClassDialog} 
        onClose={handleCloseRemoveClassDialog} 
        onCancel={handleCloseRemoveClassDialog} 
      />
      <CreateClassFormDialog
        open={openCreateForm}
        onCancel={handleCloseCreateClassModal}
        onSubmit={handleCreateClass}
        disableScrollLock
        loading={loading}
      />
      <Box p={1}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }} py={3}>
          {/* TODO: Search (if have time) */}
          <Box>
            <SearchBox />
          </Box>
          <Stack>
            <Button startIcon={<Add />} variant="outlined" onClick={handleOpenCreateClassModal}>
              Thêm lớp học
            </Button>
          </Stack>
        </Toolbar>
        {classes.length === 0 && <Box sx={{ display: "flex", justifyContent: "center" }}>Không có lớp học</Box>}
        {classes.length > 0 && (
          <Stack
          direction="row"
          sx={{ flexWrap: "wrap", justifyContent: "space-evenly", rowGap: 2, columnGap: 2 }}  
        >
          {classes.map((c) => (
            <ClassCard 
              onEditClick={() => handleOpenEditClassDialog(c.id)}
              onRemoveClick={() => handleOpenRemoveClassDialog(c.id)} 
              onClick={() => handleClassCardClick(c.id)} 
              key={c.id} 
              classInfo={c} 
            />
          ))}
        </Stack>
        )}
      </Box>
    </>
  )
}

export default AllClasses
