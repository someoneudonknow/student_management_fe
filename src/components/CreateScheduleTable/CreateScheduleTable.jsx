import Grid from "@mui/material/Grid2"
import { Autocomplete, Box, Select, MenuItem, TextField } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import SubjectService from "../../services/SubjectService.js"
import ScheduleService from "../../services/ScheduleService.js"
import ClassService from "../../services/ClassService.js"

const CreateScheduleTable = () => {
  const gridHeader = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const numberRows = [1, 2, 3, 4, 5]

  const [schedules, setSchedules] = useState()
  const [subjects, setSubjects] = useState([])
  const [scheduling, setScheduling] = useState()
  const [classes, setClasses] = useState()
  const [currentClass, setCurrentClass] = useState("")

  const subjectService = new SubjectService()
  const scheduleService = new ScheduleService()
  const classService = new ClassService()

  const handleUpdateScheduling = async (subjectId, dayIdx, orderPeriod) => {
    if (!currentClass || currentClass === "") {
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
        classId: currentClass,
      })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" })
      return
    }

    const findSchedulingIdx = schedules[currentClass].findIndex(
      (el) => el.day === day && el.section_order === orderPeriod + 1,
    )

    if (!subjectId) {
      setSubjects((prev) =>
        prev.map((el) => {
          if (el.id === schedules[currentClass][findSchedulingIdx].subject) {
            el.number_of_period++
          }
          return el
        }),
      )

      const newSchedule = schedules[currentClass].splice(findSchedulingIdx, 1)
      setSchedules((prev) => ({ ...prev, currentClass: newSchedule }))
      return
    }

    if (findSchedulingIdx !== -1) {
      // if (!subjectId) {
      //   setSubjects((prev) =>
      //     prev.map((el) => {
      //       if (el.id === schedules[currentClass][findSchedulingIdx].subject) {
      //         el.number_of_period++
      //       }
      //       return el
      //     }),
      //   )

      //   const newScheduling = JSON.parse(JSON.stringify(schedules[currentClass]))
      //   newScheduling.splice(findSchedulingIdx, 1)
      //   setSchedules((prev) => ({ ...prev, currentClass: newScheduling }))
      // } else {
      setSubjects((prev) =>
        prev.map((subject) => {
          if (subject.id === subjectId) {
            --subject.number_of_period
          } else if (subject.id === schedules[currentClass][findSchedulingIdx].subject) {
            ++subject.number_of_period
          }
          return subject
        }),
      )

      const newScheduling = JSON.parse(JSON.stringify(schedules[currentClass]))
      newScheduling.splice(findSchedulingIdx, 1, {
        subject: subjectId,
        day,
        section_order: orderPeriod + 1,
        name: subjects.find((el) => el.id === subjectId).name,
      })
      setSchedules((prev) => ({ ...prev, currentClass: newScheduling }))
      // }
    } else {
      setSubjects((prev) =>
        prev.map((subject) => {
          if (subject.id === subjectId) {
            subject.number_of_period--
          }
          return subject
        }),
      )

      const currentSchedule = schedules[currentClass].push({
        subject: subjectId,
        day,
        section_order: orderPeriod + 1,
        name: subjects.find((el) => el.id === subjectId).name,
      })
      setSchedules((prev) => ({
        ...prev,
        currentClass: currentSchedule,
      }))
    }
  }
  const handleSetClass = async (e) => {
    setCurrentClass(e.target.value)
    const subjectRes = await subjectService.getSubjects()
    const subjects = subjectRes.data.metadata

    const currentSchedule = schedules[classes[0].id]
    for (const schedule of currentSchedule) {
      const foundSubject = subjects.find((el) => el.id === schedule.subject)

      if (foundSubject) {
        foundSubject.number_of_period--
      }
    }

    setSubjects(subjects)
  }

  useEffect(() => {
    const fetchData = async () => {
      const subjectRes = await subjectService.getSubjects()
      const subjects = subjectRes.data.metadata

      const classRes = await classService.get()
      const classes = classRes.data.metadata.list
      classes.sort((a, b) => a.name.localeCompare(b.name))
      setClasses(classes)

      const schedulesRes = await scheduleService.getSchedules()
      setSchedules(schedulesRes.data.metadata)

      setCurrentClass(classes[0].id)

      //update subject constraint for each class
      const currentSchedule = schedulesRes.data.metadata[classes[0].id]
      for (const schedule of currentSchedule) {
        const foundSubject = subjects.find((el) => el.id === schedule.subject)

        if (foundSubject) {
          foundSubject.number_of_period--
        }
      }

      setSubjects(subjects)
    }

    fetchData()

    // set schedule of current class here
  }, [])
  useEffect(() => {
    const currentSchedule = schedules?.[currentClass] ?? []

    let result = Array.from({ length: 5 }, () => new Array(days.length))
    for (const schedule of currentSchedule) {
      let row = schedule.section_order - 1
      let column = days.findIndex((el) => el === schedule.day)

      result[row][column] = schedule
    }

    setScheduling(result)
  }, [currentClass, schedules])

  return (
    <Box component="div" sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 6, md: 4, lg: 4, xl: 4 }}
          offset={10}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Select
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={handleSetClass}
            value={currentClass}
            defaultValue={classes?.[0].id}
          >
            {classes &&
              classes.map((el, idx) => (
                <MenuItem key={idx} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
        </Grid>
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
            {gridHeader.map((childEl, childIdx) => (
              <Grid key={`${parentIdx}${childEl}`} size={2}>
                <Autocomplete
                  value={scheduling?.[parentIdx]?.[childIdx] || null}
                  disableClearable={false}
                  options={subjects}
                  disabled={!currentClass}
                  getOptionDisabled={(option) => option.number_of_period === 0}
                  getOptionLabel={(option) => option.name}
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
