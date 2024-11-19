import { formatDate } from "../../../../utils"

export const TEACHER_FIELDS = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "first_name",
    headerName: "Họ và tên đệm",
    flex: 2,
  },
  {
    field: "last_name",
    headerName: "Tên",
    flex: 1.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2.5,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    flex: 1,
    valueFormatter: (params) => (params === "Male" ? "Nam" : "Nữ"),
  },
  {
    field: "birthday",
    headerName: "Ngày sinh",
    flex: 1.5,
    valueFormatter: (params) => formatDate(params),
    valueGetter: (value) => value && new Date(value),
  },
  {
    field: "phone_number",
    headerName: "SĐT",
    flex: 1.5,
  },
  {
    field: "first_day_of_work",
    headerName: "Ngày vào làm",
    flex: 1.5,
    valueFormatter: (params) => formatDate(params),
    valueGetter: (value) => value && new Date(value),
  },
  {
    field: "is_retired",
    headerName: "Trạng thái",
    flex: 1,
    valueFormatter: (params) => (params ? "Đã nghỉ hưu" : "Đang dạy"),
  },
]
