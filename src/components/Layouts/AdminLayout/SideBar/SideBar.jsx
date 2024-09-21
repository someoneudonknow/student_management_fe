import styled from "@emotion/styled"
import { Inbox } from "@mui/icons-material"
import { Avatar, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import SideBarHeader from "./SideBarHeader"
import { SIDE_BAR_WIDTH } from "../constants"
import appLogo from "../../../../assets/images/logo.png"

const openedMixin = (theme) => ({
  width: SIDE_BAR_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)}) + 1px`
  }
})

const SideBar = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: SIDE_BAR_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AdminSideBar = ({ open }) => {
  return (
    <SideBar open={open} variant="permanent" sx={{
      backgroundColor: theme => theme.palette.background.paper
    }}>
      <SideBarHeader sx={{ display: "flex" }}>
        <Avatar src={appLogo} />
        {open && <Typography variant="h6" noWrap>
          Student Management
        </Typography>}
      </SideBarHeader>
      <Divider />
      <List>
        {['Inbox'].map((text) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}
              >
                <Inbox />
              </ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBar>
  )
}

export default AdminSideBar
