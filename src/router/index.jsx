import { createBrowserRouter, Navigate } from "react-router-dom";
import { AUTH_ROUTES, ADMIN_ROUTES } from "./routesDefinitions";
import AppRoot from "../views/Roots/AppRoot";
import Error from "../views/Error/Error";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="auth" />
      },
      {
        path: "auth",
        ...AUTH_ROUTES,
      },
      {
        path: "admin",
        ...ADMIN_ROUTES,
      },
    ],
  },
]);

export default appRoutes;
