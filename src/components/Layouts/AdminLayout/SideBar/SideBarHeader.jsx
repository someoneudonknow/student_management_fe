import styled from "@emotion/styled";

const SideBarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

export default SideBarHeader
