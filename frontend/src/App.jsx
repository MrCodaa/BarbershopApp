import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Frizeri from './pages/Frizeri'
import Rezervacija from './pages/Rezervacija'
import Admin from './pages/admin/Admin'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#27272a', color: '#f4f4f5', border: '1px solid #3f3f46' },
            success: { iconTheme: { primary: '#f59e0b', secondary: '#1c1917' } },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/frizeri" element={<Frizeri />} />
          <Route path="/rezervacija" element={<Rezervacija />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
