import React from 'react'
import  {BrowserRouter, Routes, Route, useLocation, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { Layout, RequireAuth } from './pages/layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />, // Handles errors in this route
      children: [
        {
          path: "/",
          element: <Home />
        }, 
        {
          path: "/sign-in",
          element: <SignIn />
        }, 
        {
          path: "/sign-up",
          element: <SignUp />
        }, 
        {
          path: "/abuot",
          element: <About />
        }, 
      ]
    },
    {
      path: "/",
      element: <RequireAuth /> ,
      errorElement: <ErrorPage />, // Handles errors in this route
      children: [
        {
          path: "/profile",
          element: <Profile />
        }, 
        {
          path: "/update-profile",
          element: <UpdateProfile />
        },
      ]
    }
  ])

  return (
    <div className='min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}