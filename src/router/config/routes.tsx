import Home from "../../pages/Home/Home";
import UserProfile from "../../pages/Profile/UserProfile";

export const routes = [
  { path: '/', element: <Home /> },
  {path: '/user/:username', element: <UserProfile />}
]
