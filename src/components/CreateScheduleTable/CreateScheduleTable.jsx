import Grid from "@mui/material/Grid2"
import { Autocomplete, Box, Select, MenuItem, TextField, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import SubjectService from "../../services/SubjectService.js"
import ScheduleService from "../../services/ScheduleService.js"
import ClassService from "../../services/ClassService.js"
import TeacherService from "../../services/TeacherService.js"

const CreateScheduleTable = () => {
  const gridHeader = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const numberRows = [1, 2, 3, 4, 5]
  const typeOfSchedule = ["Lập lịch học", "Xem lịch giảng dạy"]

  const [typeSchedule, setTypeSchedule] = useState("mainSchedule")
  const [schedules, setSchedules] = useState()
  const [options, setOptions] = useState([])
  const [scheduling, setScheduling] = useState()
  const [list, setList] = useState()
  const [currentSelect, setCurrentSelect] = useState("")

  const subjectService = new SubjectService()
  const scheduleService = new ScheduleService()
  const classService = new ClassService()
  const teacherService = new TeacherService()

  const fetchMainSchedules = async () => {
    const subjectRes = await subjectService.getSubjects()
    const subjects = subjectRes.data.metadata

    const classRes = await classService.getClasses()
    const classes = classRes.data.metadata
    classes.sort((a, b) => a.name.localeCompare(b.name))
    setList(classes)

    const schedulesRes = await scheduleService.getSchedules()
    setSchedules(schedulesRes.data.metadata)

    setCurrentSelect(classes[0].id)

    //update subject constraint for each class
    const currentSchedule = schedulesRes.data.metadata[classes[0].id]
    if (currentSchedule) {
      for (const schedule of currentSchedule) {
        const foundSubject = subjects.find((el) => el.id === schedule.subject)

        if (foundSubject) {
          foundSubject.number_of_period--
        }
      }
    }

    setOptions(subjects)
  }

  const fetchSubSchedules = async () => {
    const schedulesRes = await scheduleService.getTeacherSchedules()
    const teachersRes = await teacherService.getAllTeachers({ page: 1, limit: 20 })

    console.log("schedulesRes: ", schedulesRes)

    setSchedules(schedulesRes.data.metadata)
    setList(teachersRes.data.metadata.list)
    setCurrentSelect(teachersRes.data.metadata.list[0].id)
  }

  const handleChangeType = () => {
    if (typeSchedule.startsWith("main")) {
      setTypeSchedule("subSchedule")
      fetchSubSchedules()
    } else {
      setTypeSchedule("mainSchedule")
      fetchMainSchedules()
    }
  }

  const handleUpdateScheduling = async (subjectId, dayIdx, orderPeriod) => {
    if (!currentSelect || currentSelect === "") {
      enqueueSnackbar("Vui lòng chọn lớp", { variant: "warning" })
      return
    }

    //must handle call api first to check has any wrong before change
    const day = days[dayIdx]

    try {
      await scheduleService.checkSchedule({
        subject: subjectId,
        day,
        sectionOrder: orderPeriod + 1,
        classId: currentSelect,
      })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" })
      return
    }

    const findSchedulingIdx = schedules[currentSelect]?.findIndex(
      (el) => el.day === day && el.section_order === orderPeriod + 1,
    )

    if (!subjectId) {
      setOptions((prev) =>
        prev.map((el) => {
          if (el.id === schedules[currentSelect][findSchedulingIdx].subject) {
            el.number_of_period++
          }
          return el
        }),
      )
      const newSchedule = schedules[currentSelect].splice(findSchedulingIdx, 1)
      setSchedules((prev) => ({ ...prev, currentSelect: newSchedule }))
      return
    }

    if (findSchedulingIdx > -1) {
      setOptions((prev) =>
        prev.map((subject) => {
          if (subject.id === subjectId) {
            --subject.number_of_period
          } else if (subject.id === schedules[currentSelect][findSchedulingIdx].subject) {
            ++subject.number_of_period
          }
          return subject
        }),
      )

      const newScheduling = schedules[currentSelect]
      newScheduling.splice(findSchedulingIdx, 1, {
        subject: subjectId,
        day,
        section_order: orderPeriod + 1,
        name: options.find((el) => el.id === subjectId).name,
      })
      setSchedules((prev) => ({ ...prev, currentSelect: newScheduling }))
    } else {
      setOptions((prev) =>
        prev.map((subject) => {
          if (subject.id === subjectId) {
            subject.number_of_period--
          }
          return subject
        }),
      )

      const currentSchedule = schedules[currentSelect].push({
        subject: subjectId,
        day,
        section_order: orderPeriod + 1,
        name: options.find((el) => el.id === subjectId).name,
      })
      setSchedules((prev) => ({
        ...prev,
        currentSelect: currentSchedule,
      }))
    }
  }

  const handleSetSelect = async (e) => {
    setCurrentSelect(e.target.value)
    const subjectRes = await subjectService.getSubjects()
    const subjects = subjectRes.data.metadata

    const currentSchedule = schedules[e.target.value]
    if (currentSchedule?.length > 0) {
      for (const schedule of currentSchedule) {
        const foundSubject = subjects.find((el) => el.id === schedule.subject)

        if (foundSubject) {
          foundSubject.number_of_period--
        }
      }
    } else {
      setSchedules((prev) => ({ ...prev, [e.target.value]: [] }))
    }

    setOptions(subjects)
  }

  useEffect(() => {
    fetchMainSchedules()
  }, [])

  useEffect(() => {
    const currentSchedule = schedules?.[currentSelect] ?? []

    // console.log("current schedules: ", currentSchedule)

    let result = Array.from({ length: 5 }, () => new Array(days.length))
    if (currentSchedule.length > 0) {
      for (const schedule of currentSchedule) {
        let row = schedule.section_order - 1
        let column = days.findIndex((el) => el === schedule.day)

        result[row][column] = schedule
      }
    }

    // console.log("result: ", result)

    setScheduling(result)
  }, [currentSelect, schedules])

  // console.log("scheduling: ", scheduling)
  console.log("list: ", list)
  console.log("currentSelect: ", currentSelect)
  console.log("scheduling: ", scheduling)
  console.log("schedulés: ", schedules)

  return (
    <Box component="div" sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4, lg: 4, xl: 4 }} offset={0}>
          <Select
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={handleChangeType}
            value={typeSchedule.startsWith("main") ? typeOfSchedule[0] : typeOfSchedule[1]}
            defaultValue={typeOfSchedule[0]}
          >
            {typeOfSchedule.map((el, idx) => (
              <MenuItem key={idx} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          size={{ xs: 6, md: 4, lg: 2, xl: 2 }}
          offset={6}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Select
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={handleSetSelect}
            value={currentSelect}
            defaultValue={list?.[0]?.id}
          >
            {list &&
              list.map((el, idx) => (
                <MenuItem key={idx} value={el.id}>
                  {typeSchedule.startsWith("main") ? el.name : `${el.first_name} ${el.last_name}`}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {typeSchedule.startsWith("main") ? "Thời khoá biểu" : "Lịch giảng dạy"}
        </Typography>
        <Grid container size={{ xs: 12 }}>
          {gridHeader.map((el, idx) => (
            <Grid
              key={idx}
              size={2}
              sx={{
                textAlign: "center",
              }}
            >
              {el}
            </Grid>
          ))}
        </Grid>
        {numberRows.map((parentEl, parentIdx) => (
          <Grid key={parentEl} container size={12} sx={{ textAlign: "center" }}>
            {gridHeader.map((_, childIdx) => (
              <Grid key={`${parentIdx}-${childIdx}`} size={2}>
                <Autocomplete
                  value={scheduling?.[parentIdx]?.[childIdx] || null}
                  disableClearable={false}
                  options={options}
                  disabled={!currentSelect || typeSchedule.startsWith("sub")}
                  getOptionDisabled={(option) => option.number_of_period === 0}
                  getOptionLabel={(option) =>
                    typeSchedule.startsWith("main") ? option.name : option.class_name
                  }
                  onChange={(_, val) => handleUpdateScheduling(val?.id, childIdx, parentIdx)}
                  renderInput={(params) => <TextField {...params} />}
                  clearOnEscape
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CreateScheduleTable
