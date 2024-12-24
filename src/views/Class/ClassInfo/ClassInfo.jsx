import { Box, IconButton, Paper, Button, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SearchBox from "../../../components/SearchBox/SearchBox"
import StudentService from "../../../services/StudentService"
import { generateODataQueryString } from "../../../utils"
import StudentCard from "../../../components/StudentCard/StudentCard"
import { Edit, Menu } from "@mui/icons-material"
import { LEADER_ROLE } from "../../../constants/studentRoles"
import ClassService from "../../../services/ClassService"
import { enqueueSnackbar } from "notistack"
import TeacherSelectBox from "../../../components/TeacherSelectBox/TeacherSelectBox"

const ClassInfo = () => {
  const { classId } = useParams()
  const studentServiceRef = useRef(new StudentService())
  const classServiceRef = useRef(new ClassService())
  const [currentClass, setCurrentClass] = useState(null)
  const originalStudents = useRef([])
  const [classStudents, setClassStudents] = useState([])
  const [classManagerHover, setClassManagerHover] = useState(false)
  const navigate = useNavigate()

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

  const classManager = useMemo(() => {
    return currentClass?.class_manager
      ? `${currentClass.class_manager.first_name} ${currentClass.class_manager.last_name}`
      : "Chưa chọn giáo viên chủ nhiệm"
  }, [currentClass?.class_manager])

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

  const updateClass = async (data) => {
    try {
      await classServiceRef.current.update(classId, data)

      enqueueSnackbar("Cập nhật thành công", { variant: "success" })
    } catch (e) {
      console.log(e)
      enqueueSnackbar("Cập nhật thất bại", { variant: "error" })
    }
  }

  const handleStudentRoleUpdate = async (student, role, done) => {
    if (role === LEADER_ROLE) {
      const data = {
        class_leader: student.id,
      }

      await updateClass(data)

      setCurrentClass((prev) => ({ ...prev, class_leader: student.id }))
      done()
    }
  }

  const handleUpdateScore = () => {
    navigate("score")
  }

  const handleClassManagerChange = async (teacher) => {
    try {
      await classServiceRef.current.updateClassManager(classId, teacher.id)
      enqueueSnackbar("Cập nhật thành công", { variant: "success" })
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: "error" })
    }
  }

  return (
    <>
      <Box p={1}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }} py={3}>
          <Box>
            <SearchBox onChange={handleSearchChange} label="Tìm học sinh trong lớp" />
          </Box>
        </Toolbar>
        <Box
          display="inline-flex"
          mt={2}
          ml={1}
          mb={2}
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
          width="100%"
        >
          <Typography mb={1} variant="h5" textAlign="center">
            Giáo viên chủ nhiệm
          </Typography>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
          >
            <Box
              component="div"
              onMouseEnter={handleClassManagerHover}
              onMouseLeave={handleClassManagerLeave}
              sx={{
                border: (theme) => `2px solid ${theme.palette.success.main}`,
                borderRadius: "5px",
                position: "relative",
                p: 1,
              }}
            >
              <TeacherSelectBox
                defaultValue={currentClass?.class_manager}
                sx={{
                  heigth: "100%",
                  width: "300px",
                }}
                onChange={handleClassManagerChange}
              />
            </Box>
            <Button
              variant="contained"
              sx={{ marginRight: "16px", height: "46px", width: "160px" }}
              onClick={handleUpdateScore}
            >
              Nhập điểm
            </Button>
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
    </>
  )
}

export default ClassInfo
