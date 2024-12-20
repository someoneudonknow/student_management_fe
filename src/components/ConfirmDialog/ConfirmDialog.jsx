import PrimaryDialog from "../PrimaryDialog/PrimaryDialog"

const ConfirmDialog = ({
  open,
  title = "",
  body = "",
  onConfirm,
  onCancel,
  onClose,
  confirmBtnProps = {},
  cancelBtnProps = {},
  loading = false,
  ...rest
}) => {
  return (
    <PrimaryDialog
      onClose={onClose}
      open={open}
      title={title}
      body={body}
      actions={[
        {
          text: "Huỷ",
          props: {
            onClick: onCancel,
            disabled: loading,
            ...cancelBtnProps,
          },
        },
        {
          text: "Xác nhận",
          props: {
            onClick: onConfirm,
            variant: "contained",
            disabled: loading,
            ...confirmBtnProps,
          },
        },
      ]}
      {...rest}
    />
  )
}

export default ConfirmDialog
