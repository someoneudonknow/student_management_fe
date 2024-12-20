import { Box, Button, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import SearchBox from "../../../components/SearchBox/SearchBox"
import StudentService from "../../../services/StudentService"
import { generateODataQueryString } from "../../../utils"
import StudentCard from "../../../components/StudentCard/StudentCard"
import { CurrencyYen, Edit } from "@mui/icons-material"
import useStudentCRUD from "../../../hooks/useStudentCRUD"
import { LEADER_ROLE } from "../../../constants/studentRoles"
import ClassService from "../../../services/ClassService"
import { enqueueSnackbar } from "notistack"

const ClassInfo = () => {
  const { classId } = useParams()
  const studentServiceRef = useRef(new StudentService())
  const classServiceRef = useRef(new ClassService())
  const [currentClass, setCurrentClass] = useState(null)
  const originalStudents = useRef([])
  const [classStudents, setClassStudents] = useState([])
  const [classManagerHover, setClassManagerHover] = useState(false)

  useEffect(() => {
    if (!classId) return
    ;(async () => {
      const classRef = await classServiceRef.current.getClass(classId)
      const classFound = classRef.data.metadata
      setCurrentClass(classFound)
    })()
  }, [classId])

  useEffect(() => {
    ;(async () => {
      const studentsRes = await studentServiceRef.current.filterStudent(
        generateODataQueryString({
          filters: {
            field: "class",
            operator: "eq",
            value: classId,
          },
          top: 100,
          skip: 0,
        }),
      )

      const studentList = studentsRes.data.metadata.list

      originalStudents.current = studentList
      setClassStudents(studentList)
    })()
  }, [classId])

  const handleClassManagerHover = () => {
    setClassManagerHover(true)
  }

  const handleClassManagerLeave = () => {
    setClassManagerHover(false)
  }

  const handleSearchChange = (text) => {
    if (text === "") setClassStudents(originalStudents.current)

    setClassStudents(
      originalStudents.current.filter((stu) => {
        return (
          `${stu.first_name} ${stu.last_name}`.toLowerCase().includes(text.toLowerCase()) ||
          stu.first_name.toLowerCase().includes(text.toLowerCase()) ||
          stu.last_name.toLowerCase().includes(text.toLowerCase()) ||
          stu.email.toLowerCase().includes(text.toLowerCase())
        )
      }),
    )
  }

  const updateStudentInfo = (student) => {
    setClassStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)))
    originalStudents.current = originalStudents.current.map((s) =>
      s.id === student.id ? student : s,
    )
  }

  const handleStudentRoleUpdate = async (student, role, done) => {
    if (role === LEADER_ROLE) {
      const data = {
        class_leader: student.id,
      }

      try {
        await classServiceRef.current.update(classId, data)

        setCurrentClass((prev) => ({ ...prev, class_leader: student.id }))
        enqueueSnackbar("Cập nhật thành công", { variant: "success" })
        done()
      } catch (e) {
        console.log(e)
        enqueueSnackbar("Cập nhật thất bại", { variant: "error" })
      }
    }
  }

  //TODO: handle edit class manager
  const handleClassManagerEdit = () => {}

  return (
    <Box p={1}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }} py={3}>
        <Box>
          <SearchBox onChange={handleSearchChange} label="Tìm học sinh trong lớp" />
        </Box>
      </Toolbar>
      <Box display="flex" mt={2} mb={2} justifyContent="flex-start">
        <Box
          component="div"
          onMouseEnter={handleClassManagerHover}
          onMouseLeave={handleClassManagerLeave}
          sx={{
            border: (theme) => `2px solid ${theme.palette.success.main}`,
            borderRadius: "5px",
            position: "relative",
            p: 1,
            ml: 1,
          }}
        >
          {classManagerHover && (
            <Paper
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                inset: 0,
                zIndex: 1,
                px: 2,
              }}
            >
              <IconButton color="info">
                <Edit />
              </IconButton>
            </Paper>
          )}
          <Typography variant="h5" textAlign="center">
            Giáo viên chủ nhiệm
          </Typography>
        </Box>
      </Box>
      {classStudents.length === 0 && (
        <Typography variant="body1" textAlign="center">
          Không có học sinh trong lớp này
        </Typography>
      )}
      {classStudents.length > 0 && (
        <Stack
          direction="row"
          justifyContent="space-around"
          flexWrap="wrap"
          rowGap={2}
          columnGap={2}
        >
          {classStudents.map((student) => (
            <StudentCard
              isLeader={currentClass.class_leader === student.id}
              onRoleUpdate={handleStudentRoleUpdate}
              key={student.id}
              student={student}
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default ClassInfo
