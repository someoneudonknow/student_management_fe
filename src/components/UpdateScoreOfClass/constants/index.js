import { scoreValidate } from "../../../utils"

export const UPDATE_SCORE_COLUMNS = [
  { field: "id", headerName: "Mã học sinh", flex: 1 },
  { field: "first_name", headerName: "Họ và tên đệm", flex: 2 },
  { field: "last_name", headerName: "Tên", flex: 1 },
  {
    field: "quarter_point_1",
    headerName: "Kiểm tra 15' (Lần 1)",
    flex: 2,
    editable: true,
    validate: (score) => scoreValidate(score),
  },
  {
    field: "quarter_point_2",
    headerName: "Kiểm tra 15' (Lần 2)",
    flex: 2,
    editable: true,
    validate: (score) => scoreValidate(score),
  },
  {
    field: "period_point",
    headerName: "Kiểm tra 1 tiết",
    flex: 1,
    editable: true,
    validate: (score) => scoreValidate(score),
  },
  {
    field: "final_exam_point",
    headerName: "Kiểm tra cuối kỳ",
    flex: 1,
    editable: true,
    validate: (score) => scoreValidate(score),
  },
  {
    field: "AVG_point",
    headerName: "Trung bình",
    flex: 1,
    validate: (score) => scoreValidate(score),
  },
]
