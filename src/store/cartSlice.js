import { createSlice } from '@reduxjs/toolkit'

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('tabletaste-cart')
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('tabletaste-cart', JSON.stringify(cart))
  } catch {
    // Handle storage error silently
  }
}

const initialState = {
  items: loadCartFromStorage(),
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, description } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          description,
          quantity: 1
        })
      }
      
      saveCartToStorage(state.items)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item && quantity > 0) {
        item.quantity = quantity
        saveCartToStorage(state.items)
      }
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
      saveCartToStorage(state.items)
    },
    
    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
    
    toggleCartSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    
    setCartSidebar: (state, action) => {
      state.isOpen = action.payload
    }
  },
})

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleCartSidebar,
  setCartSidebar
} = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
export const selectCartIsOpen = (state) => state.cart.isOpen

export default cartSlice.reducer
