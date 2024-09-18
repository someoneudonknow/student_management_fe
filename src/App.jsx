import { RouterProvider } from "react-router-dom";
import appRoutes from "./router/index.jsx";

function App() {
  return <RouterProvider router={appRoutes} />;
}

export default App;
