import { Routes, Route } from 'react-router'
import Welcome from './components/Welcome.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import HomePage from './components/HomePage.jsx'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/LoginPage' element={<LoginPage />} />
      <Route path='/RegisterPage' element={<RegisterPage />} />
      <Route path='/HomePage' element={<HomePage />} />
    </Routes>
  )
}

export default App
