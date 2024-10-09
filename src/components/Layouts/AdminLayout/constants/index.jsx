import { Home, People } from "@mui/icons-material"

export const SIDE_BAR_WIDTH = `${270}px`

export const SIDE_BAR_ITEMS = [
  {
    title: "Trang chủ",
    icon: <Home />,
    path: "/admin/dashboard"
  },
  {
    title: "Quản lý học sinh",
    icon: <People />,
    path: "/admin/student"
  }
]
