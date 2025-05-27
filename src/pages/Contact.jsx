import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItemCount, toggleCartSidebar } from '../store/cartSlice'

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CartSidebar from '../components/CartSidebar'

import ApperIcon from '../components/ApperIcon'

const restaurantInfo = {
  name: "TableTaste",
  description: "Experience culinary excellence in the heart of the city. Our farm-to-table approach brings you the freshest ingredients prepared by award-winning chefs.",
  address: {
    street: "123 Gourmet Avenue",
    city: "Culinary District",
    state: "NY",
    zip: "10001"
  },
  phone: "(555) 123-TASTE",
  email: "reservations@tabletaste.com",
  hours: {
    monday: "5:00 PM - 10:00 PM",
    tuesday: "5:00 PM - 10:00 PM", 
    wednesday: "5:00 PM - 10:00 PM",
    thursday: "5:00 PM - 10:00 PM",
    friday: "5:00 PM - 11:00 PM",
    saturday: "4:00 PM - 11:00 PM",
    sunday: "4:00 PM - 9:00 PM"
  },
  socialMedia: {
    instagram: "@tabletaste",
    facebook: "TableTasteRestaurant",
    twitter: "@tabletaste"
  }
}

const navItems = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
  { id: 'reservations', label: 'Reservations', icon: 'Calendar' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' },
  { id: 'contact', label: 'Contact', icon: 'MapPin' }
]

function CartButton() {
  const dispatch = useDispatch()
  const itemCount = useSelector(selectCartItemCount)
  
  if (itemCount === 0) return null
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleCartSidebar())}
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


function Contact() {
  const [activeSection, setActiveSection] = useState('contact')
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
              
              <CartButton />

            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-white/20 py-4"
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
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Contact Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6">
              Visit Us <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Today</span>
            </h1>
            <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 leading-relaxed">
              Experience the perfect blend of ambiance, service, and cuisine at TableTaste. Find us, contact us, or visit our location.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="neu-card dark:neu-card-dark p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 flex items-center">
                  <ApperIcon name="MapPin" className="w-6 h-6 text-primary mr-3" />
                  Location & Hours
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-surface-700 dark:text-surface-300">
                      {restaurantInfo.address.street}<br />
                      {restaurantInfo.address.city}, {restaurantInfo.address.state} {restaurantInfo.address.zip}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium text-surface-900 dark:text-white capitalize">
                          {day}:
                        </span>
                        <span className="text-surface-600 dark:text-surface-400">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="neu-card dark:neu-card-dark p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 flex items-center">
                  <ApperIcon name="Phone" className="w-6 h-6 text-primary mr-3" />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Phone" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                    <span className="text-surface-700 dark:text-surface-300">{restaurantInfo.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Mail" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                    <span className="text-surface-700 dark:text-surface-300">{restaurantInfo.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4">
                    <span className="text-surface-900 dark:text-white font-medium">Follow Us:</span>
                    <div className="flex space-x-3">
                      {Object.entries(restaurantInfo.socialMedia).map(([platform, handle]) => (
                        <motion.button
                          key={platform}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                        >
                          <ApperIcon 
                            name={platform === 'instagram' ? 'Instagram' : platform === 'facebook' ? 'Facebook' : 'Twitter'} 
                            className="w-5 h-5" 
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="neu-card dark:neu-card-dark p-8 rounded-2xl h-96 lg:h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-800"
            >
              <div className="text-center">
                <ApperIcon name="MapPin" className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                  Interactive Map
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  Map integration would be displayed here
                </p>
              </div>
            </motion.div>
          </div>
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
      
      {/* Cart Sidebar */}
      <CartSidebar />


export default Contact