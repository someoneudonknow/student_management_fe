export function createRandomColorPicker(colors) {
  if (!Array.isArray(colors) || colors.length < 2) {
    throw new Error("You must provide at least two colors in an array.")
  }

  let lastColor = null

  return function pickColor(opacity = 1) {
    if (opacity < 0 || opacity > 1) {
      throw new Error("Opacity must be a value between 0 and 1.")
    }

    const availableColors = colors.filter((color) => color !== lastColor)
    const randomIndex = Math.floor(Math.random() * availableColors.length)
    const pickedColor = availableColors[randomIndex]
    lastColor = pickedColor

    if (pickedColor.startsWith("#")) {
      // Convert HEX to RGBA with opacity
      const hex = pickedColor.slice(1)
      const bigint = parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    } else if (pickedColor.startsWith("rgb")) {
      // Add opacity to RGB or RGBA
      return pickedColor.replace(/rgb(a?)\(([^)]+)\)/, (_, a, values) => {
        const components = values.split(",").map((v) => v.trim())
        return `rgba(${components.slice(0, 3).join(", ")}, ${opacity})`
      })
    }

    return pickedColor
  }
}
