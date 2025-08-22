import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Layout from "../components/Layout/Layout";
import Posts from "../pages/Posts/Posts";
import Profile from "../pages/auth/Profile/Profile";
import Notfound from "../pages/Notfound/Notfound"
import { Link } from "react-router-dom";
import PostDetails from "../components/PostDetails/PostDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes"
export const routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: (
      <div className='bg-info text-center d-flex align-items-center justify-content-center w-100 vh-100'>
        <h2>Page error</h2>
        <Link to='/' className='btn btn-primary d-block'>Go to Home</Link>
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/login',
        element:(
    <ProtectedAuthRoutes>
      <Login />
    </ProtectedAuthRoutes>
  )
      },
      {
        path: '/register',
        element:  (
    <ProtectedAuthRoutes>
      <Register />
    </ProtectedAuthRoutes>
  )
      },
      {
        path: '/posts',
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
         {
        path: '/profile',
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/PostDetails/:id',
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: '*',
        element: <Notfound />,
      }
    ]
  }
]);