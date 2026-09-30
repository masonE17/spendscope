import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import Join from './pages/Join.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddExpense from './pages/AddExpense.jsx'
import Expenses from './pages/Expenses.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/join",
    element: <Join />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/add-expense",
    element: <AddExpense />
  },
  {
    path: "/expenses",
    element: <Expenses />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
