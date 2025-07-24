import React from 'react'
import SignIn from './pages/user/SignIn'
import Signup from './pages/user/SignUp'
import Home from './pages/user/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import AdminLogin from './pages/admin/adminLogin';
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/home' element={
            <PrivateRoute role='user'>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path='/admin/dashboard' element={
            <PrivateRoute role='admin'>
              <AdminDashboard />
            </PrivateRoute>
          } />

          <Route path = '/admin/users' element = {<AdminUsers />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App