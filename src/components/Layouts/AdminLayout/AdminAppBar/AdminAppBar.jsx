import styled from "@emotion/styled"
import { useTheme } from "@mui/material"
import { AppBar, Divider, IconButton, Toolbar, Typography } from "@mui/material"
import { SIDE_BAR_WIDTH } from "../constants"
import { Close, MenuOpen } from "@mui/icons-material"
import ThemeSwitchButton from "../../../ThemeSwitchButton/ThemeSwitchButton"

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: !open ? theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }) : theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  "&.MuiPaper-root": {
    backgroundImage: "none"
  },
  ...(!open && { width: `calc(100% - calc(${theme.spacing(8)} + 1px))`, ml: `calc(${theme.spacing(7)} + 1px)` }),
  ...(open && { width: `calc(100% - ${SIDE_BAR_WIDTH})`, ml: `${SIDE_BAR_WIDTH}` }),
}))

const AdminAppBar = ({ open, handleSideBarOpen, handleSideBarClose }) => {
  const handleToggleSideBar = () => {
    if (open) {
      handleSideBarClose()
    } else {
      handleSideBarOpen()
    }
  }

  return (
    <CustomAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton onClick={handleToggleSideBar} edge="start" aria-label="open drawer">
          {!open ? <MenuOpen /> : <Close />}
        </IconButton>
        <ThemeSwitchButton />
      </Toolbar>
      <Divider />
    </CustomAppBar>
  )
}

export default AdminAppBar
