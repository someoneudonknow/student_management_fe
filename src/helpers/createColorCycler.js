export default function createColorCycler(colors) {
  let index = 0

  return function getNextColor() {
    const color = colors[index] // Get the current color
    index = (index + 1) % colors.length // Move to the next index, loop back if at the end
    return color
  }
}
