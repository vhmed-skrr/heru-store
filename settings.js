// Load settings from localStorage
function loadSettings() {
  const defaults = {
    store_name: "Heru",
    store_name_ar: "هيرو",
    whatsapp: "201124519232",
    instagram: "",
    tiktok: "",
    facebook: "",
    tagline_ar: "اتعبر عن نفسك بأسلوبك",
    free_shipping_text: "شحن مجاني لكل مصر 🇪🇬"
  }
  const saved = localStorage.getItem("heru_settings")
  return saved ? {...defaults, ...JSON.parse(saved)} : defaults
}

// Apply settings to current page
function applySettings() {
  const s = loadSettings()
  
  // Update store name wherever it appears
  document.querySelectorAll('[data-store-name]')
    .forEach(el => el.textContent = s.store_name)
  
  document.querySelectorAll('[data-store-name-ar]')
    .forEach(el => el.textContent = s.store_name_ar)
  
  // Update all WhatsApp links
  document.querySelectorAll('[data-whatsapp]')
    .forEach(el => {
      const msg = el.getAttribute('data-whatsapp-msg') || ''
      el.href = `https://wa.me/${s.whatsapp}` + 
                (msg ? `?text=${encodeURIComponent(msg)}` : '')
    })
  
  // Update social links in footer
  const ig = document.querySelector('[data-social-instagram]')
  if(ig) ig.href = s.instagram || '#'
  
  const tt = document.querySelector('[data-social-tiktok]')
  if(tt) tt.href = s.tiktok || '#'
  
  const fb = document.querySelector('[data-social-facebook]')
  if(fb) fb.href = s.facebook || '#'
  
  // Update tagline
  document.querySelectorAll('[data-tagline]')
    .forEach(el => el.textContent = s.tagline_ar)
  
  // Update shipping text
  document.querySelectorAll('[data-shipping-text]')
    .forEach(el => el.textContent = s.free_shipping_text)
  
  // Update WhatsApp number in order functions
  window.STORE_WHATSAPP = s.whatsapp
}

// Run on every page load
document.addEventListener('DOMContentLoaded', applySettings)
