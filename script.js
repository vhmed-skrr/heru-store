// STORE CONFIGURATION
let localSettings = {};
try {
  const s = localStorage.getItem('heru_settings');
  if(s) localSettings = JSON.parse(s);
} catch(e) {}

const STORE_CONFIG = {
  name: localSettings.name || "Heru",
  nameAr: localSettings.name || "هيرو",
  whatsapp: localSettings.whatsapp || "201124519232",
  currency: "EGP",
  currencyAr: "جنيه",
  shipping: "مجاني لكل مصر 🇪🇬",
  adminPassword: localSettings.adminPassword || "admin123"
};

// MOCK CATEGORIES DATA
const DEFAULT_CATEGORIES = [
  {
    id: "cat_1",
    name_ar: "لوحات",
    name_en: "Posters",
    icon: "🎨",
    slug: "poster",
    color: "#A78BFA",
    is_active: true,
    order: 1,
    created_at: ""
  },
  {
    id: "cat_2",
    name_ar: "نوت بوك",
    name_en: "Notebooks",
    icon: "📓",
    slug: "notebook",
    color: "#60A5FA",
    is_active: true,
    order: 2,
    created_at: ""
  },
  {
    id: "cat_3",
    name_ar: "كشاكيل",
    name_en: "Sketchbooks",
    icon: "🖊",
    slug: "sketchbook",
    color: "#FBBF24",
    is_active: true,
    order: 3,
    created_at: ""
  }
];

if (!localStorage.getItem('heru_categories')) {
  localStorage.setItem('heru_categories', JSON.stringify(DEFAULT_CATEGORIES));
}

window.getCategories = () => {
    try {
        const data = localStorage.getItem('heru_categories');
        if(!data) return DEFAULT_CATEGORIES;
        const parsed = JSON.parse(data);
        return parsed.sort((a,b) => a.order - b.order);
    } catch(e) {
        return DEFAULT_CATEGORIES;
    }
};

const DEFAULT_STORE_REVIEWS = [
  {
    id: "sr_001",
    reviewer_name: "سارة م.",
    reviewer_city: "القاهرة",
    rating: 5,
    comment: "اشتريت نوت بوك وجه أحسن من الصور، التصميم جميل وجودة الورق ممتازة",
    is_approved: true,
    created_at: "2025-01-10"
  },
  {
    id: "sr_002",
    reviewer_name: "أحمد ك.",
    reviewer_city: "الإسكندرية",
    rating: 5,
    comment: "الكشكول وصل في يومين وتغليفه محترم جداً، هشتري تاني قريب",
    is_approved: true,
    created_at: "2025-01-15"
  },
  {
    id: "sr_003",
    reviewer_name: "مريم ع.",
    reviewer_city: "الجيزة",
    rating: 5,
    comment: "اللوحة زينت أوضتي، كل الناس بتسألني عنها. الجودة أحسن من سعرها",
    is_approved: true,
    created_at: "2025-01-20"
  }
];

if (!localStorage.getItem('heru_store_reviews')) {
  localStorage.setItem('heru_store_reviews', JSON.stringify(DEFAULT_STORE_REVIEWS));
}

window.getCategoryColor = (slug) => {
    const cats = window.getCategories();
    const cat = cats.find(c => c.slug === slug);
    return cat && cat.color ? cat.color : "#A0A0A0";
};

window.getCategoryIcon = (slug) => {
    const cats = window.getCategories();
    const cat = cats.find(c => c.slug === slug);
    return cat && cat.icon ? cat.icon : "📦";
};

const getCategoryNameAr = (slug) => {
    const cats = window.getCategories();
    const cat = cats.find(c => c.slug === slug);
    return cat && cat.name_ar ? cat.name_ar : slug;
};

window.getCategoryBadgeStyle = (slug) => {
    const color = window.getCategoryColor(slug);
    return `background: ${color}33; color: ${color};`;
};

// MOCK PRODUCTS DATA
const DEFAULT_PRODUCTS = [
  {id:"p1", name_ar:"لوحة - صوت المدينة", name_en:"City Sound Poster", price:85, category:"poster", stock:15, is_featured:true, rating:4.8, reviews:46, description_ar:"لوحة فنية بتصميم عصري مستوحى من أجواء الموسيقى الحضرية"},
  {id:"p2", name_ar:"لوحة - ليل القاهرة", name_en:"Cairo Night Poster", price:70, category:"poster", stock:8, is_featured:false, rating:5.0, reviews:23, description_ar:"تصميم يلتقط روح ليالي القاهرة الصاخبة"},
  {id:"p3", name_ar:"لوحة - روح الجاز", name_en:"Jazz Soul Poster", price:90, category:"poster", stock:3, is_featured:false, rating:4.5, reviews:17, description_ar:"لوحة مستوحاة من الأجواء الكلاسيكية لموسيقى الجاز"},
  {id:"p4", name_ar:"لوحة - ألوان الفجر", name_en:"Dawn Colors Poster", price:75, category:"poster", stock:12, is_featured:true, rating:4.6, reviews:31, description_ar:"تصميم بألوان دافئة ومؤثرة"},
  {id:"n1", name_ar:"نوت بوك - ويكيند ووريور", name_en:"Weekend Warrior Notebook", price:75, category:"notebook", stock:20, is_featured:true, rating:4.9, reviews:58, description_ar:"دفتر أنيق مثالي للأفكار اليومية"},
  {id:"n2", name_ar:"نوت بوك - كلمات وألوان", name_en:"Words & Colors Notebook", price:65, category:"notebook", stock:25, is_featured:false, rating:4.6, reviews:29, description_ar:"دفتر بتصميم ملون وحيوي"},
  {id:"n3", name_ar:"نوت بوك - الفن الحر", name_en:"Free Art Notebook", price:70, category:"notebook", stock:18, is_featured:false, rating:4.9, reviews:41, description_ar:"للعقول الإبداعية التي لا تعرف الحدود"},
  {id:"n4", name_ar:"نوت بوك - يوميات شارع", name_en:"Street Diary Notebook", price:60, category:"notebook", stock:30, is_featured:false, rating:4.7, reviews:22, description_ar:"سجّل أفكارك بأسلوب المدينة"},
  {id:"s1", name_ar:"كشكول - أسود بلا عنوان", name_en:"Untitled Black Sketchbook", price:90, category:"sketchbook", stock:10, is_featured:true, rating:4.7, reviews:35, description_ar:"كشكول سلك بتصميم غامض وجذاب"},
  {id:"s2", name_ar:"كشكول - ذكريات الأسفلت", name_en:"Asphalt Memories Sketchbook", price:95, category:"sketchbook", stock:7, is_featured:false, rating:4.8, reviews:19, description_ar:"مستوحى من شوارع وأزقة المدينة"},
  {id:"s3", name_ar:"كشكول - نبضات الشارع", name_en:"Street Pulse Sketchbook", price:85, category:"sketchbook", stock:14, is_featured:false, rating:4.8, reviews:27, description_ar:"التقط نبض الشارع في كل صفحة"},
  {id:"s4", name_ar:"كشكول - سكتش فري", name_en:"Sketch Free Sketchbook", price:80, category:"sketchbook", stock:0, is_featured:false, rating:4.6, reviews:15, description_ar:"كشكول بورق عالي الجودة للرسم الحر"}
];

if (!localStorage.getItem('heru_products')) {
  localStorage.setItem('heru_products', JSON.stringify(DEFAULT_PRODUCTS));
}
window.PRODUCTS = JSON.parse(localStorage.getItem('heru_products'));

const PROMO_CODES = [
  {code:"WELCOME10", type:"percentage", value:10, min_order:50, active:true},
  {code:"SAVE20", type:"fixed", value:20, min_order:80, active:true}
];


/* =========================================================================
   DATA LAYER (LocalStorage)
   ========================================================================= */

// VALIDATION & SECURITY
const sanitizeInput = (str) => {
  if (!str) return '';
  str = str.replace(/<[^>]*>/g, '').replace(/javascript:/gi, '').replace(/on\w+=/gi, '').trim();
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', "/": '&#x2F;' };
  const reg = /[&<>"'/]/ig;
  return str.replace(reg, (match) => (map[match]));
};

const validateEgyptianPhone = (phone) => {
  const regex = /^01[0125][0-9]{8}$/;
  return regex.test(phone);
};

// CART
const getCart = () => {
  const data = localStorage.getItem('heru_cart');
  return data ? JSON.parse(data) : { items: [], promo: null };
};

const saveCart = (cart) => {
  localStorage.setItem('heru_cart', JSON.stringify(cart));
};

const addToCart = (productObjStr) => {
  const product = typeof productObjStr === 'string' ? JSON.parse(productObjStr) : productObjStr;
  const cart = getCart();
  const existing = cart.items.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += (product.quantity || 1);
  } else {
    cart.items.push({
      id: product.id,
      name_ar: product.name_ar,
      price: product.price,
      quantity: product.quantity || 1
    });
  }
  saveCart(cart);
  if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
  else if(typeof updateCartBadge === 'function') updateCartBadge();
  if(typeof window.showToast === 'function') window.showToast(`✓ تمت الإضافة للسلة`, 'success');
  else if(typeof showToast === 'function') showToast(`✓ تمت الإضافة للسلة`, 'success');
};

const removeFromCart = (productId) => {
  const cart = getCart();
  cart.items = cart.items.filter(i => i.id !== productId);
  saveCart(cart);
  if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
  else if(typeof updateCartBadge === 'function') updateCartBadge();
};

const updateQuantity = (productId, newQty) => {
  const cart = getCart();
  const item = cart.items.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(i => i.id !== productId);
    }
  }
  saveCart(cart);
  if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
  else if(typeof updateCartBadge === 'function') updateCartBadge();
};

const clearCart = () => {
  saveCart({ items: [], promo: null });
  if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
  else if(typeof updateCartBadge === 'function') updateCartBadge();
};

const getCartCount = () => {
  return getCart().items.reduce((acc, item) => acc + item.quantity, 0);
};

const getCartSubtotal = () => {
  return getCart().items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

// PROMO
const validatePromoCode = (code, subtotal) => {
  const PROMOS = window.PROMO_CODES || [];
  const codeObj = PROMOS.find(c => c.code === code.toUpperCase() && c.active);
  if (!codeObj) {
    return { valid: false, message: "الكود غير صحيح أو منتهي الصلاحية", discount_amount: 0 };
  }
  if (subtotal < codeObj.min_order) {
    return { valid: false, message: `يشتغل عند طلب أكثر من ${codeObj.min_order} جنيه`, discount_amount: 0 };
  }
  const discount = codeObj.type === 'percentage' ? (subtotal * codeObj.value / 100) : codeObj.value;
  return { valid: true, message: `✓ تم تطبيق كود ${codeObj.code}`, discount_amount: discount };
};

// SEED DATA
const seedData = () => {
  if (!localStorage.getItem('heru_reviews')) {
    const reviews = [];
    const mockReviewers = ["سارة م.", "خالد أ.", "مريم ع."];
    const mockComments = ["جودة ممتازة وسعر رائع", "التغليف شيك والمنتج سليم", "أحلى حاجة اشتريتها!"];
    
    (window.PRODUCTS || []).forEach(p => {
      for(let i=0; i<3; i++) {
        reviews.push({
          id: "rev_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
          product_id: p.id,
          reviewer_name: mockReviewers[i],
          rating: 5,
          comment: mockComments[i],
          is_approved: true,
          created_at: new Date().toISOString()
        });
      }
    });
    localStorage.setItem('heru_reviews', JSON.stringify(reviews));
  }

  if (!localStorage.getItem('heru_orders')) {
    const DEMO_ORDERS = [
      {
        id: "ORD-2025-0001", phone: "01012345678", customer_name: "أحمد محمد", status: "delivered",
        items: [{name_ar:"لوحة - صوت المدينة", qty:1, price:85}], total: 85, governorate: "القاهرة", payment_method: "cod", payment_status: "confirmed",
        timeline: [
          {status:"received", time:"الإثنين ١٠ نوف، ٣:٢٠ م"}, {status:"processing", time:"الثلاثاء ١١ نوف، ١٠:٠٠ ص"},
          {status:"shipped", time:"الأربعاء ١٢ نوف، ٢:٠٠ م"}, {status:"delivered", time:"الخميس ١٣ نوف، ٤:٣٠ م"}
        ], created_at: new Date().toISOString()
      },
      {
        id: "ORD-2025-0002", phone: "01098765432", customer_name: "سارة علي", status: "shipped",
        items: [{name_ar:"نوت بوك - ويكيند ووريور", qty:1, price:75}, {name_ar:"كشكول - أسود بلا عنوان", qty:1, price:90}],
        total: 165, governorate: "الإسكندرية", payment_method: "instapay", payment_status: "pending",
        timeline: [
          {status:"received", time:"الأحد ٩ نوف، ٦:٠٠ م"}, {status:"processing", time:"الإثنين ١٠ نوف، ٩:٠٠ ص"},
          {status:"shipped", time:"الثلاثاء ١١ نوف، ١:٠٠ م"}, {status:"delivered", time:null}
        ], created_at: new Date().toISOString()
      },
      {
        id: "ORD-2025-0003", phone: "01155544433", customer_name: "خالد إبراهيم", status: "processing",
        items: [{name_ar:"لوحة - ليل القاهرة", qty:2, price:140}], total: 140, governorate: "الجيزة", payment_method: "cod", payment_status: "pending",
        timeline: [
          {status:"received", time:"الثلاثاء ١١ نوف، ١١:٣٠ ص"}, {status:"processing", time:"الثلاثاء ١١ نوف، ٢:٠٠ م"},
          {status:"shipped", time:null}, {status:"delivered", time:null}
        ], created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem('heru_orders', JSON.stringify(DEMO_ORDERS));
  }
};
seedData();

// REVIEWS
const getAllReviewsRaw = () => {
    return JSON.parse(localStorage.getItem('heru_reviews') || '[]');
};
const getReviews = (productId) => {
    return getAllReviewsRaw().filter(r => r.product_id === productId && r.is_approved);
};
const getAllReviews = (productId) => {
    return getAllReviewsRaw().filter(r => r.product_id === productId);
};
const addReview = (productId, {name, rating, comment}) => {
    const reviews = getAllReviewsRaw();
    reviews.push({
        id: "rev_" + Date.now(),
        product_id: productId,
        reviewer_name: sanitizeInput(name),
        rating: parseInt(rating),
        comment: sanitizeInput(comment),
        is_approved: false, // Default is not approved
        created_at: new Date().toISOString()
    });
    localStorage.setItem('heru_reviews', JSON.stringify(reviews));
};

// ORDERS (admin)
const getOrders = () => JSON.parse(localStorage.getItem('heru_orders') || '[]');
const saveOrders = (orders) => localStorage.setItem('heru_orders', JSON.stringify(orders));

const getOrderById = (id) => {
    return getOrders().find(o => o.id === id) || null;
};
const updateOrderStatus = (id, newStatus) => {
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    if(order) {
        order.status = newStatus;
        const tlNode = order.timeline.find(t => t.status === newStatus);
        if(tlNode && !tlNode.time) tlNode.time = new Date().toLocaleString('ar-EG', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        saveOrders(orders);
    }
};
const confirmPayment = (id) => {
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    if(order) {
        order.payment_status = "confirmed";
        saveOrders(orders);
    }
};

// WHATSAPP
const generateWhatsAppMessage = (cartItems, discount, promoCode) => {
    let subtotal = 0;
    const itemsText = cartItems.map((item, idx) => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      return `${idx+1}. ${item.name_ar}\n   الكمية: ${item.quantity}\n   السعر: ${lineTotal} جنيه`;
    }).join('\n\n');

    let promoLine = '';
    if(discount > 0) {
      promoLine = `\nالخصم: -${discount} جنيه`;
      if(promoCode) promoLine += `\nكود الخصم: ${promoCode}`;
    }
    const total = subtotal - discount;

    return `🛍️ طلب جديد من متجر Heru

━━━━━━━━━━━━━━━━━━━━
📦 المنتجات:

${itemsText}

━━━━━━━━━━━━━━━━━━━━
🧾 ملخص الطلب:
المجموع: ${subtotal} جنيه${promoLine}
✅ الإجمالي: ${total} جنيه
🚚 الشحن: مجاني لكل مصر

━━━━━━━━━━━━━━━━━━━━
⬇️ بس محتاج منك:
- اسمك الكريم
- رقم تليفونك
- عنوان التوصيل
  (المحافظة + المدينة + الشارع)
- طريقة الدفع:
  كاش عند الاستلام 💵
  أو انستاباي 📱`;
};

const getWhatsAppURL = (message) => {
    const encoded = encodeURIComponent(message);
    const storeNumber = window.STORE_CONFIG ? window.STORE_CONFIG.whatsapp : "201124519232";
    return `https://wa.me/${storeNumber}?text=${encoded}`;
};

/* ========================================================================= */

// UI UPDATING UTILITIES
const updateCartBadge = () => {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = count;
    if (count > 0) {
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });
};

// TOAST NOTIFICATIONS
const showToast = (message, type = 'info', duration = 3000) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'info';
  if(type === 'success') icon = 'check-circle';
  if(type === 'error') icon = 'x-circle';
  
  toast.innerHTML = `<i data-lucide="${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  
  if (window.lucide) {
    lucide.createIcons({ root: toast });
  }
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// HOMEPAGE: Render Category Carousel
const renderCategoryCarousel = () => {
    const root = document.getElementById('category-carousel-root');
    if (!root) return;
    
    let categories = window.getCategories().filter(c => c.is_active);
    
    if(categories.length === 0) {
        root.innerHTML = '';
        return;
    }

    let cardsHtml = '';
    let dotsHtml = '';

    categories.forEach((cat, idx) => {
        const count = window.PRODUCTS.filter(p => p.category === cat.slug).length;

        cardsHtml += `
            <a href="/shop?cat=${cat.slug}" class="category-card" draggable="false">
                <div class="category-icon">${cat.icon}</div>
                <div class="category-title">${cat.name_ar}</div>
                <div class="category-subtitle"><span class="en-text">${cat.name_en}</span></div>
                <div class="category-count"><span class="en-text">${count}</span> منتج</div>
                <div class="category-card-arrow"><i data-lucide="arrow-left" style="width:18px;height:18px;"></i></div>
            </a>
        `;
        dotsHtml += `<div class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>`;
    });

    root.innerHTML = `
        <div class="carousel-btn carousel-btn-prev hidden" id="cat-prev-btn"><i data-lucide="chevron-right"></i></div>
        <div class="category-carousel" id="category-carousel-track">
            ${cardsHtml}
        </div>
        <div class="carousel-btn carousel-btn-next ${categories.length > 3 ? '' : 'hidden'}" id="cat-next-btn"><i data-lucide="chevron-left"></i></div>
        <div class="carousel-dots" id="cat-dots">
            ${dotsHtml}
        </div>
    `;

    if (window.lucide) {
        lucide.createIcons({ root: root });
    }

    const track = document.getElementById('category-carousel-track');
    const prevBtn = document.getElementById('cat-prev-btn');
    const nextBtn = document.getElementById('cat-next-btn');
    const dots = document.querySelectorAll('#cat-dots .carousel-dot');

    if(!track) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const updateNavigation = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const currentScroll = Math.abs(track.scrollLeft);

        if (currentScroll < 10) {
            if(prevBtn) prevBtn.classList.add('hidden');
        } else {
            if(prevBtn) prevBtn.classList.remove('hidden');
        }

        if (currentScroll > maxScroll - 10) {
            if(nextBtn) nextBtn.classList.add('hidden');
        } else {
            if(nextBtn) nextBtn.classList.remove('hidden');
        }

        if(dots.length > 0) {
            let activeIndex = Math.round((currentScroll / maxScroll) * (dots.length - 1)) || 0;
            dots.forEach(d => d.classList.remove('active'));
            if(dots[activeIndex]) dots[activeIndex].classList.add('active');
        }
    };

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('is-dragging');
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('is-dragging');
        updateNavigation();
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk; 
    });

    track.addEventListener('scroll', updateNavigation);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -track.clientWidth / 2, behavior: 'smooth' });
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: track.clientWidth / 2, behavior: 'smooth' });
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index'));
            const cards = track.querySelectorAll('.category-card');
            if(cards[idx]) {
                const targetScroll = cards[idx].offsetLeft - track.offsetLeft;
                track.scrollTo({ left: targetScroll, behavior: 'smooth' });
            }
        });
    });

    track.addEventListener('touchstart', (e) => {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    }, {passive: true});
    
    track.addEventListener('touchend', () => {
        isDown = false;
        track.classList.remove('is-dragging');
        updateNavigation();
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    }, {passive: true});

    setTimeout(updateNavigation, 100);
};

// HOMPAGE: Render Featured Products
const renderFeaturedProducts = () => {
  const grid = document.getElementById('featured-grid');
  if(!grid) return;
  
  const featuredIds = ['p1', 'p4', 'n1', 's1'];
  let displayed = PRODUCTS.filter(p => featuredIds.includes(p.id));
  const others = PRODUCTS.filter(p => !featuredIds.includes(p.id));
  displayed = [...displayed, ...others].slice(0, 8);
  
  grid.innerHTML = '';
  
  displayed.forEach(p => {
    const pStr = JSON.stringify({id: p.id, name_ar: p.name_ar, price: p.price}).replace(/"/g, '&quot;');
    const isFeaturedHtml = p.is_featured ? '<div class="featured-badge">مميز ✦</div>' : '';
    
    let imgColor = 'var(--bg-elevated)';
    imgColor = window.getCategoryColor(p.category);

    const html = `
      <div class="product-card scroll-reveal">
          <input type="checkbox" class="compare-checkbox">
          ${isFeaturedHtml}
          <a href="/product?id=${p.id}" style="text-decoration:none; color:inherit; display:flex; flex-direction:column; flex:1;">
              <div class="product-img-wrapper" style="background: ${imgColor};">
                  <div class="product-img"></div>
              </div>
              <div class="product-info">
                  <div style="display:flex;">
                      <span class="badge-category" style="${window.getCategoryBadgeStyle(p.category)}">${getCategoryNameAr(p.category)}</span>
                  </div>
                  <div class="product-name">${p.name_ar}</div>
                  <div class="product-rating">
                      <i data-lucide="star" style="width:14px;height:14px;fill:currentColor;"></i> 
                      <span class="en-text">${p.rating.toFixed(1)} (${p.reviews})</span>
                  </div>
                  <div class="product-price-row">
                      <span class="product-price en-text">${p.price} EGP</span>
                  </div>
              </div>
          </a>
          <button class="add-to-cart-bar" onclick="addToCart('${pStr}')">أضف للسلة</button>
      </div>
    `;
    grid.innerHTML += html;
  });
  
  if(window.lucide) lucide.createIcons({root: grid});
  observeScrollReveals(grid.querySelectorAll('.scroll-reveal'));
};

const observeScrollReveals = (elements) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  });
  elements.forEach(el => observer.observe(el));
};

// HOMEPAGE: Testimonials Carousel Logic
const initCarouselContainer = () => {
    const carouselContainer = document.querySelector('.carousel');
    if(!carouselContainer) return;
    
    let isHovered = false;
    carouselContainer.addEventListener('mouseenter', () => isHovered = true);
    carouselContainer.addEventListener('mouseleave', () => isHovered = false);
    
    setInterval(() => {
        if(isHovered || window.innerWidth > 1024) return;
        
        const first = carouselContainer.firstElementChild;
        carouselContainer.style.transition = 'transform 500ms ease';
        let moveDist = window.innerWidth > 768 ? '50%' : '100%';
        carouselContainer.style.transform = `translateX(calc(${moveDist} + var(--space-6)))`;
        
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            carouselContainer.style.transform = 'translateX(0)';
            carouselContainer.appendChild(first);
        }, 500); 
    }, 4000);
};

// MODAL UTILITIES
window.openModal = (id) => {
  const m = document.getElementById(id);
  if(m) m.classList.add('active');
};
window.closeModal = (id) => {
  const m = document.getElementById(id);
  if(m) m.classList.remove('active');
};

// SHOP PAGE LOGIC
const initShop = () => {
    const shopGrid = document.getElementById('shop-grid');
    if (!shopGrid) return; // Only execute on the shop page

    let currentFilters = {
        q: '',
        categories: [],
        minPrice: 0,
        maxPrice: 100,
        sort: 'latest'
    };
    
    let compareItems = [];

    // URL Parsing
    const params = new URLSearchParams(window.location.search);
    if(params.has('q')) currentFilters.q = params.get('q');
    if(params.has('cat')) currentFilters.categories.push(params.get('cat'));

    // DOM Elements
    const searchInput = document.getElementById('shop-search');
    const clearSearchBtn = document.getElementById('search-clear');
    
    // Inject Categories Dynamically
    const catContainer = document.getElementById('category-filters-container');
    if (catContainer) {
        const activeCats = window.getCategories().filter(c => c.is_active);
        let catHtml = '';
        activeCats.forEach(cat => {
            const productCount = window.PRODUCTS.filter(p => p.category === cat.slug).length;
            catHtml += `
            <label class="filter-option">
                <input type="checkbox" name="cat" value="${cat.slug}"> ${cat.name_ar} (${productCount})
            </label>
            `;
        });
        catContainer.innerHTML = catHtml;
    }

    const catChecks = document.querySelectorAll('input[name="cat"]');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceFill = document.getElementById('priceFill');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const liveCount = document.getElementById('live-results-count');
    const totalCountMuted = document.getElementById('total-results-muted');
    const emptyState = document.getElementById('empty-state');
    
    // UI Helpers
    const updateDualSliderUI = () => {
        let minV = parseInt(priceMin.value);
        let maxV = parseInt(priceMax.value);
        if(minV > maxV) { [minV, maxV] = [maxV, minV]; }
        const minPercent = (minV / 100) * 100;
        const maxPercent = (maxV / 100) * 100;
        priceFill.style.insetInlineStart = minPercent + '%';
        priceFill.style.width = (maxPercent - minPercent) + '%';
        document.getElementById('priceMinDisplay').textContent = minV;
        document.getElementById('priceMaxDisplay').textContent = maxV;
        currentFilters.minPrice = minV;
        currentFilters.maxPrice = maxV;
    };

    window.clearSearch = () => {
        searchInput.value = '';
        currentFilters.q = '';
        searchInput.dispatchEvent(new Event('input'));
    };
    
    window.clearFilters = () => {
        currentFilters = { q: '', categories: [], minPrice: 0, maxPrice: 100, sort: 'latest' };
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        catChecks.forEach(c => c.checked = false);
        priceMin.value = 0; priceMax.value = 100;
        updateDualSliderUI();
        sortRadios[0].checked = true; // latest
        renderProducts();
    };

    window.removeCompare = (id) => {
        compareItems = compareItems.filter(x => x.id !== id);
        const chk = document.querySelector(`.compare-checkbox[value="${id}"]`);
        if(chk) chk.checked = false;
        updateCompareBar();
    };

    const bindCompareChecks = () => {
        document.querySelectorAll('.compare-checkbox').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const id = e.target.value;
                if(e.target.checked) {
                    if(compareItems.length >= 3) {
                        e.target.checked = false;
                        showToast('يمكنك مقارنة 3 منتجات كحد أقصى', 'error');
                        return;
                    }
                    const p = PRODUCTS.find(x => x.id === id);
                    if(p) compareItems.push(p);
                } else {
                    compareItems = compareItems.filter(x => x.id !== id);
                }
                updateCompareBar();
            });
        });
    };

    const updateCompareBar = () => {
        const bar = document.getElementById('compare-bar');
        const container = document.getElementById('compare-items-container');
        const countSpan = document.getElementById('compare-count');
        
        if(compareItems.length >= 2) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
        
        countSpan.textContent = compareItems.length;
        container.innerHTML = '';
        
        compareItems.forEach(p => {
            let imgColor = 'var(--bg-elevated)';
            imgColor = window.getCategoryColor(p.category);
            container.innerHTML += `
            <div class="compare-item-mini" style="background: ${imgColor}">
                <div class="compare-item-remove" onclick="removeCompare('${p.id}')"><i data-lucide="x" style="width:12px;height:12px;"></i></div>
                <div style="font-size:10px; width: 100%; text-align: center; color: var(--text-primary); z-index: 1;">${window.getCategoryIcon(p.category)}</div>
            </div>
            `;
        });
        if(window.lucide) lucide.createIcons({root: bar});
        renderCompareModal();
    };

    const renderCompareModal = () => {
        const table = document.getElementById('compare-table');
        if(!table) return;
        
        let headers = `<tr><th>صورة</th>`;
        let names = `<tr><th>الاسم</th>`;
        let prices = `<tr><th>السعر</th>`;
        let cats = `<tr><th>التصنيف</th>`;
        let ratings = `<tr><th>التقييم</th>`;
        let desc = `<tr><th>الوصف</th>`;
        let ctas = `<tr><th></th>`;
        
        compareItems.forEach(p => {
            const pStr = JSON.stringify({id: p.id, name_ar: p.name_ar, price: p.price, category: p.category}).replace(/"/g, '&quot;');
            let imgColor = 'var(--bg-elevated)';
            imgColor = window.getCategoryColor(p.category);
            headers += `<td style="text-align:center"><div class="compare-img-large" style="background: ${imgColor}; display:inline-block;"></div></td>`;
            names += `<td><div class="compare-product-name">${p.name_ar}</div></td>`;
            prices += `<td><span class="en-text">${p.price}</span> EGP</td>`;
            cats += `<td><span class="badge-category" style="${window.getCategoryBadgeStyle(p.category)}">${getCategoryNameAr(p.category)}</span></td>`;
            ratings += `<td><i data-lucide="star" style="width:14px;height:14px;color:var(--warning);fill:currentColor;"></i> <span class="en-text">${p.rating.toFixed(1)}</span> (${p.reviews})</td>`;
            desc += `<td><p style="font-size:var(--text-sm);color:var(--text-secondary)">${p.description_ar}</p></td>`;
            ctas += `<td><button class="btn btn-primary" style="width:100%" onclick="addToCart('${pStr}')">أضف للسلة</button></td>`;
        });
        
        headers += `</tr>`; names += `</tr>`; prices += `</tr>`; cats += `</tr>`; ratings += `</tr>`; desc += `</tr>`; ctas += `</tr>`;
        
        table.innerHTML = headers + names + prices + cats + ratings + desc + ctas;
        if(window.lucide) lucide.createIcons({root: table});
    };

    const renderProducts = () => {
        let results = PRODUCTS.filter(p => {
            const matchQ = currentFilters.q === '' || p.name_ar.includes(currentFilters.q) || p.description_ar.includes(currentFilters.q);
            const matchCat = currentFilters.categories.length === 0 || currentFilters.categories.includes(p.category);
            const matchPrice = p.price >= currentFilters.minPrice && p.price <= currentFilters.maxPrice;
            return matchQ && matchCat && matchPrice;
        });

        // Sorting
        if (currentFilters.sort === 'price_asc') results.sort((a,b) => a.price - b.price);
        if (currentFilters.sort === 'price_desc') results.sort((a,b) => b.price - a.price);
        if (currentFilters.sort === 'rating') results.sort((a,b) => b.rating - a.rating);

        liveCount.innerHTML = `<span class="en-text">${results.length}</span> نتائج`;
        totalCountMuted.innerHTML = `<span class="en-text">${results.length}</span> منتج`;

        const isFiltered = currentFilters.q !== '' || currentFilters.categories.length > 0 || currentFilters.minPrice > 0 || currentFilters.maxPrice < 100;
        clearFiltersBtn.style.display = isFiltered ? 'block' : 'none';

        if(results.length === 0) {
            shopGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            shopGrid.style.display = 'grid';
            emptyState.style.display = 'none';
            
            shopGrid.innerHTML = '';
            results.forEach(p => {
                const isChecked = compareItems.find(c => c.id === p.id);
                const pStr = JSON.stringify({id: p.id, name_ar: p.name_ar, price: p.price, category: p.category}).replace(/"/g, '&quot;');
                
                let imgColor = 'var(--bg-elevated)';
                imgColor = window.getCategoryColor(p.category);

                shopGrid.innerHTML += `
                <div class="product-card scroll-reveal visible">
                    <input type="checkbox" class="compare-checkbox" value="${p.id}" ${isChecked ? 'checked' : ''}>
                    ${p.is_featured ? '<div class="featured-badge">مميز ✦</div>' : ''}
                    <a href="/product?id=${p.id}" style="text-decoration:none; color:inherit; display:flex; flex-direction:column; flex:1;">
                        <div class="product-img-wrapper" style="background: ${imgColor}; cursor: pointer;">
                            <div class="product-img"></div>
                        </div>
                        <div class="product-info">
                            <div style="display:flex;"><span class="badge-category" style="${window.getCategoryBadgeStyle(p.category)}">${getCategoryNameAr(p.category)}</span></div>
                            <div class="product-name" style="cursor: pointer;">${p.name_ar}</div>
                            <div class="product-rating">
                                <i data-lucide="star" style="width:14px;height:14px;fill:currentColor;"></i> 
                                <span class="en-text">${p.rating.toFixed(1)} (${p.reviews})</span>
                            </div>
                            <div class="product-price-row">
                                <span class="product-price en-text">${p.price} EGP</span>
                            </div>
                        </div>
                    </a>
                    <button class="add-to-cart-bar" onclick="addToCart('${pStr}')">أضف للسلة</button>
                </div>
                `;
            });
            if(window.lucide) lucide.createIcons({root: shopGrid});
            bindCompareChecks();
            observeScrollReveals(shopGrid.querySelectorAll('.scroll-reveal:not(.visible)'));
        }
    };

    // Initial setup
    if(currentFilters.q) {
        searchInput.value = currentFilters.q;
        clearSearchBtn.classList.remove('hidden');
    }
    if(currentFilters.categories.length > 0) {
        catChecks.forEach(chk => {
            if(currentFilters.categories.includes(chk.value)) chk.checked = true;
        });
    }
    updateDualSliderUI();

    // Skeletons 400ms delay on first render
    setTimeout(() => {
        renderProducts();
    }, 400);

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        currentFilters.q = e.target.value.toLowerCase();
        if(currentFilters.q) clearSearchBtn.classList.remove('hidden');
        else clearSearchBtn.classList.add('hidden');
        renderProducts();
    });

    catChecks.forEach(chk => {
        chk.addEventListener('change', () => {
            currentFilters.categories = Array.from(catChecks).filter(c => c.checked).map(c => c.value);
            renderProducts();
        });
    });

    priceMin.addEventListener('input', () => { updateDualSliderUI(); renderProducts(); });
    priceMax.addEventListener('input', () => { updateDualSliderUI(); renderProducts(); });

    sortRadios.forEach(rad => {
        rad.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            renderProducts();
        });
    });
};

// GLOBAL UTIL
window.toArabicDigits = (num) => {
    return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d] || d);
};

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  const isReqAdmin = window.location.pathname.includes('/admin');
  if(isReqAdmin && sessionStorage.getItem('heru_admin_auth') !== 'true' && window.location.pathname !== '/admin') {
      window.location.href = '/admin';
      return;
  }
  
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'تخطي إلى المحتوى';
  document.body.insertBefore(skipLink, document.body.firstChild);
  updateCartBadge();
  if (window.lucide) {
    lucide.createIcons();
  }
  
  // Custom renders
  renderCategoryCarousel();
  renderFeaturedProducts();
  initCarouselContainer();
  initShop();
  
  // Navbar scroll effect
  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  // Modal background click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) m.classList.remove('active');
    });
  });

  // Modal escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

  observeScrollReveals(document.querySelectorAll('.scroll-reveal'));
  initProductPage();
  if(typeof initCartPage !== 'undefined') initCartPage();
  if(typeof initCheckoutPage !== 'undefined') initCheckoutPage();
  if(typeof initConfirmationPage !== 'undefined') initConfirmationPage();
  if(typeof initTrackOrderPage !== 'undefined') initTrackOrderPage();

  // Global Arabic translation hook (skips intentionally western classes)
  setTimeout(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        const p = node.parentNode;
        if (!p || p.tagName === 'SCRIPT' || p.tagName === 'STYLE') continue;
        if (!p.closest('.en-text') && !p.closest('.product-price') && !p.closest('.summary-total') && !p.closest('.whatsapp-btn')) {
            if (/\d/.test(node.nodeValue)) {
                node.nodeValue = window.toArabicDigits(node.nodeValue);
            }
        }
    }
  }, 500); // Trigger after UI builds
});

// PRODUCT PAGE LOGIC
const initProductPage = () => {
    const root = document.getElementById('product-root');
    if(!root) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const products = JSON.parse(localStorage.getItem('heru_products')) || window.PRODUCTS;
    const product = products.find(p => p.id === productId);

    if(!product) {
        root.innerHTML = `
            <div style="text-align:center; padding: 100px 20px;">
                <h1 style="font-size:32px; font-weight:900; margin-bottom: 24px;">المنتج غير موجود</h1>
                <a href="/shop.html" class="btn btn-primary" style="display:inline-flex;">تصفح المتجر</a>
            </div>
        `;
        return;
    }

    const catName = product.category === 'poster' ? 'لوحات' : product.category === 'notebook' ? 'نوت بوك' : 'كشاكيل';
    
    // Breadcrumb
    let html = `
        <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:var(--text-muted); margin-bottom:32px; flex-wrap:wrap;">
            <a href="/" style="color:inherit; text-decoration:none;">الرئيسية</a>
            <i data-lucide="arrow-left" style="width:14px; height:14px;"></i>
            <a href="/shop.html" style="color:inherit; text-decoration:none;">المتجر</a>
            <i data-lucide="arrow-left" style="width:14px; height:14px;"></i>
            <a href="/shop.html?cat=${product.category}" style="color:inherit; text-decoration:none;">${catName}</a>
            <i data-lucide="arrow-left" style="width:14px; height:14px;"></i>
            <span style="color:var(--text-primary);">${product.name_ar}</span>
        </div>
    `;

    // Main Section
    let imgColor = window.getCategoryColor(product.category);
    let catColor = window.getCategoryColor(product.category);

    html += `
        <div style="display:flex; flex-wrap:wrap; gap:48px; margin-bottom: 64px;" class="product-main-flex">
            <!-- Images (Right conceptually, but RTL puts it logically first) -->
            <div style="flex: 1 1 55%; max-width: 100%; min-width: 300px;">
                <div style="aspect-ratio: 1/1; object-fit: cover; border-radius: 16px; background: ${imgColor}; cursor: zoom-in; display:flex; align-items:center; justify-content:center; color:white; font-size: 32px; font-weight:900; text-align:center; padding: 20px;" onclick="window.openLightbox('${imgColor}')" id="mainImageDisplay">
                    ${product.name_ar}
                </div>
            </div>
            
            <!-- Info (Left) -->
            <div style="flex: 1 1 40%; display:flex; flex-direction:column; gap:24px; min-width: 300px;">
                <div>
                    <span style="display:inline-block; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight:700; color: white; background: ${catColor}; margin-bottom: 16px;">${catName}</span>
                    <h1 style="font-size:32px; font-weight:900; line-height:1.2; margin-bottom: 8px;">${product.name_ar}</h1>
                    <div style="font-size:14px; color:var(--text-muted); font-family: 'Space Grotesk', sans-serif;">${product.name_en}</div>
                </div>
                
                <div style="display:flex; align-items:center; gap:8px; cursor: pointer;" onclick="document.getElementById('tab-reviews-btn').click(); document.getElementById('tabs-section').scrollIntoView({behavior:'smooth'})">
                    <span style="color:var(--warning); display:flex; align-items:center;">
                        <i data-lucide="star" style="fill:currentColor; width:18px;height:18px;"></i>
                        <i data-lucide="star" style="fill:currentColor; width:18px;height:18px;"></i>
                        <i data-lucide="star" style="fill:currentColor; width:18px;height:18px;"></i>
                        <i data-lucide="star" style="fill:currentColor; width:18px;height:18px;"></i>
                        <i data-lucide="star" style="fill:currentColor; width:18px;height:18px; opacity:${product.rating >= 4.5 ? 1 : 0.4}"></i>
                    </span>
                    <span class="en-text" style="font-weight:700;">${product.rating.toFixed(1)}</span>
                    <span style="color:var(--text-muted); font-size: 14px;">(${product.reviews} تقييم)</span>
                </div>
                
                <div style="font-size:48px; font-family:'Space Grotesk', sans-serif; font-weight:700; color:var(--accent);">
                    <span class="en-text">${product.price}</span> <span style="font-size:24px; font-family:'Cairo', sans-serif;">جنيه</span>
                </div>
                
                <div style="font-weight:600; font-size: 16px;">
                    ${product.stock > 5 ? '<span style="color:#22c55e;">● متوفر</span>' : 
                      product.stock > 0 ? `<span style="color:#f59e0b;">● كمية محدودة — <span class="en-text">${product.stock}</span> قطع فقط</span>` : 
                      '<span style="color:#ef4444;">● نفذت الكمية</span>'}
                </div>
                
                <p style="color:var(--text-secondary); line-height: 1.6; max-height: calc(1.6em * 3); overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                    ${product.description_ar}
                </p>
                
                <div style="height:1px; background:var(--border-color); width:100%;"></div>
                
                <!-- Quantity -->
                <div style="display:flex; align-items:center; gap:16px;">
                    <div style="display:flex; align-items:center; border: 1px solid var(--border-color); border-radius: 8px; overflow:hidden;">
                        <button onclick="updatePageQty(-1, ${product.stock})" style="background:none; border:none; padding:12px; cursor:pointer; color:var(--text-primary);" ${product.stock === 0 ? 'disabled' : ''}>&minus;</button>
                        <span id="pageQty" class="en-text" style="padding:0 16px; font-weight:bold; min-width:30px; text-align:center;">1</span>
                        <button onclick="updatePageQty(1, ${product.stock})" style="background:none; border:none; padding:12px; cursor:pointer; color:var(--text-primary);" ${product.stock === 0 ? 'disabled' : ''}>&plus;</button>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="display:flex; flex-direction:column; gap:12px; margin-top: 8px;">
                    <button id="addPageBtn" class="btn btn-primary" style="width:100%; height: 56px; font-size: 18px;" onclick="addPageToCart('${product.id}')" ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 'نفذت الكمية' : 'أضف للسلة 🛒'}
                    </button>
                    
                    <a href="javascript:void(0)" onclick="openPageWhatsApp('${product.name_ar}', ${product.price})" class="btn" style="width:100%; height: 56px; background:#25D366; color:white; font-size: 18px;">
                        اطلب الآن على واتساب 💬
                    </a>
                </div>
                
                <!-- Share -->
                <div style="display:flex; align-items:center; gap:12px; margin-top:16px;">
                    <span style="color:var(--text-muted);">شارك:</span>
                    <button class="icon-btn" onclick="shareWhatsApp()" title="شارك عبر واتساب" style="background:var(--bg-elevated);">
                        <i data-lucide="message-circle" style="color:#25D366; width:18px;height:18px;"></i>
                    </button>
                    <button class="icon-btn" onclick="copyProductLink()" title="انسخ الرابط" style="background:var(--bg-elevated);">
                        <i data-lucide="link" style="width:18px;height:18px;"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Tab Section
    const pReviews = getAllReviews(product.id);
    const approvedReviews = pReviews.filter(r => r.is_approved);
    
    html += `
        <div id="tabs-section" style="margin-top: 64px;">
            <div style="display:flex; border-bottom: 1px solid var(--border-color); margin-bottom: 32px; overflow-x: auto; scrollbar-width: none;">
                <button class="tab-btn active" onclick="switchProductTab(0, this)" style="padding: 16px 24px; background:none; border:none; cursor:pointer; font-weight:700; font-size:18px; color:var(--text-primary); border-bottom: 2px solid var(--accent); white-space:nowrap;">التفاصيل</button>
                <button class="tab-btn" id="tab-reviews-btn" onclick="switchProductTab(1, this)" style="padding: 16px 24px; background:none; border:none; cursor:pointer; font-weight:700; font-size:18px; color:var(--text-muted); border-bottom: 2px solid transparent; white-space:nowrap;">التقييمات (<span class="en-text">${approvedReviews.length}</span>)</button>
                <button class="tab-btn" onclick="switchProductTab(2, this)" style="padding: 16px 24px; background:none; border:none; cursor:pointer; font-weight:700; font-size:18px; color:var(--text-muted); border-bottom: 2px solid transparent; white-space:nowrap;">منتجات مشابهة</button>
            </div>
            
            <div class="tab-content default-active" id="tab-details" style="display:block; animation: fadeIn 0.3s;">
                <p style="font-size: 16px; line-height: 1.8; color:var(--text-secondary); margin-bottom: 32px;">
                    ${product.description_ar}
                </p>
                
                <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">المواصفات</h3>
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="display:flex; padding: 16px; background: var(--bg-card);">
                        <div style="width: 150px; font-weight: 700;">المقاس</div>
                        <div style="color:var(--text-secondary);"><span class="en-text">A4 (21×29.7</span> سم)</div>
                    </div>
                    <div style="display:flex; padding: 16px; background: var(--bg-elevated);">
                        <div style="width: 150px; font-weight: 700;">المادة</div>
                        <div style="color:var(--text-secondary);">ورق فاخر عالي الجودة</div>
                    </div>
                    <div style="display:flex; padding: 16px; background: var(--bg-card);">
                        <div style="width: 150px; font-weight: 700;">طريقة الطباعة</div>
                        <div style="color:var(--text-secondary);">طباعة رقمية عالية الجودة</div>
                    </div>
                    ${product.category !== 'poster' ? `
                    <div style="display:flex; padding: 16px; background: var(--bg-elevated);">
                        <div style="width: 150px; font-weight: 700;">عدد الأوراق</div>
                        <div style="color:var(--text-secondary);"><span class="en-text">100</span> ورقة</div>
                    </div>
                    <div style="display:flex; padding: 16px; background: var(--bg-card);">
                        <div style="width: 150px; font-weight: 700;">نوع التجليد</div>
                        <div style="color:var(--text-secondary);">سلك مزدوج</div>
                    </div>
                    <div style="display:flex; padding: 16px; background: var(--bg-elevated);">
                        <div style="width: 150px; font-weight: 700;">نوع الورق</div>
                        <div style="color:var(--text-secondary);">أبيض ناصع <span class="en-text">90</span> جرام</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="tab-content" id="tab-reviews" style="display:none; animation: fadeIn 0.3s;">
                ${renderReviewsTab(product, approvedReviews)}
            </div>
            
            <div class="tab-content" id="tab-related" style="display:none; animation: fadeIn 0.3s;">
                <div id="related-grid" class="grid-cols-4" style="display:flex; overflow-x:auto; scrollbar-width:none; gap:var(--space-6); padding-bottom: 20px;">
                    ${renderRelatedProducts(product.id, product.category, products)}
                </div>
            </div>
        </div>
    `;

    root.innerHTML = html;
    
    if(window.lucide) {
        lucide.createIcons({root: root});
    }

    // Expose functions globally for the page
    let qty = 1;
    window.updatePageQty = (change, max) => {
        if(max === 0) return;
        qty += change;
        if(qty < 1) qty = 1;
        if(qty > max) qty = max;
        document.getElementById('pageQty').innerText = qty;
    };
    
    window.addPageToCart = (id) => {
        const prod = products.find(p => p.id === id);
        if(!prod) return;
        addToCart({
            id: prod.id,
            name_ar: prod.name_ar,
            price: prod.price,
            quantity: qty
        });
        const btn = document.getElementById('addPageBtn');
        const oldText = btn.innerText;
        btn.innerText = '✓ تمت الإضافة';
        setTimeout(() => btn.innerText = oldText, 2000);
    };

    window.openPageWhatsApp = (name, price) => {
        const msg = `مرحباً، أنا مهتم بـ ${name}\nالسعر: ${price} جنيه\nهل المنتج متوفر؟`;
        window.open(getWhatsAppURL(msg), '_blank');
    };

    window.shareWhatsApp = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name_ar,
                text: `شوف المنتج ده من Heru: ${product.name_ar}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank');
        }
    };

    window.copyProductLink = () => {
        navigator.clipboard.writeText(window.location.href);
        showToast('تم نسخ الرابط ✓', 'info');
    };

    window.openLightbox = (color) => {
        document.getElementById('lightbox-content').style.background = color;
        document.getElementById('lightbox-content').innerText = product.name_ar;
        document.getElementById('lightbox-content').style.display = 'flex';
        document.getElementById('lightbox-content').style.alignItems = 'center';
        document.getElementById('lightbox-content').style.justifyContent = 'center';
        document.getElementById('lightbox-content').style.color = 'white';
        document.getElementById('lightbox-content').style.fontSize = '48px';
        document.getElementById('lightbox-content').style.fontWeight = '900';
        document.getElementById('lightbox-content').style.borderRadius = '16px';
        openModal('lightboxModal');
    };

    window.switchProductTab = (idx, btn) => {
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.style.color = 'var(--text-muted)';
            b.style.borderBottomColor = 'transparent';
        });
        btn.style.color = 'var(--text-primary)';
        btn.style.borderBottomColor = 'var(--accent)';
        
        document.getElementById('tab-details').style.display = 'none';
        document.getElementById('tab-reviews').style.display = 'none';
        document.getElementById('tab-related').style.display = 'none';
        
        if(idx === 0) document.getElementById('tab-details').style.display = 'block';
        if(idx === 1) document.getElementById('tab-reviews').style.display = 'block';
        if(idx === 2) document.getElementById('tab-related').style.display = 'block';
    };

    window.submitReviewForm = (e) => {
        e.preventDefault();
        const ratingEle = document.querySelector('input[name="rating"]:checked');
        const rating = parseInt(ratingEle ? ratingEle.value : '5');
        const name = document.getElementById('reviewName').value;
        const comment = document.getElementById('reviewComment').value;
        
        addReview(product.id, {name, rating, comment});
        localStorage.setItem(`heru_reviewed_${product.id}`, 'true');
        
        document.getElementById('review-form-area').innerHTML = `
            <div style="padding: 24px; background: var(--bg-card); border-radius: 12px; text-align: center; border: 1px dashed #22c55e;">
                <p style="color: #22c55e; font-size: 18px; font-weight:700;">شكراً! تقييمك هيظهر بعد المراجعة 🎉</p>
            </div>
        `;
    };
    
    window.updateCharCount = (val) => {
        document.getElementById('charCount').innerText = `${val.length} / 500`;
    };
};

const renderReviewsTab = (product, reviews) => {
    let barsHtml = '';
    const total = reviews.length;
    for(let i=5; i>=1; i--) {
        const count = reviews.filter(r => r.rating === i).length;
        const pct = total > 0 ? (count / total) * 100 : 0;
        barsHtml += `
            <div style="display:flex; align-items:center; gap:8px;">
                <span style="min-width: 30px;" class="en-text">${i}★</span>
                <div style="flex:1; height:8px; background:var(--bg-elevated); border-radius:4px; overflow:hidden;">
                    <div style="height:100%; width:${pct}%; background:var(--accent);"></div>
                </div>
                <span style="min-width: 40px; text-align:left;" class="en-text">${pct.toFixed(0)}%</span>
            </div>
        `;
    }

    let revListHtml = reviews.slice(0, 5).map(r => `
        <div style="padding: 24px 0; border-bottom: 1px solid var(--border-color);">
            <div style="display:flex; align-items:center; gap: 16px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-elevated); color: var(--accent); display:flex; align-items:center; justify-content:center; font-size: 20px; font-weight: 700;">
                    ${r.reviewer_name.charAt(0)}
                </div>
                <div>
                    <div style="font-weight: 700;">${r.reviewer_name}</div>
                    <div style="color:var(--warning); display:flex;">
                        ${Array(5).fill(0).map((_, i) => `<i data-lucide="star" style="fill:currentColor; width:14px;height:14px; opacity: ${i < r.rating ? 1 : 0.3}"></i>`).join('')}
                    </div>
                </div>
                <div style="margin-right: auto; color: var(--text-muted); font-size: 12px;" class="en-text">
                    ${new Date(r.created_at).toLocaleDateString()}
                </div>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.6;">${r.comment}</p>
        </div>
    `).join('');

    if(reviews.length === 0) {
        revListHtml = `<p style="text-align:center; padding: 48px 0; color:var(--text-muted);">كن أول من يقيّم هذا المنتج</p>`;
    }

    const hasReviewed = localStorage.getItem(`heru_reviewed_${product.id}`) === 'true';

    let formHtml = '';
    if(hasReviewed) {
        formHtml = `
            <div style="padding: 24px; background: var(--bg-card); border-radius: 12px; text-align: center; border: 1px dashed #22c55e;">
                <p style="color: #22c55e; font-size: 18px; font-weight:700;">شكراً! تقييمك هيظهر بعد المراجعة 🎉</p>
            </div>
        `;
    } else {
        formHtml = `
            <div style="padding: 24px; background: var(--bg-card); border-radius: 12px;" id="review-form-area">
                <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">أضف تقييمك</h3>
                <form onsubmit="submitReviewForm(event)">
                    <div style="margin-bottom: 16px;">
                        <div style="display:flex; flex-direction:row-reverse; justify-content:flex-end; gap:8px;" class="star-rating">
                            <input type="radio" id="star5" name="rating" value="5" />
                            <label for="star5" title="5 stars">★</label>
                            <input type="radio" id="star4" name="rating" value="4" />
                            <label for="star4" title="4 stars">★</label>
                            <input type="radio" id="star3" name="rating" value="3" />
                            <label for="star3" title="3 stars">★</label>
                            <input type="radio" id="star2" name="rating" value="2" />
                            <label for="star2" title="2 stars">★</label>
                            <input type="radio" id="star1" name="rating" value="1" />
                            <label for="star1" title="1 star">★</label>
                        </div>
                    </div>
                    <style>
                    .star-rating {
                        direction: ltr; /* keep left to right so stars render left to right */
                    }
                    .star-rating input { display:none; }
                    .star-rating label { color: var(--bg-elevated); font-size: 32px; cursor: pointer; }
                    .star-rating input:checked ~ label,
                    .star-rating label:hover,
                    .star-rating label:hover ~ label { color: var(--warning); }
                    </style>
                    <div style="margin-bottom: 16px;">
                        <input type="text" id="reviewName" class="input-field" placeholder="الاسم" required>
                    </div>
                    <div style="margin-bottom: 16px; position:relative;">
                        <textarea id="reviewComment" class="input-field" placeholder="شاركنا رأيك في المنتج..." style="min-height: 120px; resize:vertical; font-family:inherit; width: 100%; background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;" minlength="20" maxlength="500" required oninput="updateCharCount(this.value)"></textarea>
                        <div id="charCount" class="en-text" style="position:absolute; bottom:12px; left:12px; color:var(--text-muted); font-size:12px;">0 / 500</div>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">إرسال التقييم</button>
                </form>
            </div>
        \`;
    }

    return \`
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px;">
            <div>
                <div style="display:flex; align-items:center; gap: 24px; margin-bottom: 32px;">
                    <div style="font-size: 64px; font-weight: 700; color: var(--accent); line-height: 1;" class="en-text">\${product.rating.toFixed(1)}</div>
                    <div>
                        <div style="color:var(--warning); display:flex; margin-bottom: 8px;">
                            <i data-lucide="star" style="fill:currentColor; width:20px;height:20px;"></i>
                            <i data-lucide="star" style="fill:currentColor; width:20px;height:20px;"></i>
                            <i data-lucide="star" style="fill:currentColor; width:20px;height:20px;"></i>
                            <i data-lucide="star" style="fill:currentColor; width:20px;height:20px;"></i>
                            <i data-lucide="star" style="fill:currentColor; width:20px;height:20px; opacity:0.4"></i>
                        </div>
                        <div style="color:var(--text-muted);">بناءً على <span class="en-text">\${approvedReviews.length}</span> تقييم</div>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px; margin-bottom: 48px;">
                    \${barsHtml}
                </div>
                \${formHtml}
            </div>
            
            <div>
                \${revListHtml}
                \${reviews.length > 5 ? \`<button class="btn btn-ghost" style="width:100%; margin-top:24px;">اعرض المزيد</button>\` : ''}
            </div>
        </div>
    \`;
};

const renderRelatedProducts = (currentId, category, allProducts) => {
    const related = allProducts.filter(p => p.category === category && p.id !== currentId).slice(0, 4);
    
    return related.map(p => {
        let imgColor = 'var(--bg-elevated)';
        imgColor = window.getCategoryColor(p.category);

        const pStr = JSON.stringify({id: p.id, name_ar: p.name_ar, price: p.price, category: p.category}).replace(/"/g, '&quot;');

        return `
            <div class="product-card" style="min-width: 250px;">
                <input type="checkbox" class="compare-checkbox" value="${p.id}" onchange="if(typeof bindCompareCheckHome === 'function') bindCompareCheckHome(event, '${p.id}')">
                ${p.is_featured ? '<div class="featured-badge">مميز ✦</div>' : ''}
                <a href="/product?id=${p.id}" style="text-decoration:none; color:inherit; display:flex; flex-direction:column; flex:1;">
                    <div class="product-img-wrapper" style="background: ${imgColor};">
                        <div class="product-img"></div>
                    </div>
                    <div class="product-info">
                        <div style="display:flex;"><span class="badge-category" style="${window.getCategoryBadgeStyle(p.category)}">${getCategoryNameAr(p.category)}</span></div>
                        <div class="product-name">${p.name_ar}</div>
                        <div class="product-rating">
                            <i data-lucide="star" style="width:14px;height:14px;fill:currentColor;"></i> 
                            <span class="en-text">${p.rating.toFixed(1)} (${p.reviews})</span>
                        </div>
                        <div class="product-price-row">
                            <span class="product-price en-text">${p.price} EGP</span>
                        </div>
                    </div>
                </a>
                <button class="add-to-cart-bar" onclick="addToCart('${pStr}')">أضف للسلة</button>
            </div>
        `;
    }).join('');
};

// CART PAGE LOGIC
const initCartPage = () => {
    const root = document.getElementById('cart-root');
    if(!root) return;

    window.cartState = getCart();
    if(!window.cartState.promo) window.cartState.promo = null;

    let recentlyRemoved = null;
    let recentlyRemovedTimeout = null;

    const render = () => {
        if(window.cartState.items.length === 0) {
            root.innerHTML = `
            <div class="cart-empty-state page-enter">
                <i data-lucide="shopping-cart" class="cart-empty-icon"></i>
                <h1 class="cart-empty-title">سلتك فارغة</h1>
                <p class="cart-empty-desc">أضف منتجاتك المفضلة وارجع هنا</p>
                <a href="/shop" class="btn btn-primary" style="display:inline-block">تصفح المتجر</a>
            </div>`;
            if(window.lucide) lucide.createIcons({root});
            return;
        }

        let subtotal = 0;
        let itemsHtml = window.cartState.items.map((item, idx) => {
            const p = PRODUCTS.find(x => x.id === item.id);
            if(!p) return '';
            const lineTotal = p.price * item.quantity;
            subtotal += lineTotal;

            let bgColor = window.getCategoryColor(p.category);

            return `
            <div class="cart-item-row page-enter" style="animation-delay: ${idx * 0.05}s">
                <div class="cart-item-img" style="background: ${bgColor}">
                    <div style="width:100%;height:100%;background:${bgColor.replace('to top','to bottom')}"></div>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${p.name_ar} <span class="badge-category" style="display:inline-block; margin-inline-start:var(--space-2); ${window.getCategoryBadgeStyle(p.category)}">${getCategoryNameAr(p.category)}</span></div>
                    <div style="font-size:var(--text-sm); color:var(--text-secondary); margin-block-end:var(--space-2)"><span class="en-text">${p.price}</span> جنيه</div>
                    
                    <div class="quantity-control" style="width: 120px; height: 36px;">
                        <button class="qty-btn" style="width: 36px;" onclick="cartUpdateQty('${p.id}', -1)">&minus;</button>
                        <div class="qty-val" style="width: 48px; border-inline: 1px solid var(--border); display:flex; align-items:center; justify-content:center;"><span class="en-text">${item.quantity}</span></div>
                        <button class="qty-btn" style="width: 36px;" onclick="cartUpdateQty('${p.id}', 1)">&plus;</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-item-remove" onclick="cartRemoveItem('${p.id}')"><i data-lucide="x" style="width:18px;height:18px"></i></button>
                    <div style="font-weight:700; font-family:'Space Grotesk'"><span class="en-text">${lineTotal}</span> EGP</div>
                </div>
            </div>`;
        }).join('');

        let discount = 0;
        let promoMsg = '';
        if(window.cartState.promo) {
            const codeObj = PROMO_CODES.find(c => c.code === window.cartState.promo && c.active);
            if(codeObj) {
                if(subtotal >= codeObj.min_order) {
                    discount = codeObj.type === 'percentage' ? (subtotal * codeObj.value / 100) : codeObj.value;
                    promoMsg = `<div class="promo-msg promo-success">✓ تم تطبيق كود ${codeObj.code} <button class="promo-remove" onclick="removePromo()">إزالة الكود &times;</button></div>`;
                } else {
                    promoMsg = `<div class="promo-msg promo-warning">يشتغل عند طلب أكثر من <span class="en-text">${codeObj.min_order}</span> جنيه</div>`;
                    discount = 0;
                }
            } else {
                promoMsg = `<div class="promo-msg promo-error">الكود غير صحيح أو منتهي الصلاحية</div>`;
                discount = 0;
            }
        }

        const total = subtotal - discount;

        root.innerHTML = `
        <h1 style="font-size:var(--text-2xl); margin-block-end:var(--space-6)">منتجات في سلتك (<span class="en-text">${window.cartState.items.length}</span>)</h1>
        <div class="cart-layout">
            <div class="cart-items-col">
                ${itemsHtml}
                <a href="/shop" class="btn btn-ghost" style="margin-block-start:var(--space-4)">متابعة التسوق ←</a>
            </div>
            
            <div class="cart-summary-col">
                <div class="summary-line">
                    <span>إجمالي المنتجات:</span>
                    <span class="en-text" style="font-weight:700">${subtotal} EGP</span>
                </div>
                <div class="summary-line">
                    <span>الشحن:</span>
                    <span style="color:var(--success); font-weight:700">مجاني 🎉</span>
                </div>
                
                ${discount > 0 ? `
                <div class="summary-line" style="color:var(--success)">
                    <span>الخصم:</span>
                    <span class="en-text" style="font-weight:700">-${discount} EGP</span>
                </div>` : ''}
                
                <div style="margin-block:var(--space-6)">
                    <div class="promo-row">
                        <input type="text" id="promo-input" class="form-input promo-input" placeholder="كود الخصم" value="${window.cartState.promo || ''}" onkeyup="this.value = this.value.toUpperCase()">
                        <button class="btn btn-secondary" onclick="applyPromo()">تطبيق</button>
                    </div>
                    ${promoMsg}
                </div>
                
                <div class="divider"></div>
                
                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-block-end:var(--space-2)">
                    <span style="font-size:var(--text-lg); font-weight:700">الإجمالي:</span>
                    <div style="text-align:left">
                        <div class="summary-total"><span class="en-text">${total}</span> <span style="font-size:18px; font-family:'Cairo'">EGP</span></div>
                        <div style="font-size:var(--text-xs); color:var(--text-muted)">شامل الشحن المجاني</div>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="mobile-fixed-bottom" style="display:flex; flex-direction:column; gap:var(--space-4); margin-block-start:var(--space-4)">
                    <a href="/checkout" class="btn btn-primary" style="width:100%; height:56px; font-weight:700; font-size:18px">إتمام الطلب ←</a>
                </div>

                <div class="clear-cart-link" onclick="openModal('clearCartModal')">مسح السلة</div>
            </div>
        </div>
        `;
        if(window.lucide) lucide.createIcons({root});
    };

    window.cartUpdateQty = (id, change) => {
        const item = window.cartState.items.find(i => i.id === id);
        if(!item) return;
        const p = PRODUCTS.find(x => x.id === id);
        let newQ = item.quantity + change;
        if(newQ < 1) newQ = 1;
        if(newQ > p.stock) newQ = p.stock;
        item.quantity = newQ;
        saveSyncRender();
    };

    window.cartRemoveItem = (id) => {
        const idx = window.cartState.items.findIndex(i => i.id === id);
        if(idx > -1) {
            recentlyRemoved = { ...window.cartState.items[idx], idx };
            window.cartState.items.splice(idx, 1);
            saveSyncRender();
            
            clearTimeout(recentlyRemovedTimeout);
            showToast(`${recentlyRemoved.name_ar} اتشال <button onclick="undoRemove()" style="background:none; border:none; color:inherit; text-decoration:underline; cursor:pointer; font-weight:700; margin-inline-start:var(--space-2)">تراجع</button>`, 'info', 5000);
            recentlyRemovedTimeout = setTimeout(() => { recentlyRemoved = null; }, 5000);
        }
    };

    window.undoRemove = () => {
        if(recentlyRemoved) {
            window.cartState.items.splice(recentlyRemoved.idx, 0, recentlyRemoved);
            recentlyRemoved = null;
            saveSyncRender();
            showToast('تم إرجاع المنتج للسلة', 'success');
        }
    };

    window.applyPromo = () => {
        const val = document.getElementById('promo-input').value.trim().toUpperCase();
        window.cartState.promo = val;
        saveSyncRender();
    };

    window.removePromo = () => {
        window.cartState.promo = null;
        saveSyncRender();
    };

    const saveSyncRender = () => {
        saveCart(window.cartState);
        updateCartBadge();
        render();
    };

    window.executeClearCart = () => {
        clearCart();
        window.cartState = {items: [], promo: null};
        updateCartBadge();
        closeModal('clearCartModal');
        render();
        showToast('اتمسحت السلة', 'success');
    };

    window.checkoutWhatsapp = () => {
        if(window.cartState.items.length === 0) {
            showToast('سلتك فارغة! أضف منتجات الأول 😊', 'error');
            return;
        }

        let sessionClicks = parseInt(sessionStorage.getItem('heru_wa_clicks')) || 0;
        if(sessionClicks >= 10) {
            showToast('لقد وصلت للحد الأقصى للطلبات في هذه الجلسة', 'error');
            return;
        }
        sessionStorage.setItem('heru_wa_clicks', sessionClicks + 1);

        let subtotal = 0;
        let itemsText = window.cartState.items.map((item, idx) => {
            const p = PRODUCTS.find(x => x.id === item.id);
            const lineTotal = p.price * item.quantity;
            subtotal += lineTotal;
            return `${idx+1}. ${p.name_ar}\n   الكمية: ${item.quantity}\n   السعر: ${lineTotal} جنيه`;
        }).join('\n\n');

        let discount = 0;
        let promoLine = '';
        if(window.cartState.promo) {
            const codeObj = PROMO_CODES.find(c => c.code === window.cartState.promo && c.active);
            if(codeObj && subtotal >= codeObj.min_order) {
                discount = codeObj.type === 'percentage' ? (subtotal * codeObj.value / 100) : codeObj.value;
                promoLine = `\nالخصم: -${discount} جنيه\nكود الخصم: ${codeObj.code}`;
            }
        }
        const total = subtotal - discount;

        const message = `🛍️ طلب جديد من متجر Heru

━━━━━━━━━━━━━━━━━━━━
📦 المنتجات:

${itemsText}

━━━━━━━━━━━━━━━━━━━━
🧾 ملخص الطلب:
المجموع: ${subtotal} جنيه${promoLine}
✅ الإجمالي: ${total} جنيه
🚚 الشحن: مجاني لكل مصر

━━━━━━━━━━━━━━━━━━━━
⬇️ بس محتاج منك:
- اسمك الكريم
- رقم تليفونك
- عنوان التوصيل
  (المحافظة + المدينة + الشارع)
- طريقة الدفع:
  كاش عند الاستلام 💵
  أو انستاباي 📱`;

        const encoded = encodeURIComponent(message);
        const storeNum = window.STORE_WHATSAPP || "201124519232";
        const url = `https://wa.me/${storeNum}?text=${encoded}`;
        window.open(url, '_blank');

        setTimeout(() => {
            showToast('رسالة طلبك جاهزة في واتساب ✓<br>سلتك لسه موجودة لو عايز تعدل', 'success', 5000);
        }, 500);
    };

    render();
};

// TRACK ORDER PAGE LOGIC
const initTrackOrderPage = () => {
    const trackRoot = document.getElementById('track-root');
    if(!trackRoot) return; 

    // MOCK ORDERS
    const MOCK_ORDERS = [
      {
        id: "ORD-2025-0001", phone: "01012345678",
        customer_name: "أحمد محمد", status: "delivered",
        items: [{name_ar:"لوحة - صوت المدينة", qty:1, price:85}],
        total: 85, governorate: "القاهرة", payment: "كاش عند الاستلام",
        timeline: [
          {status:"received",   time:"الإثنين ١٠ نوف، ٣:٢٠ م"},
          {status:"processing", time:"الثلاثاء ١١ نوف، ١٠:٠٠ ص"},
          {status:"shipped",    time:"الأربعاء ١٢ نوف، ٢:٠٠ م"},
          {status:"delivered",  time:"الخميس ١٣ نوف، ٤:٣٠ م"}
        ]
      },
      {
        id: "ORD-2025-0002", phone: "01098765432",
        customer_name: "سارة علي", status: "shipped",
        items: [
          {name_ar:"نوت بوك - ويكيند ووريور", qty:1, price:75},
          {name_ar:"كشكول - أسود بلا عنوان", qty:1, price:90}
        ],
        total: 165, governorate: "الإسكندرية", payment: "انستاباي",
        timeline: [
          {status:"received",   time:"الأحد ٩ نوف، ٦:٠٠ م"},
          {status:"processing", time:"الإثنين ١٠ نوف، ٩:٠٠ ص"},
          {status:"shipped",    time:"الثلاثاء ١١ نوف، ١:٠٠ م"},
          {status:"delivered",  time:null}
        ]
      },
      {
        id: "ORD-2025-0003", phone: "01155544433",
        customer_name: "خالد إبراهيم", status: "processing",
        items: [{name_ar:"لوحة - ليل القاهرة", qty:2, price:140}],
        total: 140, governorate: "الجيزة", payment: "كاش عند الاستلام",
        timeline: [
          {status:"received",   time:"الثلاثاء ١١ نوف، ١١:٣٠ ص"},
          {status:"processing", time:"الثلاثاء ١١ نوف، ٢:٠0 م"},
          {status:"shipped",    time:null},
          {status:"delivered",  time:null}
        ]
      }
    ];

    const params = new URLSearchParams(window.location.search);
    const urlOrder = params.get('order');
    if(urlOrder) {
        const orderInput = document.getElementById('track-order-id');
        if(orderInput) orderInput.value = urlOrder;
    }

    window.submitTracking = () => {
        const oIdObj = document.getElementById('track-order-id');
        const phoneObj = document.getElementById('track-phone');
        if(!oIdObj || !phoneObj) return;

        const oId = oIdObj.value.trim();
        const phone = phoneObj.value.trim();

        const order = MOCK_ORDERS.find(o => o.id === oId && o.phone === phone);
        
        const formView = document.getElementById('track-form-view');
        const resView = document.getElementById('track-result-view');
        formView.style.display = 'none';
        resView.style.display = 'block';

        if(!order) {
            resView.innerHTML = `
            <div class="track-error-state page-enter">
                <i data-lucide="search-x" style="width:64px;height:64px;color:var(--text-muted);margin-block-end:var(--space-4)"></i>
                <h2 style="margin-block-end:var(--space-2)">لم نجد طلب بهذه البيانات</h2>
                <p style="color:var(--text-secondary);margin-block-end:var(--space-6)">تأكد من رقم الطلب ورقم التليفون واعد المحاولة</p>
                <div style="display:flex;gap:var(--space-4);justify-content:center">
                    <button class="btn btn-ghost" onclick="resetTracking()">حاول مرة تانية</button>
                    <a href="https://wa.me/${window.STORE_WHATSAPP || '201124519232'}?text=${encodeURIComponent('عندي مشكلة في تتبع الطلب ومحتاج مساعدة')}" target="_blank" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:var(--space-2)">تواصل معنا <i data-lucide="message-circle" style="width:16px;height:16px"></i></a>
                </div>
            </div>`;
            if(window.lucide) lucide.createIcons({root: resView});
            return;
        }

        const stepsDefs = [
            { id: 'received', title: 'تم الاستلام' },
            { id: 'processing', title: 'قيد التجهيز' },
            { id: 'shipped', title: 'في الشحن 🚚' },
            { id: 'delivered', title: 'تم التسليم 📦' }
        ];

        let currentStepIndex = 0;
        if(order.status === 'processing') currentStepIndex = 1;
        if(order.status === 'shipped') currentStepIndex = 2;
        if(order.status === 'delivered') currentStepIndex = 3;

        const timelineHtml = stepsDefs.map((st, i) => {
            let clz = '';
            if(i < currentStepIndex || (i === currentStepIndex && order.status === 'delivered')) {
                clz = 'complete';
            } else if (i === currentStepIndex) {
                clz = 'current';
            }
            
            const timeObj = order.timeline.find(x => x.status === st.id);
            const timeStr = timeObj && timeObj.time ? timeObj.time : '';
            const currBadge = (i === currentStepIndex && order.status !== 'delivered') ? `<div class="track-badge-current">الحالة الحالية</div>` : '';
            const iconHtml = clz === 'complete' ? '<i data-lucide="check" style="width:16px;height:16px"></i>' : '<span class="en-text">' + (i+1) + '</span>';

            return `
            <div class="track-step ${clz}">
                <div class="track-step-circle">${iconHtml}</div>
                <div class="track-step-content">
                    <div class="track-step-title">${st.title}</div>
                    ${timeStr ? `<div class="track-step-time">${timeStr}</div>` : ''}
                    ${currBadge}
                </div>
            </div>`;
        }).join('');

        let itemsHtml = order.items.map(it => `
            <div style="display:flex;justify-content:space-between;align-items:center;border-block-end:1px solid var(--border);padding-block:var(--space-2);font-size:var(--text-sm)">
                <div>${it.name_ar} <span class="en-text" style="color:var(--text-muted); margin-inline-start:var(--space-1)">×${it.qty}</span></div>
                <div class="en-text" style="font-weight:700">${it.price * it.qty} EGP</div>
            </div>
        `).join('');

        resView.innerHTML = `
        <div class="page-enter">
            <button class="btn btn-ghost" style="margin-block-end:var(--space-6)" onclick="resetTracking()">← تتبع طلب آخر</button>
            <h1 style="margin-block-end:var(--space-2); font-size:var(--text-2xl)">حالة الطلب</h1>
            <p style="color:var(--text-secondary); margin-block-end:var(--space-6)">
                <span class="order-id-copyable en-text" onclick="copyId('${order.id}')">${order.id} <i data-lucide="copy" style="width:14px;height:14px"></i></span>
            </p>

            <div class="track-timeline">
                ${timelineHtml}
            </div>

            <div class="order-summary-card">
                <div class="order-summary-grid">
                    <div class="order-detail-item">
                        <span class="order-detail-label">العميل</span>
                        <span class="order-detail-value">${order.customer_name}</span>
                    </div>
                    <div class="order-detail-item">
                        <span class="order-detail-label">المحافظة</span>
                        <span class="order-detail-value">${order.governorate}</span>
                    </div>
                    <div class="order-detail-item">
                        <span class="order-detail-label">طريقة الدفع</span>
                        <span class="order-detail-value">${order.payment}</span>
                    </div>
                    <div class="order-detail-item">
                        <span class="order-detail-label">الإجمالي</span>
                        <span class="order-detail-value en-text">${order.total} EGP</span>
                    </div>
                </div>

                <div style="margin-block-start:var(--space-6)">
                    <button style="background:none;border:none;width:100%;text-align:right;font-weight:700;cursor:pointer;color:var(--text-primary);display:flex;justify-content:space-between;align-items:center;padding:0" onclick="toggleItems(this)">
                        المنتجات المطلوبة (<span class="en-text">${order.items.length}</span>)
                        <i data-lucide="chevron-down" style="width:16px;height:16px;transition:transform 200ms ease"></i>
                    </button>
                    <div id="tracked-items-list" style="display:none; margin-block-start:var(--space-4)">
                        ${itemsHtml}
                    </div>
                </div>
            </div>

            <div style="text-align:center; margin-block-start:var(--space-8)">
                <p style="margin-block-end:var(--space-4); color:var(--text-secondary)">محتاج مساعدة في الطلب؟</p>
                <a href="https://wa.me/${window.STORE_WHATSAPP || '201124519232'}?text=${encodeURIComponent('عندي استفسار على الطلب ' + order.id)}" target="_blank" class="btn btn-secondary" style="display:inline-flex; width:100%; justify-content:center; align-items:center; gap:var(--space-2)">
                    <i data-lucide="message-circle" style="width:18px;height:18px"></i> تواصل معنا على واتساب
                </a>
            </div>
        </div>
        `;
        if(window.lucide) lucide.createIcons({root: resView});
    };

    window.resetTracking = () => {
        document.getElementById('track-form-view').style.display = 'block';
        document.getElementById('track-result-view').style.display = 'none';
    };

    window.copyId = (id) => {
        navigator.clipboard.writeText(id);
        showToast('تم نسخ رقم الطلب', 'success');
    };

    window.toggleItems = (btn) => {
        const list = document.getElementById('tracked-items-list');
        const icon = btn.querySelector('i');
        if(list.style.display === 'none') {
            list.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        } else {
            list.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        }
    };
};

window.submitReviewAction = (pid) => {
    const name = document.getElementById('review-name').value;
    const comment = document.getElementById('review-text').value;
    if(!name || !comment) { showToast('يرجى ملء جميع الحقول', 'error'); return; }
    addReview(pid, {name, rating: 5, comment});
    localStorage.setItem('heru_reviewed_' + pid, 'true');
    const form = document.getElementById('dynamic-review-form');
    if(form) form.innerHTML = `<div style="text-align:center; padding:var(--space-4); background:var(--bg-elevated); border-radius:var(--radius-md); border:1px solid var(--border)">تم إرسال التقييم ✓</div>`;
    showToast('شكراً لتقييمك! سيتم مراجعته قريباً.', 'success');
};

// CHECKOUT LOGIC
const initCheckoutPage = () => {
    const root = document.getElementById('checkout-root');
    if(!root) return;

    window.cartState = getCart();
    if(window.cartState.items.length === 0) {
        window.location.href = '/cart';
        return;
    }

    let subtotal = 0;
    const itemsHtml = window.cartState.items.map(item => {
        const p = PRODUCTS.find(x => x.id === item.id);
        if(!p) return '';
        const lineTotal = p.price * item.quantity;
        subtotal += lineTotal;
        return `
        <div class="summary-item">
            <div class="summary-item-name">${p.name_ar} <span class="en-text" style="color:var(--text-muted)">×${item.quantity}</span></div>
            <div class="summary-item-price en-text">${lineTotal} EGP</div>
        </div>`;
    }).join('');

    let discount = 0;
    if(window.cartState.promo) {
        const codeObj = PROMO_CODES.find(c => c.code === window.cartState.promo && c.active);
        if(codeObj && subtotal >= codeObj.min_order) {
            discount = codeObj.type === 'percentage' ? (subtotal * codeObj.value / 100) : codeObj.value;
        }
    }
    const total = subtotal - discount;

    const govs = ["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "القليوبية", "كفر الشيخ", "الغربية", "المنوفية", "البحيرة", "الإسماعيلية", "بور سعيد", "السويس", "شمال سيناء", "جنوب سيناء", "الفيوم", "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", "مطروح", "دمياط"];
    const govOpts = govs.map(g => `<option value="${g}">${g}</option>`).join('');

    root.innerHTML = `
        <h1 style="font-size:var(--text-2xl); margin-block-end:var(--space-6)">إتمام الطلب</h1>
        <div class="checkout-layout">
            <div class="checkout-form-col">
                <form id="checkout-form">
                    <h2 style="margin-block-end:var(--space-4)">بيانات التوصيل</h2>
                    
                    <div class="form-group">
                        <label class="form-label">الاسم الكريم*</label>
                        <input type="text" id="co-name" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">رقم الهاتف*</label>
                        <input type="tel" id="co-phone" class="form-input en-text" placeholder="01xxxxxxx" dir="ltr" style="text-align:right" required>
                        <div class="form-error-msg" id="phone-error">رقم الهاتف غير صحيح</div>
                    </div>

                    <div class="form-group" style="display:flex; gap:var(--space-4)">
                        <div style="flex:1">
                            <label class="form-label">المحافظة*</label>
                            <select id="co-gov" class="form-input" required style="appearance:auto">
                                <option value="" disabled selected>اختر المحافظة</option>
                                ${govOpts}
                            </select>
                        </div>
                        <div style="flex:1">
                            <label class="form-label">المدينة / المنطقة*</label>
                            <input type="text" id="co-city" class="form-input" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">العنوان بالتفصيل*</label>
                        <textarea id="co-address" class="form-input textarea-form" placeholder="رقم الشارع، اسم الشارع، أي تفاصيل للمندوب" required minlength="10"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">ملاحظات إضافية</label>
                        <textarea id="co-notes" class="form-input textarea-form" placeholder="أي ملاحظات أو طلبات لطلبك"></textarea>
                    </div>

                    <h2 style="margin-block:var(--space-6) var(--space-4)">طريقة الدفع</h2>
                    <div class="payment-box">
                        <div style="font-size:24px">💵</div>
                        <div>
                            <div>الدفع عند الاستلام فقط</div>
                            <div style="font-size:var(--text-sm); color:var(--text-secondary); font-weight:400">ادفع كاش لما يوصلك المنتج</div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width:100%; height:56px; font-weight:700; font-size:18px" id="checkout-submit-btn">تأكيد الطلب ✓</button>
                </form>
            </div>

            <div class="checkout-summary-col">
                <h3 style="margin-block-end:var(--space-4)">ملخص الطلب</h3>
                
                ${itemsHtml}
                
                <div class="summary-item" style="border:none">
                    <div class="summary-item-name" style="color:var(--text-secondary)">المجموع:</div>
                    <div class="summary-item-price en-text">${subtotal} EGP</div>
                </div>
                
                ${discount > 0 ? `
                <div class="summary-item" style="border:none; color:var(--success)">
                    <div class="summary-item-name">الخصم (${window.cartState.promo}):</div>
                    <div class="summary-item-price en-text">-${discount} EGP</div>
                </div>` : ''}
                
                <div class="summary-item" style="border-block-end:1px solid var(--border)">
                    <div class="summary-item-name" style="color:var(--text-secondary)">الشحن:</div>
                    <div class="summary-item-price" style="color:var(--success)">مجاني 🎉</div>
                </div>
                
                <div class="summary-item" style="border:none; margin-block-start:var(--space-4); margin-block-end:0">
                    <div class="summary-item-name" style="font-size:18px; font-weight:700">الإجمالي:</div>
                    <div class="summary-item-price en-text" style="font-size:24px; color:var(--accent)">${total} EGP</div>
                </div>
            </div>
        </div>
    `;

    if(window.lucide) lucide.createIcons({root});

    const form = document.getElementById('checkout-form');
    const phoneInput = document.getElementById('co-phone');
    const phoneError = document.getElementById('phone-error');
    const submitBtn = document.getElementById('checkout-submit-btn');

    phoneInput.addEventListener('input', () => {
        phoneInput.classList.remove('error');
        phoneError.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('co-name').value.trim();
        const phone = phoneInput.value.trim();
        const gov = document.getElementById('co-gov').value;
        const city = document.getElementById('co-city').value.trim();
        const address = document.getElementById('co-address').value.trim();
        const notes = document.getElementById('co-notes').value.trim();

        if(!validateEgyptianPhone(phone)) {
            phoneInput.classList.add('error');
            phoneError.style.display = 'block';
            phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري التأكيد...';

        // 1. Generate Order ID
        const orders = JSON.parse(localStorage.getItem('heru_orders') || '[]');
        const today = new Date();
        const year = today.getFullYear();
        let lastCounter = 0;
        
        const yearOrders = orders.filter(o => o.id && o.id.startsWith(`ORD-${year}-`));
        if (yearOrders.length > 0) {
            const lastId = yearOrders[yearOrders.length - 1].id;
            const match = lastId.match(/(\d+)$/);
            if(match) lastCounter = parseInt(match[1]);
        }
        
        const newIdCounter = (lastCounter + 1).toString().padStart(4, '0');
        const orderId = `ORD-${year}-${newIdCounter}`;

        // 2. Build items array and generate whatsapp message
        let wSubtotal = 0;
        const oItems = window.cartState.items.map((item, idx) => {
            const p = PRODUCTS.find(x => x.id === item.id);
            const lineTotal = p.price * item.quantity;
            wSubtotal += lineTotal;
            return {
                id: p.id,
                name_ar: p.name_ar,
                quantity: item.quantity,
                price: p.price,
                subtotal: lineTotal
            };
        });

        const nowIso = today.toISOString();
        const arDate = today.toLocaleString('ar-EG', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

        const newOrder = {
            id: orderId,
            customer_name: name,
            phone: phone,
            governorate: gov,
            city: city,
            address: address,
            notes: notes,
            items: oItems,
            subtotal: wSubtotal,
            discount: discount,
            promo_code: window.cartState.promo || null,
            total: total,
            payment_method: "cod",
            status: "received",
            payment_status: "pending",
            created_at: nowIso,
            timeline: [
                { status: "received", time: arDate },
                { status: "processing", time: null },
                { status: "shipped", time: null },
                { status: "delivered", time: null }
            ]
        };

        // 3. Update localStorage orders
        orders.push(newOrder);
        localStorage.setItem('heru_orders', JSON.stringify(orders));

        // 4. Generate & open WhatsApp message
        let itemsText = oItems.map((it, idx) => {
            return `${idx+1}. ${it.name_ar}\n   الكمية: ${it.quantity}\n   السعر: ${it.subtotal} جنيه`;
        }).join('\n\n');

        let notesLine = notes ? `\nملاحظات: ${notes}` : '';
        let discLine = discount > 0 ? `\nالخصم: -${discount} جنيه` : '';

        const waMessage = `🛍️ طلب جديد — متجر Heru

━━━━━━━━━━━━━━━━━━━━
🔖 رقم الطلب: ${orderId}

👤 بيانات العميل:
الاسم: ${name}
الهاتف: ${phone}
المحافظة: ${gov}
المدينة: ${city}
العنوان: ${address}${notesLine}

━━━━━━━━━━━━━━━━━━━━
📦 المنتجات:

${itemsText}

━━━━━━━━━━━━━━━━━━━━
🧾 الحساب:
المجموع: ${wSubtotal} جنيه${discLine}
✅ الإجمالي: ${total} جنيه
🚚 الشحن: مجاني

💳 الدفع: كاش عند الاستلام`;

        const waUrl = getWhatsAppURL(waMessage);
        
        // 5. Clear Cart
        clearCart();
        window.cartState = { items: [], promo: null };

        // 6. Launch WA and redirect
        window.open(waUrl, '_blank');
        
        setTimeout(() => {
            window.location.href = `/confirmation?order=${orderId}`;
        }, 800);
    });
};

// CONFIRMATION LOGIC
const initConfirmationPage = () => {
    const root = document.getElementById('confirmation-root');
    if(!root) return;

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order');

    if(!orderId) {
        window.location.href = '/';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('heru_orders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if(!order) {
        root.innerHTML = `<div class="conf-container"><h2>الطلب غير موجود</h2></div>`;
        return;
    }

    const waHelpMsg = `مرحباً، عندي سؤال على طلبي رقم ${order.id}`;
    const storeNum = window.STORE_WHATSAPP || "201124519232";
    const waHelpUrl = `https://wa.me/${storeNum}?text=${encodeURIComponent(waHelpMsg)}`;

    root.innerHTML = `
        <div class="conf-container page-enter">
            <div class="success-circle">
                <svg class="check-anim" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            
            <h1 style="font-size:32px; font-weight:700; margin-block-end:var(--space-2)">تم تأكيد طلبك! 🎉</h1>
            <p style="color:var(--text-secondary); font-size:18px; margin-block-end:var(--space-8)">
                شكراً ${order.customer_name}! طلبك وصلنا
            </p>

            <div class="conf-card">
                <div style="display:flex; justify-content:space-between; margin-block-end:12px; font-size:14px">
                    <span style="color:var(--text-secondary)">رقم الطلب:</span>
                    <span class="en-text" style="font-weight:700; color:var(--accent)">${order.id}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-block-end:12px; font-size:14px">
                    <span style="color:var(--text-secondary)">الإجمالي:</span>
                    <span class="en-text" style="font-weight:700">${order.total} EGP</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-block-end:12px; font-size:14px">
                    <span style="color:var(--text-secondary)">طريقة الدفع:</span>
                    <span style="font-weight:700">كاش عند الاستلام</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:14px">
                    <span style="color:var(--text-secondary)">العنوان:</span>
                    <span style="font-weight:700; text-align:left">${order.governorate} — ${order.city}</span>
                </div>
            </div>

            <div class="divider" style="margin-block:var(--space-6)"></div>

            <p style="font-size:14px; color:var(--text-muted); margin-block-end:var(--space-4)">
                عندك أي سؤال أو عايز تتابع طلبك؟
            </p>

            <a href="${waHelpUrl}" target="_blank" class="conf-btn-wa" style="margin-block-end:var(--space-4); text-decoration:none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.062 3.966L.01 15.939l4.166-1.073a7.878 7.878 0 0 0 3.818.981h.004c4.364 0 7.925-3.559 7.93-7.927a7.886 7.886 0 0 0-2.327-5.594zM7.994 14.516c-1.18 0-2.336-.318-3.344-.92l-.24-.142-2.486.64.654-2.427-.156-.248a6.52 6.52 0 0 1-1.002-3.483c.005-3.604 2.937-6.536 6.543-6.536 1.748.002 3.391.684 4.625 1.918a6.524 6.524 0 0 1 1.916 4.624c-.005 3.604-2.937 6.536-6.541 6.536z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M11.854 9.608c-.212-.106-1.25-.618-1.444-.689-.193-.07-.333-.106-.474.106-.14.212-.544.689-.667.83-.122.14-.245.16-.457.054-.212-.106-.893-.329-1.7-1.047-.625-.56-1.047-1.252-1.17-1.464-.122-.212-.013-.327.094-.433.095-.094.212-.248.318-.37.106-.123.14-.212.212-.354.072-.14.036-.264-.017-.37-.054-.106-.474-1.144-.65-1.567-.17-.41-.344-.354-.474-.36-.122-.006-.264-.006-.406-.006-.14 0-.37.053-.564.265-.194.212-.741.724-.741 1.766s.76 2.049.866 2.19c.106.14 1.493 2.278 3.616 3.194.506.21 .9.334 1.206.429.508.16 .97.137 1.334.083.414-.06 1.25-.51 1.426-1.002.176-.492.176-.913.122-1.002-.054-.089-.212-.14-.424-.247z"/></svg> 
                تواصل معنا على واتساب 💬
            </a>
            <a href="/shop" class="btn btn-ghost" style="width:100%; height:52px">العودة للمتجر</a>
        </div>
    `;

    if(window.lucide) lucide.createIcons({root});
};

const initHeroSlideshow = () => {
    const root = document.getElementById('hero-slideshow-root');
    if (!root) return;
    
    let products = [];
    try {
        products = JSON.parse(localStorage.getItem('heru_products'));
    } catch(e) {}
    if (!products || !products.length) products = window.PRODUCTS || [];
    
    let featured = products.filter(p => p.is_featured);
    if (!featured.length) featured = products.slice(0, 4);
    else featured = featured.slice(0, 4);
    
    if (!featured.length) return;
    
    root.innerHTML = '';
    root.style.position = 'relative';
    root.style.overflow = 'hidden';
    
    const slidesContainer = document.createElement('div');
    slidesContainer.style.width = '100%';
    slidesContainer.style.height = '100%';
    slidesContainer.style.position = 'absolute';
    slidesContainer.style.top = '0';
    slidesContainer.style.left = '0';
    
    const slides = [];
    featured.forEach((p, index) => {
        const slide = document.createElement('div');
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.style.transition = 'opacity 600ms ease-in-out';
        slide.style.borderRadius = 'inherit';
        slide.style.overflow = 'hidden';
        
        if (p.img) {
            slide.innerHTML = `<img src="${p.img}" alt="${p.name_ar}" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            slide.style.background = 'var(--bg-elevated)';
            slide.style.display = 'flex';
            slide.style.alignItems = 'center';
            slide.style.justifyContent = 'center';
            slide.innerHTML = `<div style="color:var(--accent); font-weight:bold; padding:20px; text-align:center">${p.name_ar}</div>`;
        }
        
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.bottom = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '40%';
        overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'flex-end';
        overlay.style.paddingBottom = '16px'; 
        
        const title = document.createElement('div');
        title.style.color = 'white';
        title.style.fontWeight = 'bold';
        title.style.fontSize = '16px';
        title.style.padding = '0 16px';
        title.textContent = p.name_ar;
        
        const priceBadge = document.createElement('div');
        priceBadge.style.background = 'var(--accent)';
        priceBadge.style.color = 'black';
        priceBadge.style.fontWeight = 'bold';
        priceBadge.style.padding = '8px 12px';
        priceBadge.style.borderRadius = 'var(--radius-sm)';
        priceBadge.style.position = 'absolute';
        priceBadge.style.bottom = '16px';
        priceBadge.style.insetInlineEnd = '16px';
        priceBadge.textContent = p.price + ' EGP';
        
        overlay.appendChild(title);
        overlay.appendChild(priceBadge);
        slide.appendChild(overlay);
        
        slidesContainer.appendChild(slide);
        slides.push(slide);
    });
    root.appendChild(slidesContainer);
    
    const dotsContainer = document.createElement('div');
    dotsContainer.style.position = 'absolute';
    dotsContainer.style.bottom = '12px';
    dotsContainer.style.left = '0';
    dotsContainer.style.width = '100%';
    dotsContainer.style.display = 'flex';
    dotsContainer.style.justifyContent = 'center';
    dotsContainer.style.gap = '6px';
    dotsContainer.style.zIndex = '5';
    
    const dots = [];
    featured.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.style.height = '4px';
        dot.style.width = index === 0 ? '16px' : '4px';
        dot.style.borderRadius = '2px';
        dot.style.background = index === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.5)';
        dot.style.transition = 'all 300ms';
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
    root.appendChild(dotsContainer);
    
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].style.opacity = '0';
        dots[currentSlide].style.width = '4px';
        dots[currentSlide].style.background = 'rgba(255,255,255,0.5)';
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].style.opacity = '1';
        dots[currentSlide].style.width = '16px';
        dots[currentSlide].style.background = 'var(--accent)';
    }, 3000);
};

const renderStoreReviewsCarousel = () => {
    const root = document.getElementById('testimonials-root');
    const container = document.getElementById('store-reviews-container');
    if (!root || !container) return;
    
    let reviews = [];
    try {
        reviews = JSON.parse(localStorage.getItem('heru_store_reviews') || '[]');
    } catch(e) {}
    
    const approved = reviews.filter(r => r.is_approved);
    
    if (approved.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    root.innerHTML = \`
        <div class="carousel-wrapper" id="reviews-carousel-scroll">
            <div class="carousel">
                \${approved.map(r => \`
                    <div class="testimonial-card">
                        <div style="color:var(--warning); margin-block-end: var(--space-4);">
                            \${Array(5).fill('').map((_, i) => \`<i data-lucide="star" style="fill:\${i < r.rating ? 'currentColor' : 'none'}; width:16px; height:16px;"></i>\`).join('')}
                        </div>
                        <p class="testimonial-quote">"\${r.comment}"</p>
                        <div class="testimonial-author">— \${r.reviewer_name} | \${r.reviewer_city}</div>
                    </div>
                \`).join('')}
            </div>
        </div>
    \`;
    
    if(window.lucide) lucide.createIcons({root});
    
    const scrollEl = document.getElementById('reviews-carousel-scroll');
    if (!scrollEl) return;
    
    const dotsWrapper = document.createElement('div');
    dotsWrapper.style.display = 'flex';
    dotsWrapper.style.justifyContent = 'center';
    dotsWrapper.style.gap = '8px';
    dotsWrapper.style.marginTop = '24px';
    
    const cards = scrollEl.querySelectorAll('.testimonial-card');
    const dots = [];
    
    const ob = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const idx = Array.from(cards).indexOf(entry.target);
                if(idx >= 0 && dots[idx]) {
                    dots.forEach(d => { d.style.background = 'var(--border)'; d.style.width = '8px'; });
                    dots[idx].style.background = 'var(--accent)';
                    dots[idx].style.width = '24px';
                }
            }
        });
    }, { root: scrollEl, threshold: 0.5 });
    
    cards.forEach((card, i) => {
        const d = document.createElement('div');
        d.style.height = '8px';
        d.style.width = '8px';
        d.style.borderRadius = '4px';
        d.style.background = 'var(--border)';
        d.style.transition = 'all 0.3s';
        d.style.cursor = 'pointer';
        d.onclick = () => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        };
        dotsWrapper.appendChild(d);
        dots.push(d);
        ob.observe(card);
    });
    
    root.appendChild(dotsWrapper);
    
    let scrollInt;
    const startScroll = () => {
        scrollInt = setInterval(() => {
            let maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
            // Native RTL scroll approaches negative bounds or positive depending on browser. Use reliable method:
            const cardWidth = cards[0].offsetWidth + 16;
            let currentScroll = Math.abs(scrollEl.scrollLeft);
            
            if (currentScroll >= maxScroll - 10) {
                // reset to start
                scrollEl.scrollTo({left: 0, behavior: 'smooth'});
            } else {
                scrollEl.scrollBy({ left: -cardWidth, behavior: 'smooth' }); // standard RTL is negative scroll
            }
        }, 4000);
    };
    
    startScroll();
    scrollEl.addEventListener('mouseenter', () => clearInterval(scrollInt));
    scrollEl.addEventListener('mouseleave', startScroll);
    scrollEl.addEventListener('touchstart', () => clearInterval(scrollInt));
};

initHeroSlideshow();
renderStoreReviewsCarousel();

