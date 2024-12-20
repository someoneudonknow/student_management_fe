import EditSubjectForm from "../EditSubjectForm/EditSubjectForm"
import PrimaryDialog from "../PrimaryDialog/PrimaryDialog"

const EditSubjectFormDialog = ({ initValue, loading, onSubmit, onCancel, ...rest }) => {
  return (
    <PrimaryDialog
      body={
        <EditSubjectForm
          initValue={initValue}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      }
      {...rest}
    />
  )
}

export default EditSubjectFormDialog
