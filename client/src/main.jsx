import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './UserContext';
import { DateProvider } from './DateContext.jsx';
import Login from './logIn.jsx'
import Welcome from './Welcome.jsx'
import SetGoal from './SetGoal.jsx'
import AddExpense from './AddExpense.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path:'/Welcome',
    element:<Welcome/>
  },
  {
    path:'/SetGoal',
    element:<SetGoal/>
  },
  {
    path:'/AddExpense',
    element:<AddExpense/>
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <UserProvider>
      <DateProvider>
    <RouterProvider router= {router} />
    </DateProvider>
    </UserProvider>
  </React.StrictMode>,
)
