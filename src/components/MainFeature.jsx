import React, { useState, useEffect } from 'react'

import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const menuCategories = {
  appetizers: [
    {
      id: 1,
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle, parmesan, and herb aioli",
      ingredients: ["Arborio rice", "Black truffle", "Parmesan cheese", "Fresh herbs", "Garlic", "Onion", "Vegetable stock", "White wine", "Olive oil", "Breadcrumbs"],
      allergens: ["Gluten", "Dairy", "Eggs"],
      nutritionalHighlights: ["Rich in protein", "Contains antioxidants", "Source of calcium"],
      price: 18,
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian"]
    },
    {
      id: 2,
      name: "Seared Scallops",
      description: "Pan-seared diver scallops with cauliflower purée and pancetta",
      ingredients: ["Diver scallops", "Cauliflower", "Pancetta", "Heavy cream", "Butter", "Thyme", "Garlic", "White wine", "Lemon", "Sea salt"],
      allergens: ["Shellfish", "Dairy", "Pork"],
      nutritionalHighlights: ["High in protein", "Low in carbs", "Rich in omega-3", "Source of vitamin B12"],
      price: 24,
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 3,
      name: "Burrata Caprese",
      description: "Fresh burrata with heirloom tomatoes, basil oil, and aged balsamic",
      ingredients: ["Burrata cheese", "Heirloom tomatoes", "Fresh basil", "Extra virgin olive oil", "Aged balsamic vinegar", "Sea salt", "Black pepper", "Microgreens"],
      allergens: ["Dairy"],
      nutritionalHighlights: ["Rich in calcium", "Source of lycopene", "Contains healthy fats", "High in vitamin C"],
      price: 16,
      image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian", "gluten-free"]
    }
  ],
  mains: [
    {
      id: 4,
      name: "Wagyu Ribeye",
      description: "12oz Australian wagyu with roasted bone marrow and red wine jus",
      ingredients: ["Australian wagyu ribeye", "Bone marrow", "Red wine", "Beef stock", "Shallots", "Garlic", "Fresh thyme", "Butter", "Sea salt", "Black pepper", "Roasted vegetables"],
      allergens: ["Dairy"],
      nutritionalHighlights: ["Exceptional protein source", "Rich in iron", "High in B vitamins", "Contains zinc"],
      price: 85,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 5,
      name: "Lobster Thermidor",
      description: "Whole Maine lobster with cognac cream sauce and gruyère gratinée",
      ingredients: ["Maine lobster", "Cognac", "Heavy cream", "Gruyère cheese", "Egg yolks", "Mustard", "Shallots", "White wine", "Butter", "Fresh tarragon", "Paprika"],
      allergens: ["Shellfish", "Dairy", "Eggs"],
      nutritionalHighlights: ["High in protein", "Rich in omega-3", "Source of vitamin B12", "Contains selenium"],
      price: 68,
      image: "https://images.unsplash.com/photo-1559847844-d72ee0d83afe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 6,
      name: "Duck Confit",
      description: "Slow-cooked duck leg with cherry gastrique and wild rice pilaf",
      ingredients: ["Duck leg", "Duck fat", "Wild rice", "Dried cherries", "Red wine vinegar", "Honey", "Shallots", "Fresh herbs", "Garlic", "Bay leaves", "Vegetable stock"],
      allergens: [],
      nutritionalHighlights: ["High in protein", "Rich in iron", "Source of healthy fats", "Contains antioxidants"],
      price: 42,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 7,
      name: "Vegetarian Tasting",
      description: "Chef's selection of seasonal vegetables with quinoa and tahini dressing",
      ingredients: ["Seasonal vegetables", "Quinoa", "Tahini", "Lemon juice", "Olive oil", "Garlic", "Fresh herbs", "Pomegranate seeds", "Roasted nuts", "Microgreens"],
      allergens: ["Sesame", "Tree nuts"],
      nutritionalHighlights: ["Complete protein", "High in fiber", "Rich in vitamins", "Plant-based antioxidants"],
      price: 38,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian", "vegan", "gluten-free"]
    }
  ],
  desserts: [
    {
      id: 8,
      name: "Chocolate Soufflé",
      description: "Dark chocolate soufflé with vanilla bean ice cream and gold leaf",
      ingredients: ["Dark chocolate", "Eggs", "Sugar", "Butter", "Heavy cream", "Vanilla beans", "Milk", "Cornstarch", "Gold leaf", "Powdered sugar"],
      allergens: ["Dairy", "Eggs", "Gluten"],
      nutritionalHighlights: ["Rich in antioxidants", "Source of calcium", "Contains magnesium"],
      price: 16,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian"]
    },
    {
      id: 9,
      name: "Lemon Tart",
      description: "Meyer lemon curd tart with candied lemon and lavender honey",
      ingredients: ["Meyer lemons", "Pastry flour", "Butter", "Eggs", "Sugar", "Heavy cream", "Lavender honey", "Vanilla extract", "Candied lemon zest"],
      allergens: ["Gluten", "Dairy", "Eggs"],
      nutritionalHighlights: ["Rich in vitamin C", "Contains antioxidants", "Source of citrus flavonoids"],
      price: 14,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian"]
    }
  ]
}


const formatDate = (date) => {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Invalid Date'
  }
}

const StarRating = ({ rating, onRatingChange, hoverRating, onHoverChange, readonly = false }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={readonly}
          whileHover={!readonly ? { scale: 1.1 } : {}}
          whileTap={!readonly ? { scale: 0.95 } : {}}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => !readonly && onHoverChange && onHoverChange(star)}
          onMouseLeave={() => !readonly && onHoverChange && onHoverChange(0)}
          className={`w-8 h-8 ${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors`}
        >
          <ApperIcon 
            name="Star" 
            className={`w-full h-full ${
              star <= (hoverRating || rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-surface-300'
            }`}
          />
        </motion.button>
      ))}
    </div>
  )
}

const MainFeature = React.forwardRef(function MainFeature({ defaultTab = 'menu' }, ref) {

  const [activeTab, setActiveTab] = useState(defaultTab)

  const [selectedCategory, setSelectedCategory] = useState('appetizers')
  const [selectedMenuItem, setSelectedMenuItem] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tabletaste-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tabletaste-cart')
    return saved ? JSON.parse(saved) : []
  })
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareItem, setShareItem] = useState(null)

  const [lookupForm, setLookupForm] = useState({
    confirmationNumber: '',
    email: ''
  })
  const [foundReservation, setFoundReservation] = useState(null)
  const [isModifying, setIsModifying] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [mockReservations] = useState([
    {
      id: 'RES-2024-001',
      confirmationNumber: 'TT2024001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      date: '2024-02-15',
      time: '19:00',
      guests: '4',
      specialRequests: 'Anniversary dinner, window table if possible',
      status: 'confirmed'
    },
    {
      id: 'RES-2024-002',
      confirmationNumber: 'TT2024002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 987-6543',
      date: '2024-02-20',
      time: '18:30',
      guests: '2',
      specialRequests: 'Vegetarian options preferred',
      status: 'confirmed'
    }
  ])

  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  })
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 0,
    comment: ''
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely incredible dining experience! The wagyu ribeye was perfectly cooked and the service was impeccable. The atmosphere is elegant yet welcoming. Will definitely be returning soon!",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      customerName: "Michael Chen",
      rating: 5,
      comment: "Outstanding food and presentation. The chef's attention to detail is remarkable. Every course was a work of art. The wine pairing recommendations were spot on. Highly recommended!",
      date: "2024-01-12",
      verified: true
    },
    {
      id: 3,
      customerName: "Emma Rodriguez",
      rating: 4,
      comment: "Lovely evening at TableTaste. The truffle arancini was divine and the chocolate soufflé was the perfect ending to our meal. Service was attentive without being intrusive.",
      date: "2024-01-10",
      verified: false
    },
    {
      id: 4,
      customerName: "David Thompson",
      rating: 5,
      comment: "Celebrated our anniversary here and it exceeded all expectations. The lobster thermidor was exceptional, and the staff made our evening truly special with personalized touches.",
      date: "2024-01-08",
      verified: true
    }
  ])

  // Update activeTab when defaultTab prop changes
  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])


  const tabs = [
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
    { id: 'reservations', label: 'New Reservation', icon: 'Calendar' },
    { id: 'manage-reservations', label: 'Manage Reservations', icon: 'Settings' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ]


  const categories = [
    { id: 'appetizers', label: 'Appetizers', icon: 'Soup' },
    { id: 'mains', label: 'Main Courses', icon: 'ChefHat' },
    { id: 'desserts', label: 'Desserts', icon: 'Cookie' }
  ]

  const handleReservationSubmit = (e) => {
    e.preventDefault()
    
    if (isModifying) {
      handleModifiedReservationSubmit(e)
      return
    }
    
    // Validation
    if (!reservationForm.name || !reservationForm.email || !reservationForm.phone || 
        !reservationForm.date || !reservationForm.time || !reservationForm.guests) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(reservationForm.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Date validation
    const selectedDate = new Date(reservationForm.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      toast.error('Please select a future date')
      return
    }

    toast.success('Reservation request submitted successfully! We will confirm your booking shortly.')
    
    // Reset form
    setReservationForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    })
  }


  const handleReviewSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!reviewForm.customerName || !reviewForm.rating || !reviewForm.comment) {
      toast.error('Please fill in all fields')
      return
    }

    if (reviewForm.comment.length < 10) {
      toast.error('Please provide a more detailed review (at least 10 characters)')
      return
    }

    // Add new review
    const newReview = {
      id: reviews.length + 1,
      customerName: reviewForm.customerName,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    }

    setReviews([newReview, ...reviews])
    toast.success('Thank you for your review! It has been submitted successfully.')
    
    // Reset form
    setReviewForm({
      customerName: '',
      rating: 0,
      comment: ''
    })
    setHoverRating(0)
  }


  const handleLookupSubmit = (e) => {
    e.preventDefault()
    
    if (!lookupForm.confirmationNumber && !lookupForm.email) {
      toast.error('Please provide either confirmation number or email address')
      return
    }

    // Find reservation
    const reservation = mockReservations.find(res => 
      (lookupForm.confirmationNumber && res.confirmationNumber.toLowerCase() === lookupForm.confirmationNumber.toLowerCase()) ||
      (lookupForm.email && res.email.toLowerCase() === lookupForm.email.toLowerCase())
    )

    if (reservation) {
      setFoundReservation(reservation)
      toast.success('Reservation found successfully!')
    } else {
      toast.error('No reservation found with the provided information')
      setFoundReservation(null)
    }

    // Reset lookup form
    setLookupForm({
      confirmationNumber: '',
      email: ''
    })
  }

  const handleCancelReservation = () => {
    if (foundReservation) {
      toast.success(`Reservation ${foundReservation.confirmationNumber} has been cancelled successfully`)
      setFoundReservation(null)
      setShowCancelDialog(false)
    }
  }

  const handleModifyReservation = () => {
    if (foundReservation) {
      // Pre-fill the reservation form with existing data
      setReservationForm({
        name: foundReservation.name,
        email: foundReservation.email,
        phone: foundReservation.phone,
        date: foundReservation.date,
        time: foundReservation.time,
        guests: foundReservation.guests,
        specialRequests: foundReservation.specialRequests
      })
      setIsModifying(true)
      setActiveTab('reservations')
      toast.info('Reservation details loaded for modification')
    }
  }

  const handleModifiedReservationSubmit = (e) => {
    e.preventDefault()
    
    // Validation (same as regular reservation)
    if (!reservationForm.name || !reservationForm.email || !reservationForm.phone || 
        !reservationForm.date || !reservationForm.time || !reservationForm.guests) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(reservationForm.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Date validation
    const selectedDate = new Date(reservationForm.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      toast.error('Please select a future date')
      return
    }

    toast.success(`Reservation ${foundReservation.confirmationNumber} has been updated successfully!`)
    
    // Reset forms and states
    setReservationForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    })
    setIsModifying(false)
    setFoundReservation(null)
    setActiveTab('manage-reservations')
  }


  const getDietaryIcon = (dietary) => {
    const icons = {
      vegetarian: 'Leaf',
      vegan: 'Sprout',
      'gluten-free': 'Shield'
    }
    return icons[dietary] || 'Info'
  }

  const getDietaryColor = (dietary) => {
    const colors = {
      vegetarian: 'text-green-600',
      vegan: 'text-emerald-600',
      'gluten-free': 'text-blue-600'
    }
    return colors[dietary] || 'text-surface-600'
  }

  const getTimeSlots = () => {
    const slots = []
    for (let hour = 17; hour <= 22; hour++) {
      for (let minute of ['00', '30']) {
        const time = `${hour.toString().padStart(2, '0')}:${minute}`
        const displayTime = new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
        slots.push({ value: time, label: displayTime })
      }
    }
    return slots
  }

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tabletaste-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tabletaste-cart', JSON.stringify(cart))
  }, [cart])

  const toggleFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id)
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== item.id))
      toast.info(`${item.name} removed from favorites`)
    } else {
      setFavorites([...favorites, item])
      toast.success(`${item.name} added to favorites!`)
    }
  }

  const addToCart = (item, quantity = 1) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ))
      toast.success(`${item.name} quantity updated in cart!`)
    } else {
      setCart([...cart, { ...item, quantity }])
      toast.success(`${item.name} added to cart!`)
    }
  }


  const handleShare = (platform) => {
    if (!shareItem) return
    
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this amazing dish: ${shareItem.name} at TableTaste! ${shareItem.description}`)
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      email: `mailto:?subject=Check out this dish at TableTaste&body=${text} ${decodeURIComponent(url)}`,
      copy: () => {
        navigator.clipboard.writeText(`${shareItem.name} at TableTaste: ${shareItem.description} - ${window.location.href}`)
        toast.success('Link copied to clipboard!')
      }
    }
    
    if (platform === 'copy') {
      shareUrls.copy()
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      toast.success(`Shared ${shareItem.name} on ${platform}!`)
    }
    
    setShowShareModal(false)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const isFavorite = (item) => {
    return favorites.some(fav => fav.id === item.id)
  }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-surface-100 dark:bg-surface-800 p-2 rounded-2xl">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-surface-100 dark:bg-surface-800 p-2 rounded-xl">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    <ApperIcon name={category.icon} className="w-4 h-4" />
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuCategories[selectedCategory]?.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="neu-card dark:neu-card-dark rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedMenuItem(item)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      ${item.price}
                    </div>
                    {item.dietary && item.dietary.length > 0 && (
                      <div className="absolute top-4 left-4 flex space-x-1">
                        {item.dietary.map((diet) => (
                          <div
                            key={diet}
                            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md"
                            title={diet.charAt(0).toUpperCase() + diet.slice(1)}
                          >
                            <ApperIcon 
                              name={getDietaryIcon(diet)} 
                              className={`w-4 h-4 ${getDietaryColor(diet)}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Favorite indicator */}
                    {isFavorite(item) && (
                      <div className="absolute bottom-4 left-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        <ApperIcon name="Heart" className="w-4 h-4 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedMenuItem(item)}>
                      {item.name}
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Ingredients preview */}
                    <div className="mb-4">
                      <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Key Ingredients:</p>
                      <p className="text-sm text-surface-600 dark:text-surface-300 line-clamp-1">
                        {item.ingredients.slice(0, 3).join(', ')}{item.ingredients.length > 3 && '...'}
                      </p>
                    </div>
                    
                    {/* Allergen warning */}
                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center">
                          <ApperIcon name="AlertTriangle" className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-xs text-yellow-800 dark:text-yellow-200">
                            Contains: {item.allergens.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(item)
                        }}
                        className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-1 ${
                          isFavorite(item)
                            ? 'bg-red-500 text-white shadow-md'
                            : 'border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                        }`}
                      >
                        <ApperIcon name="Heart" className={`w-4 h-4 ${isFavorite(item) ? 'fill-current' : ''}`} />
                        <span>{isFavorite(item) ? 'Favorited' : 'Favorite'}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShareItem(item)
                          setShowShareModal(true)

                        }}
                        className="flex-1 px-3 py-2 rounded-lg font-medium text-sm border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-300 flex items-center justify-center space-x-1"
                      >
                        <ApperIcon name="Share2" className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(item)
                        }}
                        className="flex-1 px-3 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-primary to-primary-light text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1"
                      >
                        <ApperIcon name="ShoppingCart" className="w-4 h-4" />
                        <span>Add</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        )}

        {activeTab === 'reservations' && (
          <motion.div
            key="reservations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >

              
              {isModifying && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl mb-6">
                  <div className="flex items-center">
                    <ApperIcon name="Info" className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 dark:text-blue-200 font-medium">
                      Modifying reservation: {foundReservation?.confirmationNumber}
                    </span>
                  </div>
                </div>
              )}


              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                  Reserve Your Table
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Book your dining experience with us. We'll confirm your reservation within 24 hours.
                </p>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({...reservationForm, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({...reservationForm, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Number of Guests *
                    </label>
                    <select
                      required
                      value={reservationForm.guests}
                      onChange={(e) => setReservationForm({...reservationForm, guests: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({...reservationForm, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Preferred Time *
                    </label>
                    <select
                      required
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({...reservationForm, time: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select a time</option>
                      {getTimeSlots().map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={reservationForm.specialRequests}
                    onChange={(e) => setReservationForm({...reservationForm, specialRequests: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Any dietary restrictions, allergies, or special occasions we should know about?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  <span>{isModifying ? 'Update Reservation' : 'Submit Reservation'}</span>
                </motion.button>


              </form>
              
              {isModifying && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsModifying(false)
                    setFoundReservation(null)
                    setReservationForm({
                      name: '',
                      email: '',
                      phone: '',
                      date: '',
                      time: '',
                      guests: '2',
                      specialRequests: ''
                    })
                    setActiveTab('manage-reservations')
                  }}
                  className="w-full mt-4 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-medium py-3 px-6 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                  <span>Cancel Modification</span>
                </motion.button>
              )}
          </motion.div>
        )}

        {activeTab === 'manage-reservations' && (
          <motion.div
            key="manage-reservations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="neu-card dark:neu-card-dark p-8 rounded-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                  Manage Your Reservation
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Look up your existing reservation to modify or cancel it.
                </p>
              </div>

              {!foundReservation ? (
                <form onSubmit={handleLookupSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Confirmation Number
                    </label>
                    <input
                      type="text"
                      value={lookupForm.confirmationNumber}
                      onChange={(e) => setLookupForm({...lookupForm, confirmationNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="e.g., TT2024001"
                    />
                  </div>
                  
                  <div className="text-center text-surface-500 dark:text-surface-400">
                    - OR -
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={lookupForm.email}
                      onChange={(e) => setLookupForm({...lookupForm, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Search" className="w-5 h-5" />
                    <span>Find Reservation</span>
                  </motion.button>
                  
                  <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-xl">
                    <h4 className="font-semibold text-surface-900 dark:text-white mb-2">Demo Reservations:</h4>
                    <div className="text-sm text-surface-600 dark:text-surface-400 space-y-1">
                      <p>• Confirmation: TT2024001 | Email: john.smith@example.com</p>
                      <p>• Confirmation: TT2024002 | Email: sarah.j@example.com</p>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600 mr-3" />
                      <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                        Reservation Found
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-surface-900 dark:text-white">Confirmation:</span>
                        <span className="ml-2 text-surface-700 dark:text-surface-300">{foundReservation.confirmationNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-surface-900 dark:text-white">Name:</span>
                        <span className="ml-2 text-surface-700 dark:text-surface-300">{foundReservation.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-surface-900 dark:text-white">Date:</span>
                        <span className="ml-2 text-surface-700 dark:text-surface-300">{formatDate(foundReservation.date)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-surface-900 dark:text-white">Time:</span>
                        <span className="ml-2 text-surface-700 dark:text-surface-300">
                          {new Date(`2000-01-01T${foundReservation.time}:00`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-surface-900 dark:text-white">Guests:</span>
                        <span className="ml-2 text-surface-700 dark:text-surface-300">{foundReservation.guests}</span>
                      </div>
                      <div>
                        <span className="font-medium text-surface-900 dark:text-white">Phone:</span>
                        <span className="ml-2 text-surface-700 dark:text-surface-300">{foundReservation.phone}</span>
                      </div>
                    </div>
                    
                    {foundReservation.specialRequests && (
                      <div className="mt-4">
                        <span className="font-medium text-surface-900 dark:text-white">Special Requests:</span>
                        <p className="text-surface-700 dark:text-surface-300 mt-1">{foundReservation.specialRequests}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleModifyReservation}
                      className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ApperIcon name="Edit" className="w-5 h-5" />
                      <span>Modify Reservation</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCancelDialog(true)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                      <span>Cancel Reservation</span>
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFoundReservation(null)}
                    className="w-full border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-medium py-3 px-6 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                    <span>Look Up Another Reservation</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>





        )}
        {activeTab === 'reviews' && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                Customer Reviews
              </h2>
              <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
                Share your dining experience and read what others have to say about TableTaste
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Review Submission Form */}
              <div className="neu-card dark:neu-card-dark p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 flex items-center">
                  <ApperIcon name="PenTool" className="w-6 h-6 text-primary mr-3" />
                  Write a Review
                </h3>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewForm.customerName}
                      onChange={(e) => setReviewForm({...reviewForm, customerName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                      Rating *
                    </label>
                    <StarRating 
                      rating={reviewForm.rating}
                      onRatingChange={(rating) => setReviewForm({...reviewForm, rating})}
                      hoverRating={hoverRating}
                      onHoverChange={setHoverRating}
                    />
                    {reviewForm.rating > 0 && (
                      <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                        {reviewForm.rating === 1 && "Poor"}
                        {reviewForm.rating === 2 && "Fair"}
                        {reviewForm.rating === 3 && "Good"}
                        {reviewForm.rating === 4 && "Very Good"}
                        {reviewForm.rating === 5 && "Excellent"}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                      Your Review *
                    </label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Share your experience with us..."
                    />
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      {reviewForm.comment.length}/500 characters (minimum 10)
                    </p>
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Send" className="w-5 h-5" />
                    <span>Submit Review</span>
                  </motion.button>
                </form>
              </div>

              {/* Reviews Display */}
              <div className="neu-card dark:neu-card-dark p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-6 flex items-center">
                  <ApperIcon name="MessageSquare" className="w-6 h-6 text-primary mr-3" />
                  Customer Reviews ({reviews.length})
                </h3>
                
                <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-hide">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface-50 dark:bg-surface-700 p-6 rounded-xl border border-surface-200 dark:border-surface-600"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-surface-900 dark:text-white">
                              {review.customerName}
                            </h4>
                            {review.verified && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <ApperIcon name="CheckCircle" className="w-4 h-4" />
                                <span className="text-xs font-medium">Verified</span>
                              </div>
                            )}
                          </div>
                          <StarRating rating={review.rating} readonly />
                        </div>
                        <span className="text-sm text-surface-500 dark:text-surface-400">
                          {formatDate(review.date)}
                        </span>
                      </div>
                      
                      <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                        {review.comment}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Item Modal */}
      <AnimatePresence>
        {selectedMenuItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMenuItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-card dark:neu-card-dark max-w-2xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={selectedMenuItem.image}
                  alt={selectedMenuItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedMenuItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-surface-900 hover:bg-white transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-full font-bold text-2xl shadow-lg">
                  ${selectedMenuItem.price}
                </div>
                {/* Favorite indicator */}
                {isFavorite(selectedMenuItem) && (
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    <ApperIcon name="Heart" className="w-5 h-5 fill-current" />
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-3xl font-bold text-surface-900 dark:text-white">
                    {selectedMenuItem.name}
                  </h2>
                  {selectedMenuItem.dietary && selectedMenuItem.dietary.length > 0 && (
                    <div className="flex space-x-2">
                      {selectedMenuItem.dietary.map((diet) => (
                        <div
                          key={diet}
                          className="flex items-center space-x-1 bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full"
                        >
                          <ApperIcon 
                            name={getDietaryIcon(diet)} 
                            className={`w-4 h-4 ${getDietaryColor(diet)}`}
                          />
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300 capitalize">
                            {diet.replace('-', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-6 text-lg">
                  {selectedMenuItem.description}
                </p>
                
                {/* Ingredients Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3 flex items-center">
                    <ApperIcon name="List" className="w-5 h-5 text-primary mr-2" />
                    Ingredients
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedMenuItem.ingredients.map((ingredient, index) => (
                      <div key={index} className="bg-surface-100 dark:bg-surface-700 px-3 py-2 rounded-lg text-sm text-surface-700 dark:text-surface-300">
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Allergen Information */}
                {selectedMenuItem.allergens && selectedMenuItem.allergens.length > 0 && (
                  <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                      <ApperIcon name="AlertTriangle" className="w-5 h-5 mr-2" />
                      Allergen Information
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      <strong>Contains:</strong> {selectedMenuItem.allergens.join(', ')}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      Please inform your server of any allergies or dietary restrictions.
                    </p>
                  </div>
                )}
                
                {/* Nutritional Highlights */}
                {selectedMenuItem.nutritionalHighlights && selectedMenuItem.nutritionalHighlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3 flex items-center">
                      <ApperIcon name="Heart" className="w-5 h-5 text-green-600 mr-2" />
                      Nutritional Highlights
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMenuItem.nutritionalHighlights.map((highlight, index) => (
                        <div key={index} className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm border border-green-200 dark:border-green-800">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFavorite(selectedMenuItem)}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isFavorite(selectedMenuItem)
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <ApperIcon name="Heart" className={`w-5 h-5 ${isFavorite(selectedMenuItem) ? 'fill-current' : ''}`} />
                    <span>{isFavorite(selectedMenuItem) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShareItem(selectedMenuItem)
                      setShowShareModal(true)
                    }}

                    className="flex-1 px-6 py-3 rounded-xl font-semibold border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Share2" className="w-5 h-5" />
                    <span>Share this Dish</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(selectedMenuItem)
                      setSelectedMenuItem(null)
                    }}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
                
                <div className="flex justify-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMenuItem(null)}
                    className="px-6 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Dialog */}
      <AnimatePresence>
        {showCancelDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCancelDialog(false)}
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
                  Cancel Reservation
                </h3>
                
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Are you sure you want to cancel your reservation for {formatDate(foundReservation?.date)} at {foundReservation && new Date(`2000-01-01T${foundReservation.time}:00`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCancelDialog(false)}
                    className="flex-1 px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    Keep Reservation
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelReservation}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Yes, Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && shareItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-card dark:neu-card-dark max-w-md w-full p-6 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
                  Share "{shareItem.name}"
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  Choose how you'd like to share this delicious dish
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors hover:bg-blue-700"
                >
                  <ApperIcon name="Facebook" className="w-5 h-5" />
                  <span>Facebook</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center space-x-2 bg-sky-500 text-white px-4 py-3 rounded-xl font-medium transition-colors hover:bg-sky-600"
                >
                  <ApperIcon name="Twitter" className="w-5 h-5" />
                  <span>Twitter</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-xl font-medium transition-colors hover:bg-green-600"
                >
                  <ApperIcon name="MessageCircle" className="w-5 h-5" />
                  <span>WhatsApp</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('email')}
                  className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-colors hover:bg-gray-700"
                >
                  <ApperIcon name="Mail" className="w-5 h-5" />
                  <span>Email</span>
                </motion.button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare('copy')}
                className="w-full flex items-center justify-center space-x-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors mb-3"
              >
                <ApperIcon name="Copy" className="w-5 h-5" />
                <span>Copy Link</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowShareModal(false)}
                className="w-full px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



    </div>
  )
}

})

export default MainFeature
