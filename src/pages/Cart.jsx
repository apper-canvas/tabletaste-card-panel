import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import CartSidebar from '../components/CartSidebar'
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleCartSidebar
} from '../store/cartSlice'

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

function Cart() {
  const [activeSection, setActiveSection] = useState('cart')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    specialInstructions: ''
  })
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartItemCount)

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

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id))
      toast.info('Item removed from cart')
    } else if (newQuantity > 10) {
      toast.warning('Maximum quantity is 10')
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id))
    toast.info(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    setShowClearDialog(false)
    toast.success('Cart cleared successfully')
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone || 
        !checkoutForm.address || !checkoutForm.city || !checkoutForm.zipCode) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(checkoutForm.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsCheckingOut(true)
    
    // Simulate checkout process
    setTimeout(() => {
      dispatch(clearCart())
      setIsCheckingOut(false)
      toast.success('Order placed successfully! You will receive a confirmation email shortly.')
      navigate('/')
    }, 2000)
  }

  const subtotal = cartTotal
  const tax = subtotal * 0.08875 // NY tax rate
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + deliveryFee

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/20 backdrop-blur-xl"
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
              
              <CartButton />
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

      {/* Cart Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6">
              Your <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">Cart</span>
            </h1>
            <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 leading-relaxed">
              {cartItems.length === 0 ? 'Your cart is empty' : `Review your order (${itemCount} ${itemCount === 1 ? 'item' : 'items'}) and proceed to checkout`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <ApperIcon name="ShoppingCart" className="w-24 h-24 text-surface-300 dark:text-surface-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
                  Your cart is empty
                </h2>
                <p className="text-surface-600 dark:text-surface-400 mb-8">
                  Looks like you haven't added any delicious items to your cart yet. Explore our menu and find something amazing!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/menu')}
                  className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
                >
                  <ApperIcon name="UtensilsCrossed" className="w-5 h-5" />
                  <span>Browse Menu</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="neu-card dark:neu-card-dark p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                      Cart Items ({itemCount})
                    </h2>
                    {cartItems.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowClearDialog(true)}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                        <span>Clear Cart</span>
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4 border border-surface-200 dark:border-surface-700"
                      >
                        <div className="flex space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-surface-900 dark:text-white text-lg">
                                {item.name}
                              </h3>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                className="p-1 text-red-500 hover:text-red-600 transition-colors"
                              >
                                <ApperIcon name="Trash2" className="w-5 h-5" />
                              </motion.button>
                            </div>
                            
                            <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-10 h-10 rounded-lg bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                                >
                                  <ApperIcon name="Minus" className="w-5 h-5" />
                                </motion.button>
                                
                                <span className="w-12 text-center font-bold text-surface-900 dark:text-white text-lg">
                                  {item.quantity}
                                </span>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-10 h-10 rounded-lg bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                                >
                                  <ApperIcon name="Plus" className="w-5 h-5" />
                                </motion.button>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-primary font-bold text-xl">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-surface-500 dark:text-surface-400 text-sm">
                                  ${item.price.toFixed(2)} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary & Checkout */}
              <div className="lg:col-span-1">
                <div className="neu-card dark:neu-card-dark p-6 rounded-2xl sticky top-24">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                      <span className="text-surface-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Tax</span>
                      <span className="text-surface-900 dark:text-white font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Delivery Fee</span>
                      <span className="text-surface-900 dark:text-white font-medium">
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal <= 50 && deliveryFee > 0 && (
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        Free delivery on orders over $50
                      </p>
                    )}
                    <hr className="border-surface-200 dark:border-surface-700" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-surface-900 dark:text-white">Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Checkout Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          placeholder="New York"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.zipCode}
                          onChange={(e) => setCheckoutForm({...checkoutForm, zipCode: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                        Payment Method
                      </label>
                      <select
                        value={checkoutForm.paymentMethod}
                        onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      >
                        <option value="card">Credit/Debit Card</option>
                        <option value="cash">Cash on Delivery</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-900 dark:text-white mb-1">
                        Special Instructions
                      </label>
                      <textarea
                        value={checkoutForm.specialInstructions}
                        onChange={(e) => setCheckoutForm({...checkoutForm, specialInstructions: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm"
                        placeholder="Any special requests..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isCheckingOut}
                      whileHover={!isCheckingOut ? { scale: 1.02 } : {}}
                      whileTap={!isCheckingOut ? { scale: 0.98 } : {}}
                      className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <ApperIcon name="CreditCard" className="w-5 h-5" />
                          <span>Place Order - ${total.toFixed(2)}</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Clear Cart Confirmation Dialog */}
      <AnimatePresence>
        {showClearDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowClearDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-card dark:neu-card-dark max-w-md w-full p-6 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
                </div>
                
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
                  Clear Cart
                </h3>
                
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Are you sure you want to remove all items from your cart? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowClearDialog(false)}
                    className="flex-1 px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearCart}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Clear Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar />

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

export default Cart
