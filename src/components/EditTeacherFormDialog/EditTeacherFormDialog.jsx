import PrimaryDialog from "../PrimaryDialog/PrimaryDialog"
import EditTeacherForm from "./EditTeacherForm"

const EditTeacherFormDialog = ({ onSubmit, onCancel, initValue, ...rest }) => {
  return (
    <PrimaryDialog
      title="Edit Teacher"
      body={<EditTeacherForm initValue={initValue} onSubmit={onSubmit} onCancel={onCancel} />}
      {...rest}
    />
  )
}

export default EditTeacherFormDialog
