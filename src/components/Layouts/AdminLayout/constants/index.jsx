import { Book, CalendarMonth, Home, People, Person4 } from "@mui/icons-material"

export const SIDE_BAR_WIDTH = `${270}px`

export const SIDE_BAR_ITEMS = [
  {
    title: "Trang chủ",
    icon: <Home />,
    path: "/admin/dashboard",
  },
  {
    title: "Quản lý học sinh",
    icon: <People />,
    path: "/admin/student",
  },
  {
    title: "Quản lý giáo viên",
    icon: <Person4 />,
    path: "/admin/teacher",
  },
  {
    title: "Quản lý môn học",
    icon: <Book />,
    path: "/admin/subject",
  },
  {
    title: "Thêm thời khoá biểu",
    icon: <CalendarMonth />,
    path: "/admin/schedule",
  },
]
