import { Routes, Route } from 'react-router'
import Welcome from './components/Welcome.jsx'
import LoginPage from './components/LoginPage.jsx'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/LoginPage' element={<LoginPage />} />
    </Routes>
  )
}

export default App
