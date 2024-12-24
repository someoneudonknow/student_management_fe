import { formatAddressToString, formatDate } from "../../../../utils"

export const STUDENT_FIELDS = [
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
    // valueFormatter: (params) => (params === "Male" ? "Nam" : "Nữ"),
  },
  {
    field: "birthday",
    headerName: "Ngày sinh",
    type: "datetime",
    flex: 1.5,
    valueFormatter: (params) => formatDate(params),
    valueGetter: (value) => value && new Date(value),
  },
  {
    field: "country",
    headerName: "Quê quán",
    flex: 1.5,
  },
  {
    field: "admission_day",
    headerName: "Ngày nhập học",
    type: "datetime",
    flex: 1.5,
    valueFormatter: (params) => formatDate(params),
    valueGetter: (value) => value && new Date(value),
  },
  {
    field: "Address",
    headerName: "Địa chỉ",
    flex: 2,
    valueFormatter: (value) => formatAddressToString(value),
    filterable: false,
  },
  {
    field: "Class",
    headerName: "lớp học",
    flex: 1,
    valueFormatter: (value) => {
      return value?.name ? value.name : "Chưa chọn lớp"
    },
    filterable: false,
  },
]
