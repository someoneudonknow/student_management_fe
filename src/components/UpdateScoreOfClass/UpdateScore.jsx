import { Box, Button, MenuItem, Select } from "@mui/material"
import PrimaryTable from "../PrimaryTable/PrimaryTable"
import { UPDATE_SCORE_COLUMNS } from "./constants/index"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SubjectService from "../../services/SubjectService"
import SearchBox from "../SearchBox/SearchBox"
import ScoreService from "../../services/ScoreService"
import { enqueueSnackbar } from "notistack"
// import ConfirmModal from "./ConfirmModal"
import UploadFile from "./UploadFile"

const UpdateScore = () => {
  //get data and add into rows as state
  const [rows, setRows] = useState([])
  const [curSubject, setCurSubject] = useState("")
  const [subjects, setSubjects] = useState([])
  const [curSemester, setCurSemester] = useState("")
  const [isFileUpload, setIsFileUpload] = useState(false)
  // const [onEdit, setOnEdit] = useState(false)
  // const [isShowConfirm, setIsShowConfirm] = useState(false)
  const { classId } = useParams()
  const semester = [
    { value: "I", label: "Học kỳ I" },
    { value: "II", label: "Học kỳ II" },
  ]
  const scoreFields = [
    "quarter_point_1",
    "quarter_point_2",
    "period_point",
    "final_exam_point",
    "AVG_point",
  ]

  const subjectService = new SubjectService()
  const scoreService = new ScoreService()

  const handleSetSubject = (e) => {
    setCurSubject(e.target.value)
  }

  const handleSetSemester = (e) => {
    setCurSemester(e.target.value)
  }

  const handleScoreUpdate = async (newRow) => {
    for (let field of scoreFields) {
      const value = newRow[field]
      if (value) {
        const score = parseFloat(value)
        if (isNaN(score) || score < 0 || score > 10) {
          enqueueSnackbar("Error", { variant: "error" })
          return
        }
        if (!isNaN(score) && score > -1 && score < 11) {
          setRows((prev) => prev.map((row) => (row.id === newRow.id ? { ...newRow } : row)))
          // if (!onEdit) setOnEdit(true)

          //call api and save
          const payload = {}
          for (let field of scoreFields) {
            if (newRow[field]) {
              payload[field] = newRow[field]
            }
          }

          await scoreService.updateScore(newRow.id, curSubject, curSemester, payload)
        }
      }
    }
  }

  const handleScoreUpdateError = () => {}

  // const setIsShowConfirmModal = () => {
  //   setIsShowConfirm(true)
  // }

  const setIsUploadFile = () => {
    setIsFileUpload(true)
  }

  // const setIsCloseConfirmModal = () => {
  //   setIsShowConfirm(false)
  // }

  const setIsCloseUploadFile = () => {
    setIsFileUpload(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const subjectsRes = await subjectService.getSubjects()
      setSubjects(subjectsRes.data.metadata)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (curSemester && curSubject) {
        const scoresRes = await scoreService.getScoresOfClass(classId, curSubject, curSemester)
        const scores = scoresRes.data.metadata.map((el) => {
          const result = {
            id: el.Student.id,
            first_name: el.Student.first_name,
            last_name: el.Student.last_name,
            quarter_point_1: el.quarter_point_1,
            quarter_point_2: el.quarter_point_2,
            period_point: el.period_point,
            final_exam_point: el.final_exam_point,
            AVG_point: el.AVG_point,
          }

          return result
        })
        setRows(scores)
      }
    }

    fetchData()
  }, [curSemester, curSubject])

  console.log("rows: ", rows)

  return (
    <Box p={1} component="div" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBox />
        <Box component="div" sx={{ display: "flex", justifyContent: "flex-end", width: "40vw" }}>
          <Select
            value={curSubject}
            label="Môn học"
            onChange={handleSetSubject}
            sx={{ width: "160px", height: "46px" }}
          >
            {subjects.length > 0 &&
              subjects.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
          <Select
            value={curSemester}
            label="Học kỳ"
            onChange={handleSetSemester}
            sx={{ width: "160px", marginLeft: "16px", height: "46px" }}
          >
            {semester.map((el, idx) => (
              <MenuItem key={idx} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="outlined"
            disabled={!curSemester || !curSubject}
            onClick={setIsUploadFile}
            sx={{ height: "46px", marginLeft: "16px" }}
          >
            Tải tệp lên
          </Button>
          {/* <Button
            variant="contained"
            disabled={!onEdit}
            onClick={setIsShowConfirmModal}
            sx={{ height: "46px", marginLeft: "16px", width: "100px" }}
          >
            Lưu
          </Button> */}
        </Box>
      </Box>
      <PrimaryTable
        title="Nhập điểm"
        checkboxSelection={false}
        disableRowSelectionOnClick
        onDeleteColumns={false}
        columns={UPDATE_SCORE_COLUMNS}
        rows={rows}
        wrapperSx={{ flex: 1 }}
        processRowUpdate={handleScoreUpdate}
        onProcessRowUpdateError={handleScoreUpdateError}
      />
      {isFileUpload && (
        <UploadFile
          open={isFileUpload}
          handleCloseModal={setIsCloseUploadFile}
          classId={classId}
          subjectId={curSubject}
          semester={curSemester}
          updateData={setRows}
        />
      )}
      {/* {isShowConfirm && (
        <ConfirmModal
          open={isShowConfirm}
          handleCloseModal={setIsCloseConfirmModal}
          data={rows}
          setNewData={setRows}
        />
      )} */}
    </Box>
  )
}

export default UpdateScore
