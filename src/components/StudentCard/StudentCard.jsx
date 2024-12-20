import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Typography,
  Menu,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Checkbox,
} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import OverFlowableTypography from "../UI/OverFlowableTypography"
import { Edit, Remove, School } from "@mui/icons-material"
import { LEADER_ROLE, STUDENT_ROLE } from "../../constants/studentRoles"

const StudentCard = ({ student, isLeader, onRoleUpdate, onRemoveFromClassClick, sx, ...rest }) => {
  const [hover, setHover] = useState(false)
  const [changeRoleMenuAnchor, setChangeRoleMenuAnchor] = useState(null)

  const studentFullName = useMemo(() => {
    return `${student.first_name} ${student.last_name}`
  }, [student.first_name, student.last_name])

  const handleCardHover = () => {
    setHover(true)
  }

  const handleCardLeave = () => {
    setHover(false)
  }

  const handleChangeRoleMenuOpen = (event) => {
    setChangeRoleMenuAnchor(event.currentTarget)
  }

  const handleChangeRoleMenuClose = () => {
    setChangeRoleMenuAnchor(null)
  }

  const handleStudentRoleChange = (role) => {
    onRoleUpdate(student, role, () => {
      handleChangeRoleMenuClose()
    })
  }

  //TODO: handle remove student from class
  const handleRemoveStudentFromClass = (student) => {}

  return (
    <Card
      component="div"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      sx={{
        width: "calc(100% / 7)",
        position: "relative",
        border: "1px solid black",
        aspectRatio: "1/1",
        ...sx,
      }}
    >
      <Menu
        open={!!changeRoleMenuAnchor}
        onClose={handleChangeRoleMenuClose}
        anchorEl={changeRoleMenuAnchor}
        disableScrollLock
      >
        <List>
          <ListItemButton onClick={() => handleStudentRoleChange(STUDENT_ROLE)}>
            <ListItemIcon>
              <Checkbox checked={!isLeader} edge="start" />
            </ListItemIcon>
            <ListItemText primary={`Học sinh`} />
          </ListItemButton>
          <ListItemButton onClick={() => handleStudentRoleChange(LEADER_ROLE)}>
            <ListItemIcon>
              <Checkbox checked={isLeader} edge="start" />
            </ListItemIcon>
            <ListItemText primary={`Lớp trưởng`} />
          </ListItemButton>
        </List>
      </Menu>
      {isLeader && (
        <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
          <School />
        </Box>
      )}
      <Paper
        component="div"
        sx={{
          position: "absolute",
          inset: 0,
          color: "color.secondary.contrastText",
          textAlign: "left",
          zIndex: 1,
          p: 2,
          display: hover ? "flex" : "none",
          visibility: hover ? "visible" : "hidden",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleChangeRoleMenuOpen} color="info">
          <Edit />
        </IconButton>
        <IconButton color="error">
          <Remove />
        </IconButton>
      </Paper>
      <CardActionArea sx={{ height: "100%", width: "100%" }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">
            {studentFullName}
          </Typography>
          <OverFlowableTypography variant="body2" mt={1} textAlign="center">
            {student.email}
          </OverFlowableTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default StudentCard
