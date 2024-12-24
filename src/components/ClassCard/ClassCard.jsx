import { Edit, Remove, Visibility } from "@mui/icons-material"
import { Box, Card, CardContent, Divider, IconButton, Typography } from "@mui/material"
import { useMemo, useState } from "react"

const ClassCard = ({ classInfo, onClick, onRemoveClick, onEditClick }) => {
  const [hover, setHover] = useState(false)

  const classLeaderName = useMemo(() => {
    return classInfo?.class_leader
      ? `${classInfo.class_leader?.first_name} ${classInfo?.class_leader?.last_name}`
      : "Chưa chọn"
  }, [classInfo?.class_leader])

  const classManagerName = useMemo(() => {
    return classInfo.class_manager
      ? `${classInfo.class_manager.first_name} ${classInfo.class_manager.last_name}`
      : "Chưa chọn"
  }, [classInfo?.class_manager])

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <Card
      component="div"
      sx={{
        border: "1px solid black",
        position: "relative",
        width: "16.6666667%",
      }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {hover && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            zIndex: 1,
            backgroundColor: "background.paper",
          }}
        >
          <IconButton color="info" onClick={onClick}>
            <Visibility />
          </IconButton>
          <IconButton color="success" onClick={onEditClick}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={onRemoveClick}>
            <Remove />
          </IconButton>
        </Box>
      )}
      <CardContent sx={{ height: "100%", width: "100%" }}>
        <Typography textAlign="center" variant="h4" sx={{ fontWeight: "bold" }}>
          {classInfo.name}
        </Typography>
        <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
          <strong>Sỉ số: </strong>
          {classInfo.size} học sinh
        </Typography>
        <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
          <strong>Khối: </strong>
          {classInfo.grade}
        </Typography>
        {/* <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
          Giáo viên chủ nhiệm: {classManagerName}
        </Typography>
        <Divider />
        <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
          Lớp trưởng: {classLeaderName}
        </Typography> */}
      </CardContent>
    </Card>
  )
}

export default ClassCard
