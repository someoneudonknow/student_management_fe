import { Box, Button, Typography } from "@mui/material"
import PrimaryModal from "../PrimaryModal/PrimaryModal"

const ConfirmModal = ({ open, handleCloseModal, data, setNewData }) => {
  const handleSave = () => {
    //call api save here using data and call api to set new data forUpdateScore component re-render

    // console.log("data: ", data)
    // setNewData(data)
    handleCloseModal()
  }

  return (
    <PrimaryModal onClose={handleCloseModal} open={open} containerSx={{ width: "40vw" }}>
      <Box component="div" p={3}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
          Thông báo
        </Typography>
        <Typography variant="body1">
          Xác nhận lưu thông tin điểm. Vui lòng kiểm tra lại kỹ thông tin điểm trước khi xác nhận
        </Typography>
        <Box component="div" sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button variant="outlined" onClick={handleCloseModal} sx={{ width: "80px" }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "12px", width: "100px" }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </PrimaryModal>
  )
}

export default ConfirmModal
