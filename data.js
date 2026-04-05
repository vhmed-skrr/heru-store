// ─────────────────────────────
// DEFAULT DATA (fallback only)
// ─────────────────────────────

const DEFAULT_PRODUCTS = [
  {id:"p1", name_ar:"لوحة - صوت المدينة",
   name_en:"City Sound Poster",
   price:85, category:"poster", stock:15,
   is_featured:true, rating:4.8, reviews:46,
   images:[], 
   description_ar:"لوحة فنية بتصميم عصري مستوحى من أجواء الموسيقى الحضرية"},
  {id:"p2", name_ar:"لوحة - ليل القاهرة",
   name_en:"Cairo Night Poster",
   price:70, category:"poster", stock:8,
   is_featured:false, rating:5.0, reviews:23,
   images:[],
   description_ar:"تصميم يلتقط روح ليالي القاهرة الصاخبة"},
  {id:"p3", name_ar:"لوحة - روح الجاز",
   name_en:"Jazz Soul Poster",
   price:90, category:"poster", stock:3,
   is_featured:false, rating:4.5, reviews:17,
   images:[],
   description_ar:"لوحة مستوحاة من الأجواء الكلاسيكية لموسيقى الجاز"},
  {id:"p4", name_ar:"لوحة - ألوان الفجر",
   name_en:"Dawn Colors Poster",
   price:75, category:"poster", stock:12,
   is_featured:true, rating:4.6, reviews:31,
   images:[],
   description_ar:"تصميم بألوان دافئة ومؤثرة"},
  {id:"n1", name_ar:"نوت بوك - ويكيند ووريور",
   name_en:"Weekend Warrior Notebook",
   price:75, category:"notebook", stock:20,
   is_featured:true, rating:4.9, reviews:58,
   images:[],
   description_ar:"دفتر أنيق مثالي للأفكار اليومية"},
  {id:"n2", name_ar:"نوت بوك - كلمات وألوان",
   name_en:"Words & Colors Notebook",
   price:65, category:"notebook", stock:25,
   is_featured:false, rating:4.6, reviews:29,
   images:[],
   description_ar:"دفتر بتصميم ملون وحيوي"},
  {id:"n3", name_ar:"نوت بوك - الفن الحر",
   name_en:"Free Art Notebook",
   price:70, category:"notebook", stock:18,
   is_featured:false, rating:4.9, reviews:41,
   images:[],
   description_ar:"للعقول الإبداعية التي لا تعرف الحدود"},
  {id:"n4", name_ar:"نوت بوك - يوميات شارع",
   name_en:"Street Diary Notebook",
   price:60, category:"notebook", stock:30,
   is_featured:false, rating:4.7, reviews:22,
   images:[],
   description_ar:"سجّل أفكارك بأسلوب المدينة"},
  {id:"s1", name_ar:"كشكول - أسود بلا عنوان",
   name_en:"Untitled Black Sketchbook",
   price:90, category:"sketchbook", stock:10,
   is_featured:true, rating:4.7, reviews:35,
   images:[],
   description_ar:"كشكول سلك بتصميم غامض وجذاب"},
  {id:"s2", name_ar:"كشكول - ذكريات الأسفلت",
   name_en:"Asphalt Memories Sketchbook",
   price:95, category:"sketchbook", stock:7,
   is_featured:false, rating:4.8, reviews:19,
   images:[],
   description_ar:"مستوحى من شوارع وأزقة المدينة"},
  {id:"s3", name_ar:"كشكول - نبضات الشارع",
   name_en:"Street Pulse Sketchbook",
   price:85, category:"sketchbook", stock:14,
   is_featured:false, rating:4.8, reviews:27,
   images:[],
   description_ar:"التقط نبض الشارع في كل صفحة"},
  {id:"s4", name_ar:"كشكول - سكتش فري",
   name_en:"Sketch Free Sketchbook",
   price:80, category:"sketchbook", stock:0,
   is_featured:false, rating:4.6, reviews:15,
   images:[],
   description_ar:"كشكول بورق عالي الجودة للرسم الحر"}
]

const DEFAULT_CATEGORIES = [
  {id:"cat_1", name_ar:"لوحات", name_en:"Posters",
   icon:"🎨", slug:"poster", color:"#A78BFA",
   is_active:true, order:1},
  {id:"cat_2", name_ar:"نوت بوك", name_en:"Notebooks",
   icon:"📓", slug:"notebook", color:"#60A5FA",
   is_active:true, order:2},
  {id:"cat_3", name_ar:"كشاكيل", name_en:"Sketchbooks",
   icon:"🖊", slug:"sketchbook", color:"#FBBF24",
   is_active:true, order:3}
]

const DEFAULT_SETTINGS = {
  store_name: "Heru",
  store_name_ar: "هيرو",
  whatsapp: "201124519232",
  instagram: "",
  tiktok: "",
  facebook: "",
  tagline_ar: "اتعبر عن نفسك بأسلوبك",
  free_shipping_text: "شحن مجاني لكل مصر 🇪🇬",
  cloudinary_cloud_name: "",
  cloudinary_upload_preset: ""
}

// ─────────────────────────────
// INIT — seed defaults on first visit
// ─────────────────────────────
function initStore() {
  if (!localStorage.getItem("heru_products")) {
    localStorage.setItem("heru_products", 
      JSON.stringify(DEFAULT_PRODUCTS))
  }
  if (!localStorage.getItem("heru_categories")) {
    localStorage.setItem("heru_categories", 
      JSON.stringify(DEFAULT_CATEGORIES))
  }
  if (!localStorage.getItem("heru_settings")) {
    localStorage.setItem("heru_settings", 
      JSON.stringify(DEFAULT_SETTINGS))
  }
  if (!localStorage.getItem("heru_orders")) {
    localStorage.setItem("heru_orders", 
      JSON.stringify([]))
  }
  if (!localStorage.getItem("heru_reviews")) {
    localStorage.setItem("heru_reviews", 
      JSON.stringify([]))
  }
  if (!localStorage.getItem("heru_store_reviews")) {
    localStorage.setItem("heru_store_reviews",
      JSON.stringify([
        {id:"sr_001", reviewer_name:"سارة م.",
         reviewer_city:"القاهرة", rating:5,
         comment:"اشتريت نوت بوك وجه أحسن من الصور، التصميم جميل وجودة الورق ممتازة",
         is_approved:true, created_at:"2025-01-10"},
        {id:"sr_002", reviewer_name:"أحمد ك.",
         reviewer_city:"الإسكندرية", rating:5,
         comment:"الكشكول وصل في يومين وتغليفه محترم جداً، هشتري تاني قريب",
         is_approved:true, created_at:"2025-01-15"},
        {id:"sr_003", reviewer_name:"مريم ع.",
         reviewer_city:"الجيزة", rating:5,
         comment:"اللوحة زينت أوضتي، الجودة أحسن من سعرها",
         is_approved:true, created_at:"2025-01-20"}
      ]))
  }
  if (!localStorage.getItem("heru_suggestions")) {
    localStorage.setItem("heru_suggestions",
      JSON.stringify([]))
  }
}

// ─────────────────────────────
// GETTERS — always read from localStorage
// ─────────────────────────────

function getProducts() {
  try {
    const data = localStorage.getItem("heru_products")
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS
  } catch(e) {
    return DEFAULT_PRODUCTS
  }
}

function getCategories() {
  try {
    const data = localStorage.getItem("heru_categories")
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES
  } catch(e) {
    return DEFAULT_CATEGORIES
  }
}

function getSettings() {
  try {
    const data = localStorage.getItem("heru_settings")
    return data ? {...DEFAULT_SETTINGS, ...JSON.parse(data)} 
                : DEFAULT_SETTINGS
  } catch(e) {
    return DEFAULT_SETTINGS
  }
}

function getOrders() {
  try {
    const data = localStorage.getItem("heru_orders")
    return data ? JSON.parse(data) : []
  } catch(e) { return [] }
}

function getReviews() {
  try {
    const data = localStorage.getItem("heru_reviews")
    return data ? JSON.parse(data) : []
  } catch(e) { return [] }
}

function getStoreReviews() {
  try {
    const data = localStorage.getItem("heru_store_reviews")
    return data ? JSON.parse(data) : []
  } catch(e) { return [] }
}

function getSuggestions() {
  try {
    const data = localStorage.getItem("heru_suggestions")
    return data ? JSON.parse(data) : []
  } catch(e) { return [] }
}

function getProductById(id) {
  return getProducts().find(p => p.id === id) || null
}

function getProductsByCategory(slug) {
  return getProducts().filter(p => p.category === slug)
}

function getFeaturedProducts() {
  const featured = getProducts().filter(p => p.is_featured)
  return featured.length > 0 ? featured : getProducts().slice(0,4)
}

function getCategoryBySlug(slug) {
  return getCategories().find(c => c.slug === slug) || null
}

function getActiveCategories() {
  return getCategories()
    .filter(c => c.is_active)
    .sort((a,b) => a.order - b.order)
}

// ─────────────────────────────
// SETTERS — admin uses these to save
// ─────────────────────────────

function saveProducts(products) {
  localStorage.setItem("heru_products", 
    JSON.stringify(products))
}

function saveCategories(categories) {
  localStorage.setItem("heru_categories",
    JSON.stringify(categories))
}

function saveSettings(settings) {
  const current = getSettings()
  localStorage.setItem("heru_settings",
    JSON.stringify({...current, ...settings}))
}

function saveOrders(orders) {
  localStorage.setItem("heru_orders",
    JSON.stringify(orders))
}

function saveReviews(reviews) {
  localStorage.setItem("heru_reviews",
    JSON.stringify(reviews))
}

function saveStoreReviews(reviews) {
  localStorage.setItem("heru_store_reviews",
    JSON.stringify(reviews))
}

function saveSuggestions(suggestions) {
  localStorage.setItem("heru_suggestions",
    JSON.stringify(suggestions))
}

function addProduct(product) {
  const products = getProducts()
  product.id = "p_" + Date.now()
  product.created_at = new Date().toISOString()
  products.push(product)
  saveProducts(products)
  return product
}

function updateProduct(id, updates) {
  const products = getProducts()
  const index = products.findIndex(p => p.id === id)
  if (index !== -1) {
    products[index] = {...products[index], ...updates}
    saveProducts(products)
    return products[index]
  }
  return null
}

function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id)
  saveProducts(products)
}

function addCategory(category) {
  const categories = getCategories()
  category.id = "cat_" + Date.now()
  category.created_at = new Date().toISOString()
  categories.push(category)
  saveCategories(categories)
  return category
}

function updateCategory(id, updates) {
  const categories = getCategories()
  const index = categories.findIndex(c => c.id === id)
  if (index !== -1) {
    categories[index] = {...categories[index], ...updates}
    saveCategories(categories)
  }
}

function deleteCategory(id) {
  const categories = getCategories().filter(c => c.id !== id)
  saveCategories(categories)
}

function addOrder(order) {
  const orders = getOrders()
  const num = String(orders.length + 1).padStart(4, '0')
  order.id = `ORD-${new Date().getFullYear()}-${num}`
  order.created_at = new Date().toISOString()
  orders.push(order)
  saveOrders(orders)
  return order
}

function updateOrderStatus(id, status) {
  const orders = getOrders()
  const index = orders.findIndex(o => o.id === id)
  if (index !== -1) {
    orders[index].status = status
    orders[index].timeline = orders[index].timeline || []
    orders[index].timeline.push({
      status: status,
      time: new Date().toLocaleString('ar-EG')
    })
    saveOrders(orders)
  }
}

function addReview(review) {
  const reviews = getReviews()
  review.id = "rev_" + Date.now()
  review.is_approved = false
  review.created_at = new Date().toISOString()
  reviews.push(review)
  saveReviews(reviews)
  return review
}

function addStoreReview(review) {
  const reviews = getStoreReviews()
  review.id = "sr_" + Date.now()
  review.is_approved = false
  review.created_at = new Date().toISOString()
  reviews.push(review)
  saveStoreReviews(reviews)
  return review
}

function addSuggestion(suggestion) {
  const suggestions = getSuggestions()
  suggestion.id = "sug_" + Date.now()
  suggestion.status = "new"
  suggestion.created_at = new Date().toISOString()
  suggestions.push(suggestion)
  saveSuggestions(suggestions)
  return suggestion
}

// ─────────────────────────────
// CART FUNCTIONS
// ─────────────────────────────

function getCart() {
  try {
    const data = localStorage.getItem("heru_cart")
    return data ? JSON.parse(data) : {items:[], promo:null}
  } catch(e) {
    return {items:[], promo:null}
  }
}

function saveCart(cart) {
  localStorage.setItem("heru_cart", JSON.stringify(cart))
}

function addToCart(product, quantity = 1) {
  const cart = getCart()
  const existing = cart.items.find(i => i.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.items.push({
      id: product.id,
      name_ar: product.name_ar,
      price: product.price,
      image: product.images?.[0] || "",
      quantity: quantity
    })
  }
  saveCart(cart)
  updateCartBadge()
  return cart
}

function removeFromCart(productId) {
  const cart = getCart()
  cart.items = cart.items.filter(i => i.id !== productId)
  saveCart(cart)
  updateCartBadge()
}

function updateCartQuantity(productId, qty) {
  const cart = getCart()
  const item = cart.items.find(i => i.id === productId)
  if (item) {
    item.quantity = Math.max(1, qty)
    saveCart(cart)
    updateCartBadge()
  }
}

function clearCart() {
  saveCart({items:[], promo:null})
  updateCartBadge()
}

function getCartCount() {
  return getCart().items.reduce((sum, i) => sum + i.quantity, 0)
}

function getCartSubtotal() {
  return getCart().items.reduce(
    (sum, i) => sum + (i.price * i.quantity), 0)
}

function updateCartBadge() {
  const count = getCartCount()
  document.querySelectorAll('[data-cart-badge]').forEach(el => {
    el.textContent = count
    el.style.display = count > 0 ? 'flex' : 'none'
  })
}

// ─────────────────────────────
// WHATSAPP
// ─────────────────────────────

function getWhatsAppNumber() {
  return getSettings().whatsapp || "201124519232"
}

function openWhatsApp(message) {
  const number = getWhatsAppNumber()
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

function generateOrderMessage(order) {
  let items = order.items.map((item, i) =>
    `${i+1}. ${item.name_ar}\n   الكمية: ${item.quantity}\n   السعر: ${item.price * item.quantity} جنيه`
  ).join('\n\n')
  
  let msg = `🛍️ طلب جديد — متجر Heru\n\n`
  msg += `━━━━━━━━━━━━━━━━━━━━\n`
  msg += `🔖 رقم الطلب: ${order.id}\n\n`
  msg += `👤 بيانات العميل:\n`
  msg += `الاسم: ${order.customer_name}\n`
  msg += `الهاتف: ${order.phone}\n`
  msg += `المحافظة: ${order.governorate}\n`
  msg += `المدينة: ${order.city}\n`
  msg += `العنوان: ${order.address}\n`
  if (order.notes) msg += `ملاحظات: ${order.notes}\n`
  msg += `\n━━━━━━━━━━━━━━━━━━━━\n`
  msg += `📦 المنتجات:\n\n${items}\n\n`
  msg += `━━━━━━━━━━━━━━━━━━━━\n`
  msg += `🧾 الحساب:\n`
  msg += `المجموع: ${order.subtotal} جنيه\n`
  if (order.discount > 0)
    msg += `الخصم: -${order.discount} جنيه\n`
  msg += `✅ الإجمالي: ${order.total} جنيه\n`
  msg += `🚚 الشحن: مجاني\n`
  msg += `💳 الدفع: كاش عند الاستلام`
  return msg
}

// ─────────────────────────────
// SETTINGS APPLY TO PAGE
// ─────────────────────────────

function applySettingsToPage() {
  const s = getSettings()
  
  document.querySelectorAll('[data-store-name]')
    .forEach(el => el.textContent = s.store_name)
  
  document.querySelectorAll('[data-store-name-ar]')
    .forEach(el => el.textContent = s.store_name_ar)
  
  document.querySelectorAll('[data-tagline]')
    .forEach(el => el.textContent = s.tagline_ar)
  
  document.querySelectorAll('[data-whatsapp-link]')
    .forEach(el => {
      const msg = el.getAttribute('data-msg') || ''
      el.href = `https://wa.me/${s.whatsapp}` +
                (msg ? `?text=${encodeURIComponent(msg)}` : '')
    })
  
  const ig = document.querySelector('[data-social="instagram"]')
  if (ig) {
    ig.href = s.instagram || '#'
    ig.style.display = s.instagram ? 'inline-flex' : 'none'
  }
  
  const tt = document.querySelector('[data-social="tiktok"]')
  if (tt) {
    tt.href = s.tiktok || '#'
    tt.style.display = s.tiktok ? 'inline-flex' : 'none'
  }
  
  const fb = document.querySelector('[data-social="facebook"]')
  if (fb) {
    fb.href = s.facebook || '#'
    fb.style.display = s.facebook ? 'inline-flex' : 'none'
  }
}

// ─────────────────────────────
// RUN ON EVERY PAGE
// ─────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initStore()
  applySettingsToPage()
  updateCartBadge()
})

// ─────────────────────────────
// UI SHARED COMPONENTS
// ─────────────────────────────
function renderProductCard(product) {
  const cat = getCategoryBySlug(product.category)
  const catColor = cat ? cat.color : "#A0A0A0"
  const catName = cat ? cat.name_ar : product.category
  const image = product.images?.[0] || ''
  const stars = '★'.repeat(Math.round(product.rating || 0)) +
                '☆'.repeat(5 - Math.round(product.rating || 0))
  
  return `
    <div class="product-card" 
         data-product-id="${product.id}"
         onclick="window.location='/product?id=${product.id}'">
      <div class="card-image-wrap">
        ${image 
          ? `<img src="${image}" alt="${product.name_ar}" 
                  loading="lazy">`
          : `<div class="card-placeholder" 
                  style="background:${catColor}22">
               <span>${product.name_ar}</span>
             </div>`
        }
        ${product.is_featured 
          ? '<span class="featured-badge">مميز ✦</span>' 
          : ''}
        <div class="card-hover-bar">
          <button class="add-to-cart-btn" 
                  data-id="${product.id}"
                  onclick="event.stopPropagation(); handleAddToCart('${product.id}')">
            أضف للسلة
          </button>
        </div>
      </div>
      <div class="card-info">
        <span class="cat-badge" 
              style="color:${catColor};
                     background:${catColor}22">
          ${catName}
        </span>
        <h3 class="card-name">${product.name_ar}</h3>
        <div class="card-meta">
          <span class="card-rating">${stars} (${product.reviews || 0})</span>
          <span class="card-price">${product.price} جنيه</span>
        </div>
      </div>
    </div>
  `
}

function handleAddToCart(productId) {
  const product = getProductById(productId)
  if (!product) return
  if (product.stock === 0) {
    showToast('نفذت الكمية', 'error')
    return
  }
  addToCart(product)
  showToast('✓ تمت الإضافة للسلة', 'success')
}

function attachCardEvents() {
  // Events are inline via onclick — no extra needed
  // But refresh cart badge
  updateCartBadge()
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  toast.style.cssText = `
    position:fixed; bottom:24px; 
    inset-inline-start:24px; z-index:9999;
    padding:12px 20px; border-radius:8px;
    font-family:Cairo,sans-serif;
    font-weight:600; font-size:14px;
    background:var(--bg-elevated);
    border-inline-start:4px solid var(--${type==='success'?'success':type==='error'?'error':'accent'});
    color:var(--text-primary);
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
    animation:slideIn 300ms ease;
  `
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

