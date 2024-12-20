import PrimaryDialog from "../PrimaryDialog/PrimaryDialog"
import CreateClassForm from "./CreateClassForm/CreateClassForm"

const CreateClassFormDialog = ({ onCancel, onSubmit, loading, ...rest }) => {
  return (
    <PrimaryDialog
      body={<CreateClassForm loading={loading} onCancel={onCancel} onSubmit={onSubmit} />}
      {...rest}
    />
  )
}

export default CreateClassFormDialog
