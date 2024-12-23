import React from 'react'
import PrimaryDialog from '../PrimaryDialog/PrimaryDialog'
import EditClassForm from './EditClassForm'

const EditClassDialog = ({open, defaultValues, onClose, onCancel, onSubmit }) => {
  return (
    <PrimaryDialog
      open={open}
      body={<EditClassForm defaultValues={defaultValues} onCancel={onCancel} onSubmit={onSubmit} />}
      onClose={onClose}
    />
  )
}

export default EditClassDialog