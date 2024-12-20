import { Box, Button, Stack, Toolbar } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import ClassService from "../../../services/ClassService"
import ClassCard from "../../../components/ClassCard/ClassCard"
import SearchBox from "../../../components/SearchBox/SearchBox"
import { Add } from "@mui/icons-material"
import CreateClassFormDialog from "../../../components/CreateClassFormDialog/CreateClassFormDialog"
import { useNavigate } from "react-router-dom"
import { enqueueSnackbar } from "notistack"

const AllClasses = () => {
  const classesServiceRef = useRef(new ClassService())
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [openCreateForm, setOpenCreateForm] = useState(false)
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
      setOpenCreateForm(false)
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

  return (
    <>
      <CreateClassFormDialog
        open={openCreateForm}
        onCancel={handleCloseCreateClassModal}
        onSubmit={handleCreateClass}
        disableScrollLock
        loading={loading}
      />
      <Box p={1}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }} py={3}>
          <Box>
            <SearchBox />
          </Box>
          <Stack>
            <Button startIcon={<Add />} variant="outlined" onClick={handleOpenCreateClassModal}>
              Thêm lớp học
            </Button>
          </Stack>
        </Toolbar>
        <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={2}>
          {classes.map((c) => (
            <ClassCard onClick={() => handleClassCardClick(c.id)} key={c.id} classInfo={c} />
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default AllClasses
