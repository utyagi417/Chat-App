import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

const App = () => {

  const {authUser} = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Toaster   position="top-right" reverseOrder={false}/>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/signup' element={authUser? <Navigate to="/" /> : <SignUp />} />
        <Route path='/login' element={ authUser? <Navigate to="/" /> :<Login />} />
      </Routes>
    </div>
  )
}

export default App
