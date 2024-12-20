import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

const SubjectCard = ({ subject, onEditClick, onDeleteClick, ...rest }) => {
  return (
    <Card p={2} variant="outlined" {...rest}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {subject?.name || "UNKNOWN"}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{subject?.number_of_period || 0} Tiết</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onEditClick} size="small" variant="contained" color="info">
          Cập nhật
        </Button>
        <Button onClick={onDeleteClick} size="small" variant="contained" color="error">
          Xoá
        </Button>
      </CardActions>
    </Card>
  )
}

export default SubjectCard
