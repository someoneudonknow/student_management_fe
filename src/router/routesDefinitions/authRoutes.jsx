import { lazy } from "react";

const AuthView = lazy(() => import("../../views/Auth/Auth"));

export default {
  path: "auth",
  element: <AuthView />,
};
