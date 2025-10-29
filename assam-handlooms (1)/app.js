// Sample Products Database
function getProducts() {
  // Get vendor products from localStorage
  const vendorProducts = []
  const users = JSON.parse(localStorage.getItem("users")) || []

  users.forEach((user) => {
    if (user.role === "vendor") {
      const userVendorProducts = JSON.parse(localStorage.getItem("vendorProducts_" + user.id)) || []
      vendorProducts.push(...userVendorProducts)
    }
  })

  // Get admin products
  const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || []

  // Default products
  const defaultProducts = [
    // Sarees
    {
      id: 1,
      name: "Traditional Assamese Saree",
      category: "Sarees",
      price: 4500,
      originalPrice: 5999,
      discount: 25,
      rating: 4.8,
      reviews: 156,
      image: "https://iili.io/KruBsqX.png",
      description: "Authentic handwoven Assamese saree with traditional patterns",
    },
    {
      id: 2,
      name: "Silk Blend Saree",
      category: "Sarees",
      price: 6800,
      originalPrice: 8999,
      discount: 24,
      rating: 4.9,
      reviews: 178,
      image: "https://iili.io/Kruohzl.png",
      description: "Elegant silk blend saree with intricate patterns",
    },
    {
      id: 3,
      name: " Assam Heritage Orange Linen Fabric",
      category: "Sarees",
      price: 1999,
      originalPrice: 3000,
      discount: 25,
      rating: 4.9,
      reviews: 267,
      image: "https://iili.io/K62K8iP.jpg",
      description: "Premium yellow silk fabric roll with elegant red floral embroidery. Soft, lustrous, and perfect for crafting traditional Assamese attire or custom designs",
    },
    {
      id: 4,
      name: "Cotton Saree Casual",
      category: "Sarees",
      price: 3200,
      originalPrice: 4299,
      discount: 25,
      rating: 4.7,
      reviews: 142,
      image: "https://iili.io/KruTljf.png",
      description: "Comfortable cotton saree for daily wear",
    },
    {
      id: 5,
      name: "Assam Heritage Traditional Gold Gamkharu",
      category: "Sarees",
      price: 2999,
      originalPrice: 3599,
      discount: 25,
      rating: 4.8,
      reviews: 189,
      image: "https://iili.io/K62qpAG.jpg",
      description: ":Elegant gold-polished Assamese Gamkharu with intricate traditional designs — perfect for festive and cultural wear.",
    },
    // Mekhela Chador
    {
      id: 6,
      name: "Assamese wear ( tongali) ",
      category: "Mekhela Chador",
      price: 499,
      originalPrice: 699,
      discount: 26,
      rating: 4.9,
      reviews: 203,
      image: "https://iili.io/KryYaeV.jpg",
      description: " Assamese traditional handloom (tongali) red piece of cloth with intricate gold and white design at the end",
    },
    
    {
      id: 8,
      name: "Hanloom Jute bag ",
      category: "Mekhela Chador",
      price: 349,
      originalPrice: 400,
      discount: 25,
      rating: 4.9,
      reviews: 178,
      image: "https://iili.io/KrylWru.jpg",
      description: "Premium silk Mekhela Chador with intricate designs",
    },
    {
      id: 9,
      name: "Mekhela Chador Festive",
      category: "Mekhela Chador",
      price: 7800,
      originalPrice: 10399,
      discount: 25,
      rating: 4.9,
      reviews: 156,
      image: "https://iili.io/KruRXaI.webp",
      description: "Festive Mekhela Chador with gold embroidery",
    },
    // Fabrics
    {
      id: 10,
      name: "Assamese jewellery ( Jonbiri)",
      category: "Fabrics",
      price: 1200,
      originalPrice: 1599,
      discount: 25,
      rating: 4.7,
      reviews: 89,
      image: "https://iili.io/Kry1cVS.jpg",
      description: "Such jewelry is often worn with Mekhela Chador during Assamese cultural events, Bihu festivals, and traditional ceremonies, representing elegance and Assamese heritage.",
    },
    
  ]

  return [...defaultProducts, ...adminProducts, ...vendorProducts]
}

// Cart Management
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || []
}

function addToCart(productId) {
  const cart = getCart()
  const existingItem = cart.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ productId, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  showNotification("Added to cart!", "success")
}

function updateCartCount() {
  const cart = getCart()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const elements = document.querySelectorAll("#cartCount")
  elements.forEach((el) => (el.textContent = count))
}

// Wishlist Management
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || []
}

function toggleWishlist(productId) {
  const wishlist = getWishlist()
  const index = wishlist.indexOf(productId)

  if (index > -1) {
    wishlist.splice(index, 1)
    showNotification("Removed from wishlist", "info")
  } else {
    wishlist.push(productId)
    showNotification("Added to wishlist!", "success")
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  updateWishlistCount()
}

function updateWishlistCount() {
  const wishlist = getWishlist()
  const elements = document.querySelectorAll("#wishlistCount")
  elements.forEach((el) => (el.textContent = wishlist.length))
}

// Enhanced Authentication
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}

function getUserById(userId) {
  return getUsers().find((u) => u.id === userId)
}

// Order Management
function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || []
}

function createOrder(cartItems, shippingAddress, paymentMethod) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const products = getProducts()

  const orderItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      productId: item.productId,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    }
  })

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 100
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const order = {
    id: Date.now(),
    userId: currentUser.id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    shipping,
    tax,
    total,
    status: "Processing",
    date: new Date().toISOString(),
    trackingNumber: "TRK" + Date.now(),
  }

  const orders = getOrders()
  orders.push(order)
  localStorage.setItem("orders", JSON.stringify(orders))

  return order
}

function getOrdersByUser(userId) {
  return getOrders().filter((order) => order.userId === userId)
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders()
  const order = orders.find((o) => o.id === orderId)
  if (order) {
    order.status = status
    localStorage.setItem("orders", JSON.stringify(orders))
  }
}

// Admin Dashboard Functions
function viewOrder(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    const products = getProducts();
    const users = getUsers();
    const user = users.find(u => u.id === order.userId);

    let orderDetails = `Order #${order.id}\n`;
    orderDetails += `Customer: ${user ? user.name : 'Unknown'}\n`;
    orderDetails += `Email: ${user ? user.email : 'N/A'}\n`;
    orderDetails += `Date: ${new Date(order.date).toLocaleString()}\n`;
    orderDetails += `Status: ${order.status}\n\n`;
    orderDetails += `Items:\n`;

    order.items.forEach(item => {
      orderDetails += `- ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    });

    orderDetails += `\nSubtotal: ₹${order.subtotal}\n`;
    orderDetails += `Shipping: ₹${order.shipping}\n`;
    orderDetails += `Tax: ₹${order.tax}\n`;
    orderDetails += `Total: ₹${order.total}\n\n`;

    if (order.shippingAddress) {
      orderDetails += `Shipping Address:\n${order.shippingAddress}\n\n`;
    }

    orderDetails += `Payment Method: ${order.paymentMethod}\n`;
    if (order.trackingNumber) {
      orderDetails += `Tracking Number: ${order.trackingNumber}`;
    }

    alert(orderDetails);
  }
}

function editProduct(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    const newName = prompt('Enter new product name:', product.name);
    const newPrice = prompt('Enter new price:', product.price);
    const newCategory = prompt('Enter new category:', product.category);

    if (newName && newPrice && newCategory) {
      // For admin, we need to update the default products or vendor products
      // This is a simplified version - in a real app, you'd have proper product management
      showNotification('Product editing not fully implemented yet', 'warning');
    }
  }
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    // For admin, we need to handle deletion from default products or vendor products
    // This is a simplified version
    showNotification('Product deletion not fully implemented yet', 'warning');
  }
}

function viewVendor(vendorId) {
  const users = getUsers();
  const vendor = users.find(u => u.id === vendorId && u.role === 'vendor');
  if (vendor) {
    const vendorProducts = getVendorProducts(vendorId);
    const orders = getOrders();
    const vendorOrders = orders.filter(o => {
      return o.items.some(item => {
        const product = getProducts().find(p => p.id === item.productId);
        return product && product.vendorId === vendorId;
      });
    });

    const totalRevenue = vendorOrders.reduce((sum, order) => sum + order.total, 0);

    let vendorDetails = `Vendor: ${vendor.name}\n`;
    vendorDetails += `Email: ${vendor.email}\n`;
    vendorDetails += `Joined: ${new Date(vendor.createdAt).toLocaleDateString()}\n`;
    vendorDetails += `Products: ${vendorProducts.length}\n`;
    vendorDetails += `Orders: ${vendorOrders.length}\n`;
    vendorDetails += `Revenue: ₹${totalRevenue.toLocaleString()}\n`;

    alert(vendorDetails);
  }
}

function deactivateVendor(vendorId) {
  if (confirm('Are you sure you want to deactivate this vendor?')) {
    const users = getUsers();
    const vendor = users.find(u => u.id === vendorId && u.role === 'vendor');
    if (vendor) {
      vendor.status = 'inactive';
      localStorage.setItem('users', JSON.stringify(users));
      showNotification('Vendor deactivated successfully', 'success');
      // Reload the vendors table
      if (typeof loadVendorsTable === 'function') {
        loadVendorsTable();
      }
    }
  }
}

function activateVendor(vendorId) {
  if (confirm('Are you sure you want to activate this vendor?')) {
    const users = getUsers();
    const vendor = users.find(u => u.id === vendorId && u.role === 'vendor');
    if (vendor) {
      vendor.status = 'active';
      localStorage.setItem('users', JSON.stringify(users));
      showNotification('Vendor activated successfully', 'success');
      // Reload the vendors table
      if (typeof loadVendorsTable === 'function') {
        loadVendorsTable();
      }
    }
  }
}

// Address Management
function getAddresses() {
  return JSON.parse(localStorage.getItem("addresses")) || []
}

function addAddress(address) {
  const addresses = getAddresses()
  addresses.push(address)
  localStorage.setItem("addresses", JSON.stringify(addresses))
}

// Review Management
function getReviews() {
  return JSON.parse(localStorage.getItem("reviews")) || []
}

function addReview(productId, rating, comment) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const review = {
    id: Date.now(),
    productId,
    userId: currentUser.id,
    userName: currentUser.name,
    rating,
    comment,
    date: new Date().toISOString(),
  }

  const reviews = getReviews()
  reviews.push(review)
  localStorage.setItem("reviews", JSON.stringify(reviews))
  return review
}

function getProductReviews(productId) {
  return getReviews().filter((r) => r.productId === productId)
}

// Discount Code Management
function validateDiscountCode(code) {
  const discountCodes = {
    WELCOME10: 0.1,
    SAVE20: 0.2,
    SUMMER15: 0.15,
  }
  return discountCodes[code] || null
}

// Enhanced Notifications
function showNotification(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px; animation: slideIn 0.3s ease;"
  alertDiv.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "danger" ? "exclamation-circle" : "info-circle"}"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `
  document.body.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.remove()
  }, 3000)
}

// Search and Filter Enhancement
function searchProducts(query) {
  const products = getProducts()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()),
  )
}

// Analytics
function getAnalytics() {
  const orders = getOrders()
  const users = getUsers()
  const products = getProducts()

  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalCustomers: users.length,
    totalProducts: products.length,
    averageOrderValue: orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length) : 0,
  }
}

// Authentication
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (currentUser) {
    const userDisplay = document.getElementById("userDisplay")
    if (userDisplay) {
      userDisplay.textContent = currentUser.name.split(" ")[0]
    }

    // Show logout option
    const btn = event.target.closest("button")
    if (btn) {
      btn.onclick = logout
    }
  } else {
    window.location.href = "login.html"
  }
}

function logout() {
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

function initializeDemoAccounts() {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || []
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@assamHeritage.com",
        password: "Admin@123",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Vendor User",
        email: "vendor@assamHeritage.com",
        password: "Vendor@123",
        role: "vendor",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Customer User",
        email: "customer@assamHeritage.com",
        password: "Customer@123",
        role: "customer",
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem("users", JSON.stringify(demoUsers))
  }
}

function getVendorProducts(vendorId) {
  return JSON.parse(localStorage.getItem("vendorProducts_" + vendorId)) || []
}

function addVendorProduct(vendorId, product) {
  const products = getVendorProducts(vendorId)
  product.id = Date.now()
  product.vendorId = vendorId
  product.createdAt = new Date().toISOString()
  products.push(product)
  localStorage.setItem("vendorProducts_" + vendorId, JSON.stringify(products))
  return product
}

function updateVendorProduct(vendorId, productId, updatedProduct) {
  const products = getVendorProducts(vendorId)
  const index = products.findIndex((p) => p.id === productId)
  if (index > -1) {
    products[index] = { ...products[index], ...updatedProduct }
    localStorage.setItem("vendorProducts_" + vendorId, JSON.stringify(products))
    return products[index]
  }
  return null
}

function deleteVendorProduct(vendorId, productId) {
  const products = getVendorProducts(vendorId)
  const filtered = products.filter((p) => p.id !== productId)
  localStorage.setItem("vendorProducts_" + vendorId, JSON.stringify(filtered))
  return true
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleSearchKeyPress(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
}

function performSearch() {
  const query = document.getElementById('navSearch').value.trim();
  if (query) {
    localStorage.setItem('searchQuery', query);
    window.location.href = 'products.html?search=' + encodeURIComponent(query);
  } else {
    showNotification('Please enter a search term', 'warning');
  }
}

function handleLogin(event) {
  event.preventDefault()
  const email = document.getElementById("loginEmail").value.trim()
  const password = document.getElementById("loginPassword").value

  if (!email || !password) {
    showNotification("Please fill in all fields", "danger")
    return
  }

  const users = JSON.parse(localStorage.getItem("users")) || []
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
    showNotification(`Welcome back, ${user.name}! Redirecting...`, "success")
    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "admin-dashboard.html"
      } else if (user.role === "vendor") {
        window.location.href = "vendor-dashboard.html"
      } else {
        window.location.href = "index.html"
      }
    }, 1500)
  } else {
    showNotification("Invalid email or password. Please try again.", "danger")
    document.getElementById("loginPassword").value = ""
  }
}

function showAlert(message, type) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px; animation: slideIn 0.3s ease;"
  alertDiv.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "danger" ? "exclamation-circle" : "info-circle"}"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `
  document.body.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.remove()
  }, 3000)
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  updateWishlistCount()
  checkAuth()
})
