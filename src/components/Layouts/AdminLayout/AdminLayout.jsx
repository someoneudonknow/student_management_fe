import { Box, CssBaseline } from "@mui/material"
import { useState } from "react"
import AdminAppBar from "./AdminAppBar/AdminAppBar"
import SideBar from "./SideBar/SideBar"
import SideBarHeader from "./SideBar/SideBarHeader"

const AdminLayout = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false)

  const handleOpenSideBar = () => {
    setSideBarOpen(true)
  }

  const handleCloseSideBar = () => {
    setSideBarOpen(false)
  }

  return (
    <Box component="div" sx={{
      width: "100%",
      height: "100%",
      display: "flex"
    }}>
      <CssBaseline />
      <SideBar open={sideBarOpen} handleClose={handleCloseSideBar} />
      <AdminAppBar open={sideBarOpen} handleSideBarClose={handleCloseSideBar} handleSideBarOpen={handleOpenSideBar} />
      <Box component="div" sx={{ flexGrol: 1, display: "flex", flexDirection: "column" }}>
        <SideBarHeader />
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout
