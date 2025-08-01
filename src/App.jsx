import { Routes, Route } from 'react-router'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ManagementLoginPage from './components/ManagementLoginPage.jsx'
import ManagementPage from './components/ManagementPage.jsx'
import MyOrderPage from './components/MyOrderPage.jsx'

function App() {


  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/index.html' element={<LoginPage />} />
      <Route path='/RegisterPage' element={<RegisterPage />} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path="/detail/:id" element={<AboutPage />} />
      <Route path='/ManagementLogin' element={<ManagementLoginPage />} />
      <Route path='/ManagementPage' element={<ManagementPage />} />
      <Route path='/MyOrderPage' element={<MyOrderPage />} />
    </Routes>
  )
}

export default App
