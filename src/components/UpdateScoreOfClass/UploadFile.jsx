import { Box, Input, Button, Typography, Select, MenuItem } from "@mui/material"
import Grid from "@mui/material/Grid2"
import PrimaryModal from "../PrimaryModal/PrimaryModal"
import { useRef, useState } from "react"
import { enqueueSnackbar } from "notistack"
import * as XLSX from "xlsx"
import ScoreService from "../../services/ScoreService"

const UploadFile = ({ open, handleCloseModal, classId, subjectId, semester, updateData }) => {
  const [excelData, setExcelData] = useState([])
  const [columns, setColumns] = useState([])
  const [mapping, setMapping] = useState({})
  const [selected, setSelected] = useState([])
  const [isShowMoreAction, setIsShowMoreAction] = useState(false)
  const inputRef = useRef()

  const scoreService = new ScoreService()

  const handleUploadFile = () => {
    inputRef.current.click()
  }

  const handleMapId = (e) => {
    if (mapping["id"]) {
      setSelected((prev) => prev.map((el) => (el === mapping["id"] ? e.target.value : el)))
    } else {
      setSelected((prev) => [...prev, e.target.value])
    }

    setMapping((prev) => ({ ...prev, id: e.target.value }))
  }

  const handleMapQuarter1 = (e) => {
    if (mapping["quarter_point_1"]) {
      setSelected((prev) =>
        prev.map((el) => (el === mapping["quarter_point_1"] ? e.target.value : el)),
      )
    } else {
      setSelected((prev) => [...prev, e.target.value])
    }

    setMapping((prev) => ({ ...prev, quarter_point_1: e.target.value }))
  }

  const handleMapQuarter2 = (e) => {
    if (mapping["quarter_point_2"]) {
      setSelected((prev) =>
        prev.map((el) => (el === mapping["quarter_point_2"] ? e.target.value : el)),
      )
    } else {
      setSelected((prev) => [...prev, e.target.value])
    }

    setMapping((prev) => ({ ...prev, quarter_point_2: e.target.value }))
  }

  const handleMapPeriod = (e) => {
    if (mapping["period_point"]) {
      setSelected((prev) =>
        prev.map((el) => (el === mapping["period_point"] ? e.target.value : el)),
      )
    } else {
      setSelected((prev) => [...prev, e.target.value])
    }

    setMapping((prev) => ({ ...prev, period_point: e.target.value }))
  }

  const handleMapFinalExam = (e) => {
    if (mapping["final_exam_point"]) {
      setSelected((prev) =>
        prev.map((el) => (el === mapping["final_exam_point"] ? e.target.value : el)),
      )
    } else {
      setSelected((prev) => [...prev, e.target.value])
    }

    setMapping((prev) => ({ ...prev, final_exam_point: e.target.value }))
  }

  const handleFileUpload = (e) => {
    setIsShowMoreAction(true)

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const binaryStr = event.target.result
      const workbook = XLSX.read(binaryStr, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      const [header, ...rows] = jsonData
      setColumns(header)
      setExcelData(rows)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleSave = async () => {
    const keys = Array.from(Object.keys(mapping))

    if (!keys.includes("id")) {
      enqueueSnackbar("Vui lòng không để trống cột id", { variant: "warning" })
      return
    }
    if (keys.length < 2) {
      enqueueSnackbar("Vui lòng chọn cột để thêm điểm", { variant: "warning" })
      return
    }

    const result = excelData.map((row) => {
      const rowData = {}

      for (let field in mapping) {
        rowData[field] = row[columns.indexOf(mapping[field])]
      }

      return rowData
    })

    await scoreService.updateScoreOfClass(classId, subjectId, semester, result)

    //update data by recall api to get data
    const scoresRes = await scoreService.getScoresOfClass(classId, subjectId, semester)

    console.log(scoresRes.data.metadata)

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

    updateData(scores)

    handleCloseModal()
  }

  return (
    <PrimaryModal open={open} onClose={handleCloseModal} containerSx={{ width: "40vw" }}>
      <Box component="div" p={2} sx={{ width: "100%", borderColor: "rgba(255, 255, 255, 0.8)" }}>
        <Box
          component="div"
          onClick={handleUploadFile}
          sx={{
            width: "100%",
            height: "120px",
            border: "1px dashed #696969",
            borderRadius: "4px",
            textAlign: "center",
            lineHeight: "120px",
            fontSize: "24px",
            userSelect: "none",
            cursor: "pointer",
            opacity: isShowMoreAction ? "0.3" : "1",
          }}
        >
          Upload file here
        </Box>
        <Input
          type="file"
          inputRef={inputRef}
          onChange={handleFileUpload}
          inputProps={{ accept: ".xls,.xlsx,.xlsm,.csv" }}
          sx={{ display: "none" }}
        />
        {isShowMoreAction && (
          <Box component="div" mt={2} mb={2}>
            <Typography variant="h6" mb={2}>
              Lựa chọc các cột trên tệp tin sao cho khớp với dữ liệu
            </Typography>
            <Grid container size={12} spacing={1}>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Typography variant="body1">Mã học sinh:</Typography>
                </Grid>
                <Grid size={6}>
                  <Select sx={{ width: "100%" }} onChange={handleMapId}>
                    {columns.map((el, idx) => (
                      <MenuItem key={idx} value={el} disabled={selected.includes(el)}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Typography variant="body1">Kiểm tra 15' (Lần 1):</Typography>
                </Grid>
                <Grid size={6}>
                  <Select sx={{ width: "100%" }} onChange={handleMapQuarter1}>
                    {columns.map((el, idx) => (
                      <MenuItem key={idx} value={el} disabled={selected.includes(el)}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Typography variant="body1">Kiểm tra 15' (Lần 2):</Typography>
                </Grid>
                <Grid size={6}>
                  <Select sx={{ width: "100%" }} onChange={handleMapQuarter2}>
                    {columns.map((el, idx) => (
                      <MenuItem key={idx} value={el} disabled={selected.includes(el)}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Typography variant="body1">Kiểm tra 1 tiết:</Typography>
                </Grid>
                <Grid size={6}>
                  <Select sx={{ width: "100%" }} onChange={handleMapPeriod}>
                    {columns.map((el, idx) => (
                      <MenuItem key={idx} value={el} disabled={selected.includes(el)}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Typography variant="body1">Kiểm tra cuối kỳ:</Typography>
                </Grid>
                <Grid size={6}>
                  <Select sx={{ width: "100%" }} onChange={handleMapFinalExam}>
                    {columns.map((el, idx) => (
                      <MenuItem key={idx} value={el} disabled={selected.includes(el)}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={handleCloseModal} sx={{ width: "80px" }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "12px", width: "100px" }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </PrimaryModal>
  )
}

export default UploadFile
