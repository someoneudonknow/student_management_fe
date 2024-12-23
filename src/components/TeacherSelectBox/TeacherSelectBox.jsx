import React, { useState, useEffect } from "react"
import {
  TextField,
  CircularProgress,
  debounce,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import axios from "axios"
import TeacherService from "../../services/TeacherService"
import { useRef } from "react"
import { generateODataQueryString } from "../../utils"
import useDebounce from "../../hooks/useDebounce"

const LIMIT = 20

const TeacherSelectBox = ({ sx, onChange, defaultValue }) => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const teacherServiceRef = useRef(new TeacherService())
  const [selectedTeacher, setSelectedTeacher] = useState(defaultValue || null)

  const fetchData = debounce(async (searchQuery = "", pageNumber = 1) => {
    setLoading(true)
    try {
      const query = generateODataQueryString({
        ...(searchQuery.trim() !== "" && {
          filters: {
            or: [
              { function: "substringof", args: [searchQuery.trim(), "first_name"] },
              { function: "substringof", args: [searchQuery.trim(), "last_name"] },
              { function: "substringof", args: [searchQuery.trim(), "email"] },
              { function: "substringof", args: [searchQuery.trim(), "phone_number"] },
            ],
          },
        }),
        skip: (pageNumber - 1) * LIMIT,
        top: LIMIT,
      })
      const response = await teacherServiceRef.current.filterTeacher(query)
      const fetchedData = response.data.metadata.list

      setData((prev) => (pageNumber === 1 ? fetchedData : [...prev, ...fetchedData])) // Append data for pagination
      setHasMore(pageNumber < response.data.metadata.totalPages)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }, 500)

  useEffect(() => {
    fetchData(search, page)

    // eslint-disable-next-line
  }, [search, page])

  useEffect(() => {
    if (defaultValue) {
      setSelectedTeacher(defaultValue) // Set default value when the component mounts
    }
  }, [defaultValue])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPage(1)
  }

  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight - Math.round(event.target.scrollTop) === event.target.clientHeight

    if (bottom && hasMore && !loading) {
      setPage((prev) => prev + 1)
    }
  }

  const handleSelectionChange = (event, selectedOption) => {
    setSelectedTeacher(selectedOption) // Set selected option
    if (onChange && selectedOption) {
      onChange(selectedOption) // Pass the selected option to the parent component
    }
  }

  return (
    <Autocomplete
      sx={sx}
      options={data}
      getOptionLabel={(option) => option.first_name + " " + option.last_name}
      getOptionSelected={(option, value) => option.id === value.id}
      onInputChange={(event, value) => handleSearchChange({ target: { value } })}
      onOpen={() => setPage(1)}
      loading={loading}
      ListboxProps={{
        onScroll: handleScroll,
      }}
      onChange={handleSelectionChange}
      value={selectedTeacher}
      renderOption={(props, option) => (
        <ListItemButton {...props} key={option.id}>
          <ListItemText
            primary={`${option.first_name} ${option.last_name}`}
            secondary={`Phone number: ${option.phone_number}`}
          />
        </ListItemButton>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Chọn giáo viên"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default TeacherSelectBox
