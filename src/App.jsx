import { Route } from 'react-router'
import Welcome from './components/Welcome.jsx'
import LoginPage from './components/LoginPage.jsx'

function App() {


  return (
    <Route>
      <Route path='/' element={<LoginPage />} />
      <Route path='/welcome' element={<Welcome />} />
    </Route>
  )
}

export default App
