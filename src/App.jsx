import { Routes, Route } from 'react-router'
import Welcome from './components/Welcome.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/LoginPage' element={<LoginPage />} />
      <Route path='/RegisterPage' element={<RegisterPage />} />
    </Routes>
  )
}

export default App
