// ============================================================
// بيانات المنتجات
// ============================================================
const products = [
    {
        id: 1, name: 'بربي هير', gender: 'women', category: "WOMAN'S", brand: 'BURBERRY',
        image: 'p1.jpg', exclusive: false, gift: true,
        sizes: [
            { label: '50 مل', price: '250 ر.س' },
            { label: '100 مل', price: '400 ر.س' },
            { label: '30 مل', price: '180 ر.س' }
        ]
    },
    {
        id: 2, name: 'Sauvage Dior', gender: 'men', category: "MEN'S", brand: 'SAUVAGE Dior',
        image: 'suv6.jpg', exclusive: true, gift: false,
        sizes: [
            { label: '100 مل', price: '420 ر.س' },
            { label: '50 مل', price: '280 ر.س' }
        ]
    },
    {
        id: 3, name: 'أمير الرحاب', gender: 'men', category: "MEN'S", brand: 'AL REHAB',
        image: 'mi5.jpg', exclusive: true, gift: false,
        sizes: [
            { label: '50 مل', price: '250 ر.س' },
            { label: '100 مل', price: '400 ر.س' }
        ]
    },
    {
        id: 4, name: 'جواهر الملكة', gender: 'women', category: "WOMAN'S", brand: 'AL REHAB',
        image: 'mi6.jpg', exclusive: false, gift: true,
        sizes: [
            { label: '50 مل', price: '275 ر.س' },
            { label: '100 مل', price: '450 ر.س' }
        ]
    },
    {
        id: 5, name: 'ليالي الشرق', gender: 'unisex', category: 'UNISEX', brand: 'AL REHAB',
        image: 'mi7.jpg', exclusive: true, gift: true,
        sizes: [
            { label: '50 مل', price: '220 ر.س' },
            { label: '100 مل', price: '360 ر.س' }
        ]
    },
    {
        id: 6, name: 'سحر العود', gender: 'men', category: "MEN'S", brand: 'AL REHAB',
        image: 'img2.jpg', exclusive: true, gift: false,
        sizes: [
            { label: '50 مل', price: '320 ر.س' },
            { label: '100 مل', price: '520 ر.س' }
        ]
    }
];

// ============================================================
// الشريط الترويجي
// ============================================================
const ribbonItems = [
    { icon: 'fa-medal', text: 'جودة ممتازة جداً وضمان عالمي' },
    { icon: 'fa-hourglass-half', text: 'ثبات رائع يدوم لأكثر من 24 ساعة' },
    { icon: 'fa-crown', text: 'رائحة فخمة تأسر الحواس' },
    { icon: 'fa-star', text: 'تجربة شراء ممتازة وآمنة 100%' },
    { icon: 'fa-truck-fast', text: 'توصيل سريع لجميع المناطق' },
    { icon: 'fa-gift', text: 'عينات مجانية فاخرة مع كل طلب' }
];

const ribbonTrack = document.getElementById('ribbonTrack');
function buildRibbonCards() {
    let html = '';
    for (let rep = 0; rep < 3; rep++) {
        ribbonItems.forEach(item => {
            html += `<div class="ribbon-card"><i class="fas ${item.icon}"></i>${item.text}</div>`;
        });
    }
    return html;
}
ribbonTrack.innerHTML = buildRibbonCards();

// ============================================================
// بناء بطاقة المنتج
// ============================================================
function buildProductCard(p) {
    const sizeButtons = p.sizes.map((s, idx) => `
        <button class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${s.label}">
            ${s.label} <span class="size-price">${s.price}</span>
        </button>
    `).join('');
    return `
        <div class="product-card" data-id="${p.id}" id="product-${p.id}" data-gender="${p.gender}">
            <div class="product-image-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-gender">${p.category}</span>
                <h3 class="product-name">${p.name}</h3>
                <div class="product-sizes">${sizeButtons}</div>
                <button class="btn-add-cart add-to-cart" data-id="${p.id}">
                    <i class="fas fa-plus-circle"></i> أضف للسلة
                </button>
                <span class="product-brand">${p.brand}</span>
            </div>
        </div>
    `;
}

// ============================================================
// عرض المنتجات في شبكة
// ============================================================
function renderGrid(gridEl, productList, emptyMsg = 'لا توجد منتجات حالياً') {
    if (productList.length === 0) {
        gridEl.innerHTML = `<p style="text-align:center;color:#888;padding:40px;">${emptyMsg}</p>`;
        return;
    }
    gridEl.innerHTML = productList.map(buildProductCard).join('');
    // ربط أحداث اختيار الحجم
    gridEl.querySelectorAll('.size-pill').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.closest('.product-sizes');
            parent.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ============================================================
// التصيير الأولي
// ============================================================
const homeGrid = document.getElementById('productsGrid');
const exclusiveGrid = document.getElementById('exclusiveGrid');
const giftsGrid = document.getElementById('giftsGrid');

renderGrid(homeGrid, products);
renderGrid(exclusiveGrid, products.filter(p => p.exclusive));
renderGrid(giftsGrid, products.filter(p => p.gift));

// ============================================================
// فلاتر التصنيف
// ============================================================
const filterPills = document.querySelectorAll('.pill');
filterPills.forEach(pill => {
    pill.addEventListener('click', function() {
        filterPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        const filtered = filter === 'all' ? products : products.filter(p => p.gender === filter);
        renderGrid(homeGrid, filtered, 'لا توجد منتجات في هذا التصنيف');
    });
});

// ============================================================
// القائمة الجانبية
// ============================================================
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}
hamburgerBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSidebar(); closeSearch(); } });

// ============================================================
// نظام التنقل بين الصفحات (Views)
// ============================================================
function navigateTo(page) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home') {
        document.getElementById('view-home').classList.add('active');
    } else if (page === 'men' || page === 'women') {
        document.getElementById('view-home').classList.add('active');
        filterPills.forEach(p => p.classList.remove('active'));
        const target = document.querySelector(`.pill[data-filter="${page}"]`);
        if (target) target.classList.add('active');
        const filtered = products.filter(p => p.gender === page);
        renderGrid(homeGrid, filtered);
        setTimeout(() => document.getElementById('homeProductsSection').scrollIntoView({ behavior: 'smooth' }), 200);
    } else if (page === 'exclusive') {
        document.getElementById('view-exclusive').classList.add('active');
    } else if (page === 'gifts') {
        document.getElementById('view-gifts').classList.add('active');
    } else if (page === 'contact') {
        document.getElementById('view-contact').classList.add('active');
    }
}

// ربط روابط القائمة الجانبية
document.querySelectorAll('.sidebar nav a, [data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) { navigateTo(page); closeSidebar(); }
    });
});

// زر "تسوق المجموعة" في الهيرو
document.getElementById('heroShopBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('homeProductsSection').scrollIntoView({ behavior: 'smooth' });
});

// ============================================================
// سلة التسوق
// ============================================================
let cartCount = 0;
const cartBadge = document.getElementById('cartBadge');

function updateCartBadge() {
    cartBadge.textContent = cartCount;
    cartBadge.style.transform = 'scale(1.4)';
    setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
}

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    e.preventDefault();
    cartCount++;
    updateCartBadge();
    const card = btn.closest('.product-card');
    if (card) {
        card.style.transition = 'box-shadow 0.15s';
        card.style.boxShadow = '0 0 60px rgba(0, 240, 255, 0.8), 0 0 100px rgba(255, 0, 85, 0.5)';
        setTimeout(() => { card.style.boxShadow = ''; }, 400);
    }
});

document.getElementById('cartBtn').addEventListener('click', () => {
    alert(`🛒 لديك ${cartCount} منتج(ات) في السلة`);
});

// ============================================================
// نظام البحث
// ============================================================
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchBtn = document.getElementById('searchBtn');
const closeSearchBtn = document.getElementById('closeSearch');

function openSearch() {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
    renderSearchResults('');
}
function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
}
searchBtn.addEventListener('click', openSearch);
closeSearchBtn.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });

function renderSearchResults(query) {
    const q = query.trim().toLowerCase();
    const matches = q === '' ? products : products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
        searchResults.innerHTML = '<p style="text-align:center;color:#888;padding:30px;">لا توجد نتائج مطابقة</p>';
        return;
    }

    searchResults.innerHTML = matches.map(p => `
        <div class="search-result" data-id="${p.id}">
            <img src="${p.image}" alt="${p.name}">
            <div class="search-result-info">
                <div class="search-result-name">${p.name}</div>
                <div class="search-result-price">${p.sizes[0].label} - ${p.sizes[0].price}</div>
            </div>
            <i class="fas fa-arrow-left"></i>
        </div>
    `).join('');

    searchResults.querySelectorAll('.search-result').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.dataset.id);
            closeSearch();
            navigateTo('home');
            // إعادة عرض جميع المنتجات لضمان وجود المنتج
            renderGrid(homeGrid, products);
            filterPills.forEach(p => p.classList.remove('active'));
            document.querySelector('.pill[data-filter="all"]').classList.add('active');
            setTimeout(() => {
                const card = document.getElementById(`product-${id}`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.boxShadow = '0 0 60px rgba(0, 240, 255, 0.8), 0 0 100px rgba(255, 0, 85, 0.5)';
                    setTimeout(() => { card.style.boxShadow = ''; }, 2500);
                }
            }, 300);
        });
    });
}

searchInput.addEventListener('input', e => renderSearchResults(e.target.value));

// ============================================================
// نموذج التواصل
// ============================================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    alert(`شكراً لك ${name}! تم استلام رسالتك وسنعود إليك في أقرب وقت.`);
    this.reset();
});

// ============================================================
// تسجيل
// ============================================================
console.log('✨ عطور الرحاب — النسخة الكاملة جاهزة ✨');