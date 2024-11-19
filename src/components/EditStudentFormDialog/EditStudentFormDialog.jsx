import PrimaryDialog from "../PrimaryDialog/PrimaryDialog.jsx"
import EditStudentForm from "./EditStudentForm.jsx"

const EditStudentFormDialog = ({ onSubmit, onCancel, initValue, ...rest }) => {
  return (
    <PrimaryDialog
      title="Edit Student"
      body={<EditStudentForm initValue={initValue} onSubmit={onSubmit} onCancel={onCancel} />}
      {...rest}
    />
  )
}

export default EditStudentFormDialog
