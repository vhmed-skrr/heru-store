// admin.js
const verifyAdminAuth = () => {
    // Exclude /admin/index.html (or /admin/ or /admin)
    const isLoginPage = window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/') || window.location.pathname.endsWith('/admin/index.html');
    const isAuthed = sessionStorage.getItem('heru_admin_auth') === 'true';

    if (!isAuthed && !isLoginPage) {
        window.location.replace('/admin/index.html');
    }
    if (isAuthed && isLoginPage) {
        window.location.replace('/admin/dashboard.html');
    }
};
verifyAdminAuth();

window.loginAdmin = () => {
    const pass = document.getElementById('admin-pass').value;
    const err = document.getElementById('login-error');
    const card = document.getElementById('loginCard');
    
    // Fallback if config is missing (safety)
    const truePass = (window.STORE_CONFIG && window.STORE_CONFIG.adminPassword) ? window.STORE_CONFIG.adminPassword : "admin123";
    
    if (pass === truePass) {
        sessionStorage.setItem('heru_admin_auth', 'true');
        window.location.href = '/admin/dashboard.html';
    } else {
        err.style.display = 'block';
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        setTimeout(() => err.style.display = 'none', 3000);
    }
};

window.logoutAdmin = () => {
    sessionStorage.removeItem('heru_admin_auth');
    window.location.href = '/admin/index.html';
};

// DASHBOARD
const initDashboard = () => {
    if(!document.getElementById('admin-dashboard-root')) return;
    const orders = JSON.parse(localStorage.getItem('heru_orders') || '[]');
    const reviews = JSON.parse(localStorage.getItem('heru_reviews') || '[]');
    
    const newOrders = orders.filter(o => o.status === 'received');
    const pendingReviews = reviews.filter(r => !r.is_approved);
    const totalSales = orders.filter(o => o.payment_status === 'confirmed').reduce((acc, o) => acc + o.total, 0);

    document.getElementById('stat-orders-total').textContent = orders.length;
    document.getElementById('stat-orders-new').textContent = newOrders.length;
    document.getElementById('stat-sales').innerHTML = `${totalSales} <span style="font-size:16px; font-family:'Cairo'">EGP</span>`;
    document.getElementById('stat-reviews-new').textContent = pendingReviews.length;

    const tbody = document.getElementById('dashboard-recent-orders');
    const recent = [...orders].reverse().slice(0, 5);
    
    tbody.innerHTML = recent.map(o => {
        let badge = '', statusAr = '';
        if(o.status==='received') {badge = 'badge-received'; statusAr='استُلم';}
        if(o.status==='processing') {badge = 'badge-processing'; statusAr='جاري';}
        if(o.status==='shipped') {badge = 'badge-shipped'; statusAr='شُحن';}
        if(o.status==='delivered') {badge = 'badge-delivered'; statusAr='تم التسليم';}
        
        return `
        <tr>
            <td class="en-text" style="font-weight:700">${o.id}</td>
            <td>${o.customer_name}</td>
            <td class="en-text">${o.total} EGP</td>
            <td>${o.payment_method === 'instapay' ? 'انستاباي' : 'كاش'}</td>
            <td><span class="${badge}">${statusAr}</span></td>
            <td><button onclick="window.location.href='/admin/orders.html?id=${o.id}'" class="btn btn-ghost" style="padding:4px 8px; font-size:var(--text-sm)">تفاصيل</button></td>
        </tr>
        `;
    }).join('');
};

// ADMIN ORDERS
let currentAdminOrders = [];
let orderStatusFilter = 'all';
let orderPaymentFilter = 'all';

const renderAdminOrders = () => {
    const tbody = document.getElementById('orders-table-body');
    const searchVal = document.getElementById('admin-orders-search').value.toLowerCase();
    
    let filtered = currentAdminOrders.filter(o => {
        const matchSearch = String(o.id).toLowerCase().includes(searchVal) || String(o.customer_name).toLowerCase().includes(searchVal);
        const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
        const matchPayment = orderPaymentFilter === 'all' || o.payment_method === orderPaymentFilter;
        return matchSearch && matchStatus && matchPayment;
    }).reverse();

    tbody.innerHTML = filtered.map((o, idx) => {
        let badge = '', statusAr = '';
        if(o.status==='received') {badge = 'badge-received'; statusAr='استُلم';}
        if(o.status==='processing') {badge = 'badge-processing'; statusAr='جاري';}
        if(o.status==='shipped') {badge = 'badge-shipped'; statusAr='شُحن';}
        if(o.status==='delivered') {badge = 'badge-delivered'; statusAr='تم التسليم';}
        const payMethod = o.payment_method === 'instapay' ? 'انستاباي' : 'كاش';

        return `
        <tr>
            <td class="en-text">${filtered.length - idx}</td>
            <td class="en-text" style="font-weight:700">${o.id}</td>
            <td>${o.customer_name}</td>
            <td class="en-text" style="direction:ltr; text-align:right;">${o.phone}</td>
            <td class="en-text">${o.total} EGP</td>
            <td>${payMethod}</td>
            <td><span class="${badge}">${statusAr}</span></td>
            <td><span class="en-text" style="font-size:12px">${new Date(o.created_at).toLocaleDateString('ar-EG')}</span></td>
            <td><button onclick="openOrderDetail('${o.id}')" class="btn btn-ghost" style="padding:4px 8px; font-size:var(--text-sm)">تفاصيل</button></td>
        </tr>
        `;
    }).join('');
};

const initOrders = () => {
    if(!document.getElementById('admin-orders-root')) return;
    currentAdminOrders = JSON.parse(localStorage.getItem('heru_orders') || '[]');
    
    document.getElementById('admin-orders-search').addEventListener('input', renderAdminOrders);
    document.getElementById('admin-orders-payment-filter').addEventListener('change', (e) => {
        orderPaymentFilter = e.target.value;
        renderAdminOrders();
    });
    
    document.querySelectorAll('#orders-status-tabs .admin-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#orders-status-tabs .admin-tab').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            orderStatusFilter = e.target.dataset.status;
            renderAdminOrders();
        });
    });

    renderAdminOrders();
    
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('id')) {
        openOrderDetail(urlParams.get('id'));
    }
};

window.openOrderDetail = (id) => {
    const o = currentAdminOrders.find(x => x.id === id);
    if(!o) return;
    
    document.getElementById('modal-order-id').textContent = o.id;
    
    const itemsTbody = o.items.map(i => `
        <tr>
            <td>${i.name_ar}</td>
            <td class="en-text">${i.qty}</td>
            <td class="en-text">${i.price} EGP</td>
            <td class="en-text">${span(i.price * i.qty)} EGP</td>
        </tr>
    `).join('');
    function span(val) {return val;}

    let paymentAction = '';
    if(o.payment_method === 'instapay') {
        if(o.payment_status === 'confirmed') {
            paymentAction = `<span class="badge-delivered" style="display:inline-block; padding:8px 16px;">✓ تم تأكيد الدفع</span>`;
        } else {
            paymentAction = `<button class="btn" style="background:var(--success); color:#fff" onclick="adminConfirmPayment('${o.id}')">تأكيد الدفع ✓</button>`;
        }
    } else {
        paymentAction = `<span style="color:var(--text-muted); font-size:var(--text-sm)">الدفع عند الاستلام</span>`;
    }

    const html = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4); margin-block-end:var(--space-6); background:var(--bg-elevated); padding:var(--space-4); border-radius:var(--radius-md);">
            <div><span style="color:var(--text-muted); font-size:12px; display:block">الاسم</span><strong>${o.customer_name}</strong></div>
            <div><span style="color:var(--text-muted); font-size:12px; display:block">رقم الهاتف</span><strong class="en-text" style="direction:ltr; display:inline-block">${o.phone}</strong></div>
            <div style="grid-column: span 2"><span style="color:var(--text-muted); font-size:12px; display:block">المحافظة</span><strong>${o.governorate}</strong></div>
        </div>

        <h3 style="margin-block-end:var(--space-3)">المنتجات المطلوبة</h3>
        <table class="admin-table" style="margin-block-end:var(--space-6)">
            <thead><tr><th>المنتج</th><th>الكمية</th><th>السعر</th><th>المجموع</th></tr></thead>
            <tbody>${itemsTbody}</tbody>
        </table>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-block-end:var(--space-6); padding-block-start:var(--space-4); border-block-start:1px solid var(--border);">
            <div style="font-weight:700; font-size:18px;">الإجمالي: <span class="en-text">${o.total}</span> EGP</div>
            <div id="payment-status-container">${paymentAction}</div>
        </div>

        <h3 style="margin-block-end:var(--space-3)">تحديث حالة الطلب</h3>
        <div style="display:flex; gap:var(--space-4)">
            <select id="modal-status-select" class="form-input" style="flex:1">
                <option value="received" ${o.status==='received'?'selected':''}>استُلم (جديد)</option>
                <option value="processing" ${o.status==='processing'?'selected':''}>جاري التجهيز</option>
                <option value="shipped" ${o.status==='shipped'?'selected':''}>مشحون (في الطريق)</option>
                <option value="delivered" ${o.status==='delivered'?'selected':''}>تم التسليم</option>
            </select>
            <button class="btn btn-primary" onclick="adminUpdateStatus('${o.id}')">حفظ التغيير</button>
        </div>
    `;
    
    document.getElementById('modal-order-content').innerHTML = html;
    document.getElementById('orderDetailModal').classList.add('active');
};

window.adminUpdateStatus = (id) => {
    const newStatus = document.getElementById('modal-status-select').value;
    const orders = JSON.parse(localStorage.getItem('heru_orders') || '[]');
    const order = orders.find(x => x.id === id);
    if(order) {
        order.status = newStatus;
        const tlNode = order.timeline.find(t => t.status === newStatus);
        if(tlNode && !tlNode.time) tlNode.time = new Date().toLocaleString('ar-EG', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        localStorage.setItem('heru_orders', JSON.stringify(orders));
        currentAdminOrders = orders;
        renderAdminOrders();
        // also render dashboard if currently open
        if(document.getElementById('dashboard-recent-orders')) initDashboard();
        // ensure toast shows correctly
        if(typeof showToast === 'function') showToast('تم تحديث حالة الطلب بنجاح', 'success');
    }
};

window.adminConfirmPayment = (id) => {
    const orders = JSON.parse(localStorage.getItem('heru_orders') || '[]');
    const order = orders.find(x => x.id === id);
    if(order) {
        order.payment_status = 'confirmed';
        localStorage.setItem('heru_orders', JSON.stringify(orders));
        currentAdminOrders = orders;
        renderAdminOrders();
        document.getElementById('payment-status-container').innerHTML = `<span class="badge-delivered" style="display:inline-block; padding:8px 16px;">✓ تم تأكيد الدفع</span>`;
        if(typeof showToast === 'function') showToast('تم تأكيد الدفع', 'success');
    }
};

// ADMIN PRODUCTS
let currentProducts = [];
let productCategoryFilter = 'all';

const renderAdminProducts = () => {
    const tbody = document.getElementById('products-table-body');
    let filtered = currentProducts;
    if(productCategoryFilter !== 'all') {
        filtered = currentProducts.filter(p => p.category === productCategoryFilter);
    }
    
    tbody.innerHTML = filtered.map(p => {
        let stockBadge = '';
        if(p.stock > 5) stockBadge = `<span style="color:var(--success); font-weight:700" class="en-text">${p.stock}</span>`;
        else if(p.stock > 0 && p.stock <= 5) stockBadge = `<span style="color:var(--warning); font-weight:700"><span class="en-text">${p.stock}</span> (قليل)</span>`;
        else stockBadge = `<span style="color:var(--error); font-weight:700">نفد (0)</span>`;
        
        let feat = p.is_featured ? '<span style="color:var(--accent)">★ نعم</span>' : '<span style="color:var(--text-muted)">لا</span>';
        let catAr = p.category;
        if(catAr === 'poster') catAr = 'لوحة';
        if(catAr === 'notebook') catAr = 'نوت بوك';
        if(catAr === 'sketchbook') catAr = 'كشكول';

        return `
        <tr>
            <td><div style="width:48px; height:48px; border-radius:var(--radius-sm); background:var(--bg-elevated); display:flex; align-items:center; justify-content:center; font-size:10px; color:var(--text-muted)">صورة</div></td>
            <td style="font-weight:700">${p.name_ar}</td>
            <td class="en-text">${p.price} EGP</td>
            <td>${catAr}</td>
            <td>${stockBadge}</td>
            <td>${feat}</td>
            <td>
                <button class="btn btn-ghost" onclick="editProduct('${p.id}')" style="padding:4px 8px;"><i data-lucide="edit-2" style="width:16px; height:16px;"></i></button>
                <button class="btn btn-ghost" onclick="confirmDeleteProduct('${p.id}')" style="padding:4px 8px; color:var(--error)"><i data-lucide="trash-2" style="width:16px; height:16px;"></i></button>
            </td>
        </tr>
        `;
    }).join('');
    if(window.lucide) lucide.createIcons();
};

const initProducts = () => {
    if(!document.getElementById('admin-products-root')) return;
    currentProducts = JSON.parse(localStorage.getItem('heru_products') || '[]');
    
    document.querySelectorAll('#products-category-tabs .admin-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#products-category-tabs .admin-tab').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            productCategoryFilter = e.target.dataset.cat;
            renderAdminProducts();
        });
    });

    renderAdminProducts();
};

window.openProductModal = () => {
    document.getElementById('product-form').reset();
    document.getElementById('p-id').value = '';
    document.getElementById('product-modal-title').textContent = 'إضافة منتج جديد';
    document.getElementById('productFormModal').classList.add('active');
};

window.editProduct = (id) => {
    const p = currentProducts.find(x => x.id === id);
    if(!p) return;
    document.getElementById('p-id').value = p.id;
    document.getElementById('p-ar').value = p.name_ar;
    document.getElementById('p-en').value = p.name_en;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-cat').value = p.category;
    document.getElementById('p-stock').value = p.stock;
    document.getElementById('p-desc').value = p.description_ar;
    document.getElementById('p-featured').checked = p.is_featured;
    
    document.getElementById('product-modal-title').textContent = 'تعديل المنتج';
    document.getElementById('productFormModal').classList.add('active');
};

window.saveProduct = () => {
    const id = document.getElementById('p-id').value || (document.getElementById('p-cat').value.charAt(0) + Date.now().toString().slice(-5));
    const newP = {
        id: id,
        name_ar: document.getElementById('p-ar').value,
        name_en: document.getElementById('p-en').value,
        price: parseInt(document.getElementById('p-price').value, 10),
        category: document.getElementById('p-cat').value,
        stock: parseInt(document.getElementById('p-stock').value, 10),
        description_ar: document.getElementById('p-desc').value,
        is_featured: document.getElementById('p-featured').checked,
        rating: 0,
        reviews: 0
    };
    
    const existingIdx = currentProducts.findIndex(x => x.id === id);
    if(existingIdx >= 0) {
        newP.rating = currentProducts[existingIdx].rating;
        newP.reviews = currentProducts[existingIdx].reviews;
        currentProducts[existingIdx] = newP;
        if(typeof showToast === 'function') showToast('تم تعديل المنتج', 'success');
    } else {
        currentProducts.push(newP);
        if(typeof showToast === 'function') showToast('تم إضافة المنتج بنجاح', 'success');
    }
    
    localStorage.setItem('heru_products', JSON.stringify(currentProducts));
    renderAdminProducts();
    if(typeof closeModal === 'function') closeModal('productFormModal');
};

window.confirmDeleteProduct = (id) => {
    document.getElementById('btn-confirm-delete').onclick = () => {
        currentProducts = currentProducts.filter(x => x.id !== id);
        localStorage.setItem('heru_products', JSON.stringify(currentProducts));
        renderAdminProducts();
        if(typeof closeModal === 'function') closeModal('deleteConfirmModal');
        if(typeof showToast === 'function') showToast('تم حذف المنتج نهائياً', 'success');
    };
    document.getElementById('deleteConfirmModal').classList.add('active');
};

// ADMIN REVIEWS
let currentReviews = [];
let reviewStatusFilter = 'pending'; // pending | approved

const renderAdminReviews = () => {
    const container = document.getElementById('reviews-container');
    const pendingCnt = document.getElementById('rev-pending-cnt');
    const approvedCnt = document.getElementById('rev-approved-cnt');
    const prods = JSON.parse(localStorage.getItem('heru_products') || '[]');
    
    const pending = currentReviews.filter(r => !r.is_approved);
    const approved = currentReviews.filter(r => r.is_approved);
    
    pendingCnt.textContent = pending.length;
    approvedCnt.textContent = approved.length;
    document.getElementById('bulk-approve-btn').style.display = (reviewStatusFilter === 'pending' && pending.length > 0) ? 'inline-block' : 'none';

    const renderList = reviewStatusFilter === 'pending' ? pending : approved;

    if(renderList.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:var(--space-8); color:var(--text-muted); font-size:var(--text-lg)">${reviewStatusFilter === 'pending' ? 'لا يوجد تقييمات منتظرة ✓' : 'لا يوجد تقييمات معتمدة'}</div>`;
        return;
    }
    
    container.innerHTML = renderList.map(r => {
        const prodMatch = prods.find(p => p.id === r.product_id);
        const prodName = prodMatch ? prodMatch.name_ar : 'منتج محذوف';
        
        const actionBtn = reviewStatusFilter === 'pending' 
            ? `<button onclick="adminApproveReview('${r.id}')" class="btn" style="background:var(--success); color:#fff; font-size:var(--text-sm)">✓ قبول</button>` 
            : ``;

        return `
        <div class="admin-card" style="display:flex; flex-direction:column; gap:var(--space-3)">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
                <div>
                    <div style="font-weight:700; margin-block-end:4px">${r.reviewer_name} <span class="en-text" style="color:var(--text-muted); font-size:12px; margin-inline-start:8px; font-weight:400">${new Date(r.created_at).toLocaleDateString('ar-EG')}</span></div>
                    <div style="color:var(--accent); font-size:12px; margin-block-end:8px" class="en-text">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} (${r.rating}/5)</div>
                    <div style="font-size:14px; text-decoration:underline; cursor:pointer" onclick="window.open('/product.html?id=${r.product_id}', '_blank')">${prodName}</div>
                </div>
                <div style="display:flex; gap:8px;">
                    ${actionBtn}
                    <button onclick="adminDeleteReviewPrompt('${r.id}')" class="btn btn-ghost" style="color:var(--error); font-size:var(--text-sm)">${reviewStatusFilter === 'pending' ? '✗ رفض' : 'حذف'}</button>
                </div>
            </div>
            <div style="background:var(--bg); padding:var(--space-3); border-radius:var(--radius-sm); border:1px solid var(--border)">
                "${r.comment}"
            </div>
        </div>
        `;
    }).join('');
};

const initReviews = () => {
    if(!document.getElementById('admin-reviews-root')) return;
    currentReviews = JSON.parse(localStorage.getItem('heru_reviews') || '[]');
    
    document.querySelectorAll('#reviews-status-tabs .admin-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('#reviews-status-tabs .admin-tab').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            reviewStatusFilter = e.target.dataset.status;
            renderAdminReviews();
        });
    });

    renderAdminReviews();
};

window.adminApproveReview = (id) => {
    const rev = currentReviews.find(x => x.id === id);
    if(rev) {
        rev.is_approved = true;
        localStorage.setItem('heru_reviews', JSON.stringify(currentReviews));
        
        // Update product rating natively
        const prods = JSON.parse(localStorage.getItem('heru_products') || '[]');
        const pIdx = prods.findIndex(p => p.id === rev.product_id);
        if(pIdx >= 0) {
            const p = prods[pIdx];
            const newRes = p.reviews + 1;
            p.rating = ((p.rating * p.reviews) + rev.rating) / newRes;
            p.reviews = newRes;
            localStorage.setItem('heru_products', JSON.stringify(prods));
        }
        
        renderAdminReviews();
        if(typeof showToast === 'function') showToast('تمت الموافقة على التقييم بنجاح', 'success');
    }
};

window.adminDeleteReviewPrompt = (id) => {
    document.getElementById('btn-confirm-review-delete').onclick = () => {
        currentReviews = currentReviews.filter(x => x.id !== id);
        localStorage.setItem('heru_reviews', JSON.stringify(currentReviews));
        renderAdminReviews();
        if(typeof closeModal === 'function') closeModal('deleteReviewModal');
        if(typeof showToast === 'function') showToast('تم حذف التقييم', 'success');
    };
    document.getElementById('deleteReviewModal').classList.add('active');
};

window.bulkApproveReviews = () => {
    if(!confirm("هل أنت متأكد من قبول جميع التقييمات المنتظرة؟")) return;
    
    const prods = JSON.parse(localStorage.getItem('heru_products') || '[]');

    currentReviews.forEach(rev => {
        if(!rev.is_approved) {
            rev.is_approved = true;
            const pIdx = prods.findIndex(p => p.id === rev.product_id);
            if(pIdx >= 0) {
                const p = prods[pIdx];
                const newRes = p.reviews + 1;
                p.rating = ((p.rating * p.reviews) + rev.rating) / newRes;
                p.reviews = newRes;
            }
        }
    });

    localStorage.setItem('heru_reviews', JSON.stringify(currentReviews));
    localStorage.setItem('heru_products', JSON.stringify(prods));
    
    renderAdminReviews();
    if(typeof showToast === 'function') showToast('تم الموافقة على الكل بنجاح', 'success');
};

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.includes('/admin')) {
        initDashboard();
        initOrders();
        initProducts();
        initReviews();
    }
});
