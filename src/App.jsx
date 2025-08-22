

import './App.css'
import AuthContextProvider from './Context/AuthContext'
import {routers } from "./Routing/AppRoute"
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

function App() {

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers} />
                        <ToastContainer />

      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
