import { useState, useMemo, useEffect, useCallback } from "react"
import { enqueueSnackbar } from "notistack"
import StudentService from "../services/StudentService.js"

const useServerPagination = ({ pageSize = 50, fetchDataFunc }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: pageSize,
    page: 0,
  })
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [totalPages, setTotalPages] = useState(-1)
  const [filterObj, setFilterObj] = useState({})

  const rowCount = useMemo(() => {
    return totalPages !== -1 ? totalPages * paginationModel.pageSize : 0
  }, [totalPages, paginationModel.pageSize])

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const { list, totalPages } = await fetchDataFunc(
          paginationModel.pageSize,
          paginationModel.page + 1,
          filterObj
        )

        setRows(list || [])
        setTotalPages(totalPages || 0)
      } catch (err) {
        enqueueSnackbar(err.message, { variant: "error" })
      }
      setLoading(false)
    })()

    // eslint-disable-next-line
  }, [paginationModel, filterObj])

  const handlePaginationModelChanged = useCallback((paginationModel) => {
    setPaginationModel(paginationModel)
  }, [])

  return {
    rows: rows,
    setRows,
    setFilterObj,
    props: {
      paginationMode: "server",
      rowCount,
      onPaginationModelChange: handlePaginationModelChanged,
      paginationModel,
      loading,
    },
  }
}

export default useServerPagination
