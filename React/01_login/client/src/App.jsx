import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashbord from './pages/Dashbord'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {


  return (
    <UserContextProvider>
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }
        }
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashbord' element={<Dashbord />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
