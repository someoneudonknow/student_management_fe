import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes.jsx";
import AuthRoutes from "./router/AuthRoutes.jsx"
import AppRoot from "./views/Roots/AppRoot.jsx";
import Error from "./views/Error/Error.jsx"
import NotFound from "./views/NotFound/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppRoot />} errorElement={<Error />}>
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
