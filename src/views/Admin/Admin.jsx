import { Outlet } from "react-router-dom"
import AdminLayout from "../../components/Layouts/AdminLayout/AdminLayout"

const Admin = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

export default Admin
