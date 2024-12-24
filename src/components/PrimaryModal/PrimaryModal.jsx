import { Backdrop, Box, Fade, Modal, Slide } from "@mui/material"

const PrimaryModal = ({ backdrop, onClose, open, children, containerSx = {}, ...rest }) => {
  const backdropProps = backdrop
    ? {
        slots: { backdrop: Backdrop },
        slotProps: {
          backdrop: {
            timeout: backdrop?.timeout || 500,
          },
        },
      }
    : {}

  return (
    <Modal open={open} onClose={onClose} {...backdropProps} {...rest}>
      <Fade unmountOnExit in={open}>
        <Box
          sx={{
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 2,
            boxShadow: 24,
            ...containerSx,
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}

export default PrimaryModal
