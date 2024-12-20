import { SubdirectoryArrowLeftSharp } from "@mui/icons-material"
import { styled, Typography } from "@mui/material"

const OverFlowableTypography = styled(Typography)(() => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}))

export default OverFlowableTypography
