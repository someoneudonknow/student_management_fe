import styled from "@emotion/styled"
import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import { SIDE_BAR_WIDTH } from "../constants"
import { AccountBox, Close, Logout, MenuOpen } from "@mui/icons-material"
import ThemeSwitchButton from "../../../ThemeSwitchButton/ThemeSwitchButton"
import { useUser } from "../../../../contexts/UserProvider/UserProvider"
import { Fragment, useMemo, useState } from "react"

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
  const { data, logout } = useUser()
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleSideBar = () => {
    if (open) {
      handleSideBarClose()
    } else {
      handleSideBarOpen()
    }
  }

  const settings = useMemo(() => {
    return [
      {
        title: "Profile",
        icon: <AccountBox />
      },
      {
        title: "Logout",
        icon: <Logout />,
        handler: async () => {
          await logout()
        }
      }
    ]
  }, [])

  return (
    <CustomAppBar position="fixed" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={handleToggleSideBar} edge="start" aria-label="open drawer">
          {!open ? <MenuOpen /> : <Close />}
        </IconButton>
        <Stack direction="row" sx={{ display: "flex", columnGap: "10px" }}>
          <ThemeSwitchButton />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={data?.user?.avatar}>
                  {data?.user?.user_name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="settings-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <div key={setting.title}>
                  {setting.title === "Logout" && <Divider />}
                  <MenuItem sx={{ minWidth: "200px" }} onClick={setting.handler}>
                    <ListItemIcon>
                      {setting.icon}
                    </ListItemIcon>
                    <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
                  </MenuItem>
                </div>
              ))}
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
      <Divider />
    </CustomAppBar>
  )
}

export default AdminAppBar
