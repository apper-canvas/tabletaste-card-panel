import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'

const navItems = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
  { id: 'reservations', label: 'Reservations', icon: 'Calendar' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' },
  { id: 'contact', label: 'Contact', icon: 'MapPin' }
]


function CartButton({ cartItems = [] }) {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const handleCartClick = () => {
    toast.info('Cart functionality - showing cart with ' + itemCount + ' items')
    // Future: Open cart modal or navigate to cart page
  }
  
  if (itemCount === 0) return null
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCartClick}
      className="relative p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
    >
      <ApperIcon name="ShoppingCart" className="w-5 h-5" />
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </motion.div>
      )}
    </motion.button>
  )
}


function Menu() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tabletaste-cart')
    return saved ? JSON.parse(saved) : []
  })

  // Listen for cart updates from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('tabletaste-cart')
      setCart(saved ? JSON.parse(saved) : [])
    }
    
    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange)
    
    // Poll for changes every 1000ms as fallback
    const interval = setInterval(handleStorageChange, 1000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])


  const [activeSection, setActiveSection] = useState('menu')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavigation = (sectionId) => {
    if (sectionId === 'hero') {
      navigate('/')
    } else {
      navigate(`/${sectionId}`)
    }
    setIsMenuOpen(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <ApperIcon name="UtensilsCrossed" className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                TableTaste
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button and dark mode toggle */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={isDarkMode ? "Sun" : "Moon"} className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"
              >
                <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-white/20 py-4"
              <CartButton cartItems={cart} />

              >
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(item.id)}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-3 text-left ${
                        activeSection === item.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
                      }`}
                    >
                      <ApperIcon name={item.icon} className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              <CartButton cartItems={cart} />

            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Menu Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Menu</span>
            </h1>
            <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 leading-relaxed">
              Discover our carefully crafted dishes made from the finest ingredients, prepared by our award-winning chefs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature defaultTab="menu" ref={(mainFeatureRef) => {
            if (mainFeatureRef) {
              // Store reference to access cart data
              window.mainFeatureRef = mainFeatureRef;
            }
          }} />

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <ApperIcon name="UtensilsCrossed" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TableTaste</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-surface-400">
                © 2024 TableTaste. All rights reserved.
              </p>
              <p className="text-surface-500 text-sm mt-1">
                Crafted with passion for exceptional dining experiences
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Menu