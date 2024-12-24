import React from 'react'
import { useEffect, useRef, useState } from "react"
import SubjectService from "../../services/SubjectService"
import FormAutoComplete from "../FormAutoComplete/FormAutoComplete"

const SubjectsSelectionBox = ({ 
  name,
  control, 
  rules = {},
  label = "Môn học",
  disabled = false,
  handleSetState
}) => {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)
  const subjectServiceRef = useRef(new SubjectService())

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true)
      try {
        const response = await subjectServiceRef.current.getSubjects()
        console.log(response)
        setSubjects(response.data.metadata)
      } catch (error) {
        console.error("Error fetching subjects:", error)
      }
      setLoading(false)
    }

    fetchSubjects()
  }, [])

  return (
    <FormAutoComplete
      name={name}
      control={control}
      rules={rules}
      disabled={disabled || loading}
      options={subjects}
      label="name"
      displayLabel={label}
      handleSetState={handleSetState}
    />
  )
}

export default SubjectsSelectionBox