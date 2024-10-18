import { isValidElement } from "react"
import Dialog from "@mui/material/Dialog"
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const PrimaryDialog = ({ title = "", body = "", actions = [], ...rest }) => {
  return (
    <Dialog {...rest}>
      {typeof title === "string" && <DialogTitle>{title}</DialogTitle>}
      {isValidElement(title) && title}
      <DialogContent>
        {typeof body === "string" && <DialogContentText>{body}</DialogContentText>}
        {isValidElement(body) && body}
      </DialogContent>
      {actions.length > 0 && (
        <DialogActions>
          {actions.map(({ text, props }, idx) => (
            <Button key={idx} {...props}>
              {text}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default PrimaryDialog
