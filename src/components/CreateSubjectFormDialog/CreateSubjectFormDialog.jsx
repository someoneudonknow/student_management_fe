import CreateSubjectForm from "../CreateSubjectForm/CreateSubjectForm"
import PrimaryDialog from "../PrimaryDialog/PrimaryDialog"

const CreateSubjectFormDialog = ({ onCancel, onSubmit, ...rest }) => {
  return (
    <PrimaryDialog body={<CreateSubjectForm onCancel={onCancel} onSubmit={onSubmit} />} {...rest} />
  )
}

export default CreateSubjectFormDialog
