import { useCallback, useRef, useState } from "react"
import { enqueueSnackbar } from "notistack"
import TeacherService from "../services/TeacherService"

const useTeacherCRUD = () => {
  const [loading, setLoading] = useState(false)
  const teacherServiceRef = useRef(new TeacherService())

  const createTeacher = useCallback(async (data, onSuccess, onError) => {
    setLoading(true)
    try {
      const response = await teacherServiceRef.current.createTeacher(data)

      onSuccess && onSuccess(response)
      enqueueSnackbar("Thêm gíao viên thành công", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("Lỗi xảy ra khi thêm giáo viên, vui lòng thử lại sau", { variant: "error" })
      onError && onError(err)
    }
    setLoading(false)
  }, [])

  const getTeachers = useCallback(async ({ limit, page }, onSuccess, onError) => {
    setLoading(true)
    try {
      const res = await teacherServiceRef.current.getAllTeachers({
        limit,
        page,
      })

      onSuccess && onSuccess(res)
    } catch (err) {
      enqueueSnackbar("Lỗi xảy ra khi lấy thông tin giáo viên, vui lòng thử lại sau", {
        variant: "error",
      })
      onError && onError(err)
    }
    setLoading(false)
  }, [])

  const updateTeacher = useCallback(async ({ id, teacherData }, onSuccess, onError) => {
    setLoading(true)

    try {
      const updatedResult = await teacherServiceRef.current.updateTeacher({
        id,
        payload: teacherData,
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

  const deleteTeachers = useCallback(async (ids, onSuccess, onError) => {
    setLoading(true)

    try {
      const deletedResult = await teacherServiceRef.current.batchDelete({ ids })
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
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeachers,
  }
}

export default useTeacherCRUD
