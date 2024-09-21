import { IconButton } from "@mui/material"
import { useAppTheme } from "../../contexts/ThemeProvider/ThemeProvider"
import { DarkMode, WbSunny } from "@mui/icons-material"

const ThemeSwitchButton = () => {
  const { mode, toggleMode } = useAppTheme()

  return (
    <IconButton onClick={toggleMode}>
      {mode === "light" && <WbSunny />}
      {mode === "dark" && <DarkMode />}
    </IconButton>
  )
}

export default ThemeSwitchButton
