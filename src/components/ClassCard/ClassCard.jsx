import { Card, CardActionArea, CardContent, Divider, Typography } from "@mui/material"

const ClassCard = ({ classInfo, onClick }) => {
  console.log({ classInfo })

  return (
    <Card sx={{ border: "1px solid black", width: "16.6666667%", aspectRatio: 1 / 1 }}>
      <CardActionArea onClick={onClick} sx={{ height: "100%" }}>
        <CardContent>
          <Typography textAlign="center" variant="h4" sx={{ fontWeight: "bold" }}>
            {classInfo.name}
          </Typography>
          <Divider />
          <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
            Sỉ số hiện tại: {classInfo.size}
          </Typography>
          <Divider />
          <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
            Giáo viên chủ nhiệm: Lê Ngọc Hiếu
          </Typography>
          <Divider />
          <Typography mt={1} variant="body2" sx={{ fontSize: "17px" }}>
            Lớp trưởng: Trần Văn Nguyễn Tú
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ClassCard
