import RepoDetails from "../../components/RepoDeatail/RepoDetails";
import FollowersPage from "../../pages/FollowersPage/FollowersPage";
import Home from "../../pages/Home/Home";
import UserProfile from "../../pages/Profile/UserProfile";
import RepoDetailsPage from "../../pages/RepoDetailsPage/RepoDetailsPage";

export const routes = [
  { path: '/', element: <Home /> },
  {path: '/user/:username', element: <UserProfile />},
  {path: '/repo/:username/:repoName', element: <RepoDetailsPage />},
  {path: '/followers/:username', element: <FollowersPage />}
]
