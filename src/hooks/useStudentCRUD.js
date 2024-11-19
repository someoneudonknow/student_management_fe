import { useCallback, useRef, useState } from "react"
import StudentService from "../services/StudentService"
import { enqueueSnackbar } from "notistack"

const useStudentCRUD = () => {
  const [loading, setLoading] = useState(false)
  const studentServiceRef = useRef(new StudentService())

  const createStudent = useCallback(async (data, onSuccess, onError) => {
    setLoading(true)
    try {
      const response = await studentServiceRef.current.createStudent(data)

      onSuccess && onSuccess(response)
      enqueueSnackbar("Thêm học sinh thành công", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Lỗi xảy ra khi thêm học sinh, vui lòng thử lại sau", { variant: "error" })
      onError && onError(err)
    }
    setLoading(false)
  }, [])

  const getStudents = useCallback(async ({ limit, page }, onSuccess, onError) => {
    setLoading(true)
    try {
      const res = await studentServiceRef.current.getAllStudents({
        limit,
        page,
      })

      onSuccess && onSuccess(res)
    } catch (err) {
      enqueueSnackbar("Lỗi xảy ra khi lấy thông tin học sinh, vui lòng thử lại sau", {
        variant: "error",
      })
      onError && onError(err)
    }
    setLoading(false)
  }, [])

  const updateStudent = useCallback(async ({ id, studentData }, onSuccess, onError) => {
    setLoading(true)

    try {
      const updatedResult = await studentServiceRef.current.updateStudent({
        id,
        payload: studentData,
      })
      onSuccess && onSuccess(updatedResult)
      enqueueSnackbar("Cập nhật thông tin thành công", { variant: "success" })
    } catch (err) {
      const errMess = err.message
      enqueueSnackbar(errMess, { variant: "error" })
      onError && onError(err)
    }

    setLoading(false)
  }, [])

  const deleteStudents = useCallback(async (ids, onSuccess, onError) => {
    setLoading(true)

    try {
      const deletedResult = await studentServiceRef.current.batchDelete({ ids })
      const {
        data: { metadata },
      } = deletedResult

      if (metadata > 0) {
        enqueueSnackbar(`Đã xoá ${metadata} học sinh`, { variant: "success" })
      } else {
        enqueueSnackbar(`Không thay đổi`, { variant: "info" })
      }

      onSuccess && onSuccess(deletedResult)
    } catch (e) {
      enqueueSnackbar("Có lỗi xảy ra vui lòng thử lại sau", { variant: "error" })
      onError && onError(e)
    }

    setLoading(false)
  }, [])

  return {
    loading,
    createStudent,
    getStudents,
    updateStudent,
    deleteStudents,
  }
}

export default useStudentCRUD
