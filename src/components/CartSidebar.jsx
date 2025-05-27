import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartIsOpen,
  updateQuantity,
  removeFromCart,
  setCartSidebar
} from '../store/cartSlice'

function CartSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartItemCount)
  const isOpen = useSelector(selectCartIsOpen)

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

  const handleCheckout = () => {
    dispatch(setCartSidebar(false))
    navigate('/cart')
  }

  const subtotal = cartTotal
  const tax = subtotal * 0.08875 // NY tax rate
  const total = subtotal + tax

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => dispatch(setCartSidebar(false))}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-surface-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white">
                Cart ({itemCount})
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(setCartSidebar(false))}
                className="p-2 rounded-xl text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="ShoppingCart" className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400 text-lg">Your cart is empty</p>
                  <p className="text-surface-400 dark:text-surface-500 text-sm mt-2">Add some delicious items from our menu!</p>
                </div>
              ) : (
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
                      <div className="flex space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-surface-900 dark:text-white text-sm mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-primary font-bold text-sm mb-2">
                            ${item.price.toFixed(2)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-lg bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                              >
                                <ApperIcon name="Minus" className="w-4 h-4" />
                              </motion.button>
                              
                              <span className="w-8 text-center font-medium text-surface-900 dark:text-white text-sm">
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                              >
                                <ApperIcon name="Plus" className="w-4 h-4" />
                              </motion.button>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="p-1 text-red-500 hover:text-red-600 transition-colors"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-surface-200 dark:border-surface-700 p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                    <span className="text-surface-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Tax</span>
                    <span className="text-surface-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-surface-200 dark:border-surface-700 pt-2">
                    <span className="text-surface-900 dark:text-white">Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="CreditCard" className="w-5 h-5" />
                  <span>Checkout</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar
