import { Search } from "@mui/icons-material"
import { InputAdornment, TextField } from "@mui/material"
import debounce from "../../helpers/debounce.js"

const SearchBox = ({ label = "Search", debounceDelay = 0, onChange, ...rest }) => {
  const handleSearchChange = (e) => {
    const searchText = e.target?.value
    onChange(searchText)
  }

  return (
    <TextField
      label={label}
      onChange={debounce(handleSearchChange, debounceDelay)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      size="small"
      {...rest}
    />
  )
}

export default SearchBox
