import CreateSubjectForm from "../CreateSubjectForm/CreateSubjectForm"
import PrimaryDialog from "../PrimaryDialog/PrimaryDialog"

const CreateSubjectFormDialog = ({ onCancel, onSubmit, loading, ...rest }) => {
  return (
    <PrimaryDialog
      body={<CreateSubjectForm loading={loading} onCancel={onCancel} onSubmit={onSubmit} />}
      {...rest}
    />
  )
}

export default CreateSubjectFormDialog
