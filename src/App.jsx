import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Reviews from './pages/Reviews'
import Cart from './pages/Cart'
import CartSidebar from './components/CartSidebar'

import Contact from './pages/Contact'

import NotFound from './pages/NotFound'

function App() {
  const [hasError, setHasError] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true)
      setErrorInfo({ error: error.toString(), errorInfo })
      console.error('App Error:', error, errorInfo)
    }

    window.addEventListener('error', (event) => {
      handleError(event.error, { componentStack: event.filename + ':' + event.lineno })
    })

    window.addEventListener('unhandledrejection', (event) => {
      handleError(new Error(event.reason), { componentStack: 'Promise rejection' })
    })

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-surface-600 mb-4">We're sorry, but there was an error loading the application.</p>
          <button 
            onClick={() => {
              setHasError(false)
              setErrorInfo(null)
              window.location.reload()
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />

      
      {/* Cart Sidebar */}
      <CartSidebar />

    </div>
  )
}


export default App