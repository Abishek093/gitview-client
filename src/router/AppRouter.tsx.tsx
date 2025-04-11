import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './config/routes' 

const router = createBrowserRouter(routes)

const AppRouter = () => <RouterProvider router={router} />
export default AppRouter
