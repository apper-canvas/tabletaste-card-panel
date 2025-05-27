import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays, isToday, isTomorrow } from 'date-fns'
import ApperIcon from './ApperIcon'

const menuCategories = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    icon: 'Soup',
    items: [
      {
        id: 1,
        name: 'Truffle Arancini',
        description: 'Crispy risotto balls with black truffle, parmesan, and herb aioli',
        ingredients: ['Arborio rice', 'Black truffle', 'Parmesan cheese', 'Herbs', 'Garlic aioli'],
        allergens: ['Dairy', 'Gluten'],
        price: 18,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegetarian'],
        available: true,
        prepTime: '15 mins',
        calories: 320
      },
      {
        id: 2,
        name: 'Seared Scallops',
        description: 'Pan-seared scallops with cauliflower purée and pancetta chips',
        ingredients: ['Fresh scallops', 'Cauliflower', 'Pancetta', 'Butter', 'White wine'],
        allergens: ['Shellfish', 'Dairy'],
        price: 24,
        image: 'https://images.unsplash.com/photo-1559847844-d5f7bf4d3e78?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['gluten-free'],
        available: true,
        prepTime: '12 mins',
        calories: 180
      },
      {
        id: 3,
        name: 'Burrata Salad',
        description: 'Fresh burrata with heirloom tomatoes, basil oil, and aged balsamic',
        ingredients: ['Burrata cheese', 'Heirloom tomatoes', 'Fresh basil', 'Extra virgin olive oil', 'Aged balsamic vinegar'],
        allergens: ['Dairy'],
        price: 16,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegetarian', 'gluten-free'],
        available: true,
        prepTime: '8 mins',
        calories: 220
      },
      {
        id: 4,
        name: 'Oysters Rockefeller',
        description: 'Fresh oysters baked with spinach, herbs, and hollandaise sauce',
        ingredients: ['Fresh oysters', 'Spinach', 'Shallots', 'Herbs', 'Hollandaise sauce', 'Breadcrumbs'],
        allergens: ['Shellfish', 'Dairy', 'Eggs'],
        price: 22,
        image: 'https://images.unsplash.com/photo-1606853965439-14d4b27c5514?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: [],
        available: true,
        prepTime: '18 mins',
        calories: 160
      }
    ]
  },
  {
    id: 'entrees',
    name: 'Main Course',
    icon: 'UtensilsCrossed',
    items: [
      {
        id: 5,
        name: 'Wagyu Ribeye',
        description: '12oz A5 Wagyu ribeye with roasted bone marrow and seasonal vegetables',
        ingredients: ['A5 Wagyu ribeye', 'Bone marrow', 'Seasonal vegetables', 'Rosemary', 'Sea salt'],
        allergens: [],
        price: 85,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['gluten-free'],
        available: true,
        prepTime: '25 mins',
        calories: 680
      },
      {
        id: 6,
        name: 'Lobster Risotto',
        description: 'Creamy arborio rice with maine lobster, saffron, and micro herbs',
        ingredients: ['Maine lobster', 'Arborio rice', 'Saffron', 'White wine', 'Parmesan', 'Micro herbs'],
        allergens: ['Shellfish', 'Dairy', 'Alcohol'],
        price: 42,
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d293?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['gluten-free'],
        available: true,
        prepTime: '20 mins',
        calories: 420
      },
      {
        id: 7,
        name: 'Duck Confit',
        description: 'Slow-cooked duck leg with cherry gastrique and wild rice pilaf',
        ingredients: ['Duck leg', 'Wild rice', 'Cherries', 'Red wine vinegar', 'Herbs de Provence'],
        allergens: ['Alcohol'],
        price: 38,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['gluten-free'],
        available: false,
        prepTime: '35 mins',
        calories: 520
      },
      {
        id: 8,
        name: 'Vegan Wellington',
        description: 'Mushroom and walnut wellington with roasted vegetables and red wine jus',
        ingredients: ['Mixed mushrooms', 'Walnuts', 'Puff pastry', 'Root vegetables', 'Red wine', 'Fresh herbs'],
        allergens: ['Nuts', 'Gluten', 'Alcohol'],
        price: 32,
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegan'],
        available: true,
        prepTime: '30 mins',
        calories: 480
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: 'Cake',
    items: [
      {
        id: 9,
        name: 'Chocolate Soufflé',
        description: 'Warm dark chocolate soufflé with vanilla bean ice cream',
        ingredients: ['Dark chocolate', 'Eggs', 'Sugar', 'Vanilla beans', 'Heavy cream', 'Butter'],
        allergens: ['Dairy', 'Eggs', 'Gluten'],
        price: 14,
        image: 'https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegetarian'],
        available: true,
        prepTime: '25 mins',
        calories: 380
      },
      {
        id: 10,
        name: 'Lemon Tart',
        description: 'Classic French lemon tart with torched meringue and berry coulis',
        ingredients: ['Lemons', 'Pastry crust', 'Eggs', 'Sugar', 'Butter', 'Mixed berries'],
        allergens: ['Dairy', 'Eggs', 'Gluten'],
        price: 12,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegetarian'],
        available: true,
        prepTime: '15 mins',
        calories: 320
      },
      {
        id: 11,
        name: 'Tiramisu',
        description: 'Traditional tiramisu with espresso-soaked ladyfingers and mascarpone',
        ingredients: ['Mascarpone', 'Ladyfingers', 'Espresso', 'Cocoa powder', 'Marsala wine', 'Eggs'],
        allergens: ['Dairy', 'Eggs', 'Gluten', 'Alcohol'],
        price: 13,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegetarian'],
        available: true,
        prepTime: '10 mins',
        calories: 420
      },
      {
        id: 12,
        name: 'Vegan Chocolate Mousse',
        description: 'Rich chocolate mousse made with avocado and coconut cream',
        ingredients: ['Avocado', 'Coconut cream', 'Dark chocolate', 'Maple syrup', 'Vanilla extract'],
        allergens: [],
        price: 11,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegan', 'gluten-free'],
        available: true,
        prepTime: '12 mins',
        calories: 280
      }
    ]
  },
  {
    id: 'drinks',
    name: 'Beverages',
    icon: 'Coffee',
    items: [
      {
        id: 13,
        name: 'Craft Cocktail Selection',
        description: 'House-made cocktails featuring premium spirits and fresh ingredients',
        ingredients: ['Premium spirits', 'Fresh fruits', 'Herbs', 'House-made syrups', 'Artisanal bitters'],
        allergens: ['Alcohol'],
        price: 16,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: [],
        available: true,
        prepTime: '5 mins',
        calories: 180
      },
      {
        id: 14,
        name: 'Wine Pairing Selection',
        description: 'Curated wine selection to complement your dining experience',
        ingredients: ['Premium wines', 'Varietals from renowned vineyards'],
        allergens: ['Alcohol', 'Sulfites'],
        price: 12,
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: [],
        available: true,
        prepTime: '2 mins',
        calories: 120
      },
      {
        id: 15,
        name: 'Artisanal Coffee',
        description: 'Single-origin coffee beans roasted in-house with precision',
        ingredients: ['Single-origin coffee beans', 'Filtered water'],
        allergens: [],
        price: 6,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegan'],
        available: true,
        prepTime: '4 mins',
        calories: 5
      },
      {
        id: 16,
        name: 'Fresh Pressed Juices',
        description: 'Cold-pressed juices made from organic fruits and vegetables',
        ingredients: ['Organic fruits', 'Organic vegetables', 'Fresh herbs'],
        allergens: [],
        price: 8,
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        dietary: ['vegan', 'gluten-free'],
        available: true,
        prepTime: '3 mins',
        calories: 80
      }
    ]
  }
]


const timeSlots = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
]

function MainFeature() {
  const [searchQuery, setSearchQuery] = useState('')

  const [activeTab, setActiveTab] = useState('menu')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tableTasteFavorites')
    return saved ? JSON.parse(saved) : []
  })
  

  const [selectedCategory, setSelectedCategory] = useState('appetizers')
  const [selectedItem, setSelectedItem] = useState(null)
  
  // Reservation state
  const [reservationForm, setReservationForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: ''
  })
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState(timeSlots)
  
  // Review state
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 0,
    comment: ''
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely incredible dining experience! The Wagyu ribeye was cooked to perfection and the service was impeccable.',
      date: new Date('2024-01-15'),
      verified: true
    },
    {
      id: 2,
      customerName: 'Michael Chen',
      rating: 5,
      comment: 'The ambiance is perfect for a romantic dinner. The lobster risotto is a must-try!',
      date: new Date('2024-01-10'),
      verified: true
    },
    {
      id: 3,
      customerName: 'Emily Davis',
      rating: 4,
      comment: 'Great food and atmosphere. The chocolate soufflé was divine. Will definitely be back!',
      date: new Date('2024-01-08'),
      verified: true
    }
  ])

  // Error boundary state
  const [componentError, setComponentError] = useState(null)

  // Safe error handling wrapper
  const safeExecute = (fn, fallback = null) => {
    try {
      return fn()
    } catch (error) {
      console.warn('Safe execution error:', error)
      setComponentError(error.message)
      return fallback
    }
  }



  const tabs = [
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
    { id: 'reservations', label: 'Reservations', icon: 'Calendar' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ]

  useEffect(() => {
    // Simulate different availability based on selected date
    if (selectedDate) {
      safeExecute(() => {
        const date = new Date(selectedDate)
        if (date && !isNaN(date.getTime())) {
          if (date.getDay() === 5 || date.getDay() === 6) { // Friday or Saturday
            setAvailableTimes(timeSlots.filter((_, index) => index % 2 === 0)) // Limited slots
          } else {
            setAvailableTimes(timeSlots)
          }
        }
      })
    }
  }, [selectedDate])


  const handleReservationSubmit = (e) => {
    e.preventDefault()
    if (!reservationForm.customerName || !reservationForm.email || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields')
      return
    }

    // Simulate API call
    safeExecute(() => {
      setTimeout(() => {
        if (selectedDate && reservationForm.customerName) {
          const formattedDate = safeExecute(
            () => format(new Date(selectedDate), 'MMMM d, yyyy'),
            selectedDate
          )
          toast.success(`Reservation confirmed for ${reservationForm.customerName} on ${formattedDate} at ${selectedTime}`)
          setReservationForm({
            customerName: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            partySize: 2,
            specialRequests: ''
          })
          setSelectedDate('')
          setSelectedTime('')
        }
      }, 1000)
    })

  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewForm.customerName || !reviewForm.comment || reviewForm.rating === 0) {
      toast.error('Please fill in all required fields and provide a rating')
      return
    }

    const newReview = {
      id: reviews.length + 1,
      ...reviewForm,
      date: new Date(),
      verified: false
    }

    setReviews([newReview, ...reviews])
    setReviewForm({
      customerName: '',
      rating: 0,
      comment: ''
    })
    setHoverRating(0)
    toast.success('Thank you for your review! It will be published after verification.')
  }

  const formatDate = (date) => {
    return safeExecute(() => {
      if (!date || isNaN(new Date(date).getTime())) return 'Invalid Date'
      if (isToday(date)) return 'Today'
      if (isTomorrow(date)) return 'Tomorrow'
      return format(date, 'MMM d')
    }, 'Date')
  }

  const getDietaryBadgeColor = (dietary) => {
    switch (dietary) {
      case 'vegetarian': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'vegan': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      case 'gluten-free': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-200'
    }
  }

  const getAllergenBadgeColor = (allergen) => {
    const colors = {
      'Dairy': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Gluten': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Nuts': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Shellfish': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Eggs': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Alcohol': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Sulfites': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    }
    return colors[allergen] || 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-200'
  }

  const toggleFavorite = (item) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.id === item.id)
    let newFavorites
    
    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== item.id)
      toast.info(`Removed ${item.name} from favorites`)
    } else {
      newFavorites = [...favorites, item]
      toast.success(`Added ${item.name} to favorites`)
    }
    
    setFavorites(newFavorites)
    localStorage.setItem('tableTasteFavorites', JSON.stringify(newFavorites))
  }

  const shareItem = async (item) => {
    const shareData = {
      title: `${item.name} - TableTaste`,
      text: `Check out this delicious ${item.name}: ${item.description}`,
      url: window.location.href
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        toast.success('Dish shared successfully!')
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Failed to share dish')
        }
      }
    } else {
      // Fallback to copying to clipboard
      try {
        const textToShare = `${item.name} - ${item.description}\nPrice: $${item.price}\nView at: ${window.location.href}`
        await navigator.clipboard.writeText(textToShare)
        toast.success('Dish details copied to clipboard!')
      } catch (error) {
        toast.error('Failed to copy dish details')
      }
    }
  }

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.id === itemId)
  }


  const getFilteredItems = () => {
    if (!searchQuery.trim()) return []
    
    const allItems = menuCategories.flatMap(category => 
      category.items.map(item => ({ ...item, category: category.name }))
    )
    
    return allItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }




  // Component error display
  if (componentError) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Component Error</h3>
            <p className="text-red-600 mb-4">{componentError}</p>
            <button 
              onClick={() => {
                setComponentError(null)
                window.location.reload()
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Reload Component
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-6">
          Experience TableTaste
        </h2>
        <p className="text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
          Discover our curated menu, reserve your perfect table, and share your dining experience
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 md:mb-12">
        <div className="neu-card dark:neu-card-dark p-2 rounded-2xl inline-flex">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {menuCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
                      : 'neu-card dark:neu-card-dark text-surface-700 dark:text-surface-300 hover:shadow-md'
                  }`}
                >
                  <ApperIcon name={category.icon} className="w-5 h-5" />
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ApperIcon name="Search" className="w-5 h-5 text-surface-400 dark:text-surface-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu items by name or ingredient..."
                  className="w-full pl-12 pr-12 py-4 neu-card dark:neu-card-dark rounded-2xl text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300 text-lg"
                />
                {searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <ApperIcon name="X" className="w-5 h-5 text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300" />
                  </motion.button>
                )}
              </div>
            </div>



            {/* Menu Items */}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            {/* Search Results or Menu Items */}
            {searchQuery ? (
              <div>
                <div className="text-center mb-6">
                  <p className="text-surface-600 dark:text-surface-400">
                    {getFilteredItems().length > 0 
                      ? `Found ${getFilteredItems().length} item${getFilteredItems().length === 1 ? '' : 's'} matching "${searchQuery}"`
                      : `No items found matching "${searchQuery}"`
                    }
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {getFilteredItems().map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`neu-card dark:neu-card-dark rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                        !item.available ? 'opacity-60' : ''
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {!item.available && (
                          <div className="absolute inset-0 bg-surface-900/50 flex items-center justify-center">
                            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                              Sold Out
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="bg-primary text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                            ${item.price}
                          </span>
                        </div>

                        <div className="absolute top-4 left-4">
                          <span className="bg-surface-900/80 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(item)
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                isFavorite(item.id)
                                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                                  : 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                              }`}
                            >
                              <ApperIcon 
                                name="Heart" 
                                className={`w-4 h-4 ${
                                  isFavorite(item.id) ? 'fill-current' : ''
                                }`} 
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                shareItem(item)
                              }}
                              className="p-2 rounded-full bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                            >
                              <ApperIcon name="Share2" className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="space-y-3">
                          {/* Dietary and Allergen Info */}
                          <div className="flex flex-wrap gap-2">
                            {item.dietary.map((diet) => (
                              <span
                                key={diet}
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${getDietaryBadgeColor(diet)}`}
                              >
                                {diet}
                              </span>
                            ))}
                            {item.allergens.length > 0 && (
                              <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                                Contains: {item.allergens.join(', ')}
                              </span>
                            )}
                          </div>
                          
                          {/* Additional Info */}
                          <div className="flex items-center justify-between text-xs text-surface-500 dark:text-surface-400">
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="Clock" className="w-3 h-3" />
                              <span>{item.prepTime}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="Flame" className="w-3 h-3" />
                              <span>{item.calories} cal</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {menuCategories
                  .find(cat => cat.id === selectedCategory)
                  ?.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`neu-card dark:neu-card-dark rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                        !item.available ? 'opacity-60' : ''
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {!item.available && (
                          <div className="absolute inset-0 bg-surface-900/50 flex items-center justify-center">
                            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                              Sold Out
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="bg-primary text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                            ${item.price}
                          </span>
                        </div>

                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(item)
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                isFavorite(item.id)
                                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                                  : 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                              }`}
                            >
                              <ApperIcon 
                                name="Heart" 
                                className={`w-4 h-4 ${
                                  isFavorite(item.id) ? 'fill-current' : ''
                                }`} 
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                shareItem(item)
                              }}
                              className="p-2 rounded-full bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                            >
                              <ApperIcon name="Share2" className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="space-y-3">
                          {/* Dietary and Allergen Info */}
                          <div className="flex flex-wrap gap-2">
                            {item.dietary.map((diet) => (
                              <span
                                key={diet}
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${getDietaryBadgeColor(diet)}`}
                              >
                                {diet}
                              </span>
                            ))}
                            {item.allergens.length > 0 && (
                              <span className="text-xs text-surface-500 dark:text-surface-400 font-medium">
                                Contains: {item.allergens.join(', ')}
                              </span>
                            )}
                          </div>
                          
                          {/* Additional Info */}
                          <div className="flex items-center justify-between text-xs text-surface-500 dark:text-surface-400">
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="Clock" className="w-3 h-3" />
                              <span>{item.prepTime}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="Flame" className="w-3 h-3" />
                              <span>{item.calories} cal</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <motion.div
            key="reservations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="neu-card dark:neu-card-dark p-6 md:p-8 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-6 text-center">
                Reserve Your Table
              </h3>
              
              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={reservationForm.customerName}
                      onChange={(e) => setReservationForm({...reservationForm, customerName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({...reservationForm, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Party Size
                    </label>
                    <select
                      value={reservationForm.partySize}
                      onChange={(e) => setReservationForm({...reservationForm, partySize: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                    Select Date *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {[...Array(14)].map((_, index) => {
                      const date = addDays(new Date(), index)
                      const dateStr = safeExecute(() => format(date, 'yyyy-MM-dd'), '')
                      if (!dateStr) return null
                      
                      return (
                        <motion.button
                          key={dateStr}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedDate === dateStr
                              ? 'bg-primary text-white shadow-lg'
                              : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                          }`}
                        >
                          <div className="text-xs font-medium">
                            {formatDate(date)}
                          </div>
                          <div className="text-lg font-bold">
                            {safeExecute(() => format(date, 'd'), index + 1)}
                          </div>
                        </motion.button>
                      )
                    }).filter(Boolean)}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Select Time *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {availableTimes.map((time) => (
                        <motion.button
                          key={time}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl font-medium transition-all ${
                            selectedTime === time
                              ? 'bg-primary text-white shadow-lg'
                              : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={reservationForm.specialRequests}
                    onChange={(e) => setReservationForm({...reservationForm, specialRequests: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Any dietary restrictions, allergies, or special occasions..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  <span>Confirm Reservation</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}


        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Submit Review Form */}
              <div className="neu-card dark:neu-card-dark p-6 md:p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">
                  Share Your Experience
                </h3>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={reviewForm.customerName}
                      onChange={(e) => setReviewForm({...reviewForm, customerName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Rating *
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setReviewForm({...reviewForm, rating: star})}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1"
                        >
                          <ApperIcon 
                            name="Star" 
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoverRating || reviewForm.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-surface-300 dark:text-surface-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your dining experience..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Send" className="w-5 h-5" />
                    <span>Submit Review</span>
                  </motion.button>
                </form>
              </div>

              {/* Reviews Display */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Customer Reviews
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neu-card dark:neu-card-dark p-6 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-surface-900 dark:text-white flex items-center space-x-2">
                            <span>{review.customerName}</span>
                            {review.verified && (
                              <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-500" />
                            )}
                          </h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <ApperIcon
                                key={i}
                                name="Star"
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-surface-300 dark:text-surface-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-surface-500 dark:text-surface-400">
                          {safeExecute(() => format(review.date, 'MMM d, yyyy'), 'Recent')}
                        </span>

                      </div>
                      <p className="text-surface-700 dark:text-surface-300">
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
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="neu-card dark:neu-card-dark max-w-2xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-64 object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-surface-900/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </motion.button>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-primary text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
                    ${selectedItem.price}
                  </span>
                </div>

              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                  {selectedItem.name}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-lg leading-relaxed mb-6">
                  {selectedItem.description}
                </p>
                
                {selectedItem.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedItem.dietary.map((diet) => (
                      <span
                        key={diet}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${getDietaryBadgeColor(diet)}`}
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                )}
                {selectedItem.allergens.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">
                      Allergen Information
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.allergens.map((allergen) => (
                        <span
                          key={allergen}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${getAllergenBadgeColor(allergen)}`}
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.ingredients && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">
                      Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-400 mb-6">
                  <span className="flex items-center space-x-2">
                    <ApperIcon name="Clock" className="w-4 h-4" />
                    <span>Prep time: {selectedItem.prepTime}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <ApperIcon name="Flame" className="w-4 h-4" />
                    <span>{selectedItem.calories} calories</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toggleFavorite(selectedItem)
                    }}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                      isFavorite(selectedItem.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600'
                    }`}
                  >
                    <ApperIcon 
                      name="Heart" 
                      className={`w-5 h-5 ${
                        isFavorite(selectedItem.id) ? 'fill-current' : ''
                      }`} 
                    />
                    <span>{isFavorite(selectedItem.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => shareItem(selectedItem)}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-dark transition-all flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Share2" className="w-5 h-5" />
                    <span>Share this Dish</span>
                  </motion.button>
                </div>

                <div className="flex justify-center mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedItem.available}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                      selectedItem.available
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg'
                        : 'bg-surface-300 dark:bg-surface-600 text-surface-500 dark:text-surface-400 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (selectedItem.available) {
                        toast.success(`Added ${selectedItem.name} to your order`)
                        setSelectedItem(null)
                      }
                    }}
                  >
                    <ApperIcon name="Plus" className="w-5 h-5" />
                    <span>{selectedItem.available ? 'Add to Order' : 'Currently Unavailable'}</span>
                  </motion.button>

                </div>
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature