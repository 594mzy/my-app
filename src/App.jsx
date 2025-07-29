import { Routes, Route } from 'react-router'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'

function App() {


  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/RegisterPage' element={<RegisterPage />} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path="/detail/:id" element={<AboutPage />} />
    </Routes>
  )
}

export default App
