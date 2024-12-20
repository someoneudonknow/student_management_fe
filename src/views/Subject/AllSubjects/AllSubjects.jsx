import { Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import SearchBox from "../../../components/SearchBox/SearchBox"
import { Add } from "@mui/icons-material"
import { useEffect, useMemo, useRef, useState } from "react"
import CreateSubjectFormDialog from "../../../components/CreateSubjectFormDialog/CreateSubjectFormDialog"
import SubjectCard from "../../../components/Subject/SubjectCard"
import SubjectService from "../../../services/SubjectService"
import { enqueueSnackbar } from "notistack"
import { createRandomColorPicker } from "../../../helpers/pickRandomColor"
import createColorCycler from "../../../helpers/createColorCycler"
import EditSubjectFormDialog from "../../../components/EditSubjectFormDialog/EditSubjectFormDialog"
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog"

const pickColor = createColorCycler([
  "#2C3E50",
  "#34495E",
  "#8E44AD",
  "#C0392B",
  "#D35400",
  "#1ABC9C",
  "#16A085",
  "#2980B9",
  "#2E86C1",
  "#1D3557",
  "#2B2D42",
  "#6C757D",
])

const AllSubjects = () => {
  const [isShowAddSubjectDialog, setIsShowAddSubjectDialog] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [currentEdittingSubject, setCurrentEdittingSubject] = useState(null)
  const [currentDeletingSubject, setCurrentDeletingSubject] = useState(null)
  const [loading, setLoading] = useState(false)
  const originalSubjectsRef = useRef([])
  const subjectServiceRef = useRef(new SubjectService())

  useEffect(() => {
    ;(async () => {
      const subjectRes = await subjectServiceRef.current.getSubjects()
      const list = subjectRes.data.metadata

      setSubjects(list)
      originalSubjectsRef.current = list
    })()
  }, [])

  const handleOpenCreateSubjectModal = () => {
    setIsShowAddSubjectDialog(true)
  }

  const handleCloseCreateSubjectModal = () => {
    setIsShowAddSubjectDialog(false)
  }

  const handleOpenEditForm = (id) => {
    const foundSubject = originalSubjectsRef.current.find((s) => s.id === id)

    if (foundSubject) {
      setCurrentEdittingSubject(foundSubject)
    }
  }

  const handleCloseEditForm = () => {
    setCurrentEdittingSubject(null)
  }

  const handleOpenDeleteForm = (id) => {
    const foundSubject = originalSubjectsRef.current.find((s) => s.id === id)

    if (foundSubject) {
      setCurrentDeletingSubject(foundSubject)
    }
  }

  const handleCloseDeletingForm = () => {
    setCurrentDeletingSubject(null)
  }

  const handleEditSubject = async (values) => {
    const data = {
      name: values.name,
      number_of_period: values.numberOfPeriod,
    }

    if (!currentEdittingSubject?.id) return

    setLoading(true)
    try {
      const updated = await subjectServiceRef.current.update(currentEdittingSubject.id, data)
      const updatedData = updated.data.metadata

      setSubjects((prev) =>
        [...prev].map((s) => (s.id === currentEdittingSubject.id ? updatedData : s)),
      )
      originalSubjectsRef.current = originalSubjectsRef.current.map((s) =>
        s.id === currentEdittingSubject.id ? updatedData : s,
      )
      enqueueSnackbar("Cập nhật môn học thành công", { variant: "success" })
      setCurrentEdittingSubject(null)
    } catch (e) {
      enqueueSnackbar("Cập nhật môn học thất bại", { variant: "error" })
      console.log(e)
    }

    setLoading(false)
  }

  const handleDeleteSubject = async () => {
    if (!currentDeletingSubject?.id) return
    setLoading(true)
    try {
      await subjectServiceRef.current.deleteSubject(currentDeletingSubject.id)

      originalSubjectsRef.current = originalSubjectsRef.current.filter(
        (s) => s.id !== currentDeletingSubject.id,
      )
      setSubjects((prev) => prev.filter((s) => s.id !== currentDeletingSubject.id))
      enqueueSnackbar("Xoá môn học thành công", { variant: "success" })
      setCurrentDeletingSubject(null)
    } catch (e) {
      enqueueSnackbar("Xoá môn học thất bại", { variant: "error" })
      console.log(e)
    }

    setLoading(false)
  }

  const handleSubmitCreateSubjectForm = async (values) => {
    const data = {
      name: values.name,
      number_of_period: values.numberOfPeriod,
    }

    setLoading(true)
    try {
      const createRes = await subjectServiceRef.current.create(data)

      setSubjects((prev) => [...prev, createRes.data.metadata])
      originalSubjectsRef.current.push(createRes.data.metadata)
      setIsShowAddSubjectDialog(false)

      enqueueSnackbar("Tạo môn học thành công", { variant: "success" })
    } catch (e) {
      console.log(e)
      enqueueSnackbar("Tạo môn học thất bại", { variant: "error" })
    }

    setLoading(false)
  }

  const handleSearchChange = (text) => {
    if (text === "") return setSubjects(originalSubjectsRef.current)

    setSubjects(
      originalSubjectsRef.current.filter((sb) =>
        sb.name.toLowerCase().includes(text.toLowerCase()),
      ),
    )
  }

  return (
    <>
      {currentDeletingSubject && (
        <ConfirmDialog
          open={!!currentDeletingSubject}
          title="Xoá môn học này?"
          body={`Bạn có chắc muốn xoá môn ${currentDeletingSubject.name} với số tiết ${currentDeletingSubject.number_of_period}?`}
          onClose={handleCloseDeletingForm}
          onCancel={handleCloseDeletingForm}
          onConfirm={handleDeleteSubject}
          disableScrollLock
          loading={loading}
        />
      )}
      {currentEdittingSubject && (
        <EditSubjectFormDialog
          open={!!currentEdittingSubject}
          onCancel={handleCloseEditForm}
          onSubmit={handleEditSubject}
          initValue={currentEdittingSubject}
          disableScrollLock
          loading={loading}
        />
      )}
      <CreateSubjectFormDialog
        open={isShowAddSubjectDialog}
        onCancel={handleCloseCreateSubjectModal}
        onSubmit={handleSubmitCreateSubjectForm}
        disableScrollLock
        loading={loading}
      />
      <Box
        p={1}
        px={4}
        component="div"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters py={3}>
          <Box>
            <SearchBox
              onChange={handleSearchChange}
              sx={{ minWidth: "400px" }}
              label="Tìm kiếm môn học"
            />
          </Box>
          <Stack>
            <Button startIcon={<Add />} variant="outlined" onClick={handleOpenCreateSubjectModal}>
              Thêm môn học
            </Button>
          </Stack>
        </Toolbar>
        {subjects.length === 0 && (
          <Typography mt={2} textAlign="center" gutterBottom variant="h5">
            Không có môn học nào
          </Typography>
        )}
        <Stack spacing={2} sx={{}}>
          {subjects.length > 0 &&
            subjects.map((subject) => (
              <SubjectCard
                sx={{
                  bgcolor: pickColor(),
                  "& > *": {
                    color: "white",
                  },
                }}
                subject={subject}
                key={subject.id}
                onEditClick={() => handleOpenEditForm(subject.id)}
                onDeleteClick={() => handleOpenDeleteForm(subject.id)}
              />
            ))}
        </Stack>
      </Box>
    </>
  )
}

export default AllSubjects
