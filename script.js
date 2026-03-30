// ÐÐ°Ð·Ð° Ð´Ð°Ð½Ð½ÑÑ ÑÐ¾Ð²Ð°ÑÐ¾Ð²
const products = [
    {
    "id": 1774884040600,
    "title": "Штаны",
    "price": 100000,
    "description": "123123123",
    "images": [
        "images/placeholder.jpg"
    ]
},
    {
        id: 1,
        title: "Ð®Ð±ÐºÐ° Ð±ÐµÐ»Ð°Ñ",
        price: 1200,
        images: [
            "images/skirt/skirt-1.jpg",
            "images/skirt/skirt-2.jpg",
            "images/skirt/skirt-3.jpg"
        ],
        description: "Ð¡ÑÐ¸Ð»ÑÐ½Ð°Ñ Ð±ÐµÐ»Ð°Ñ ÑÐ±ÐºÐ°. ÐÐ´ÐµÐ°Ð»ÑÐ½Ð¾ Ð¿Ð¾Ð´ÑÐ¾Ð´Ð¸Ñ Ð´Ð»Ñ Ð»ÐµÑÐ½ÐµÐ³Ð¾ ÑÐµÐ·Ð¾Ð½Ð°."
    },
    {
        id: 2,
        title: "ÐÐ¶Ð¸Ð½ÑÑ ÐºÐ»Ð°ÑÑÐ¸ÑÐµÑÐºÐ¸Ðµ",
        price: 3500,
        images: [
            "images/jeans-1.jpg",
            "images/jeans-2.jpg"
        ],
        description: "ÐÐ»Ð°ÑÑÐ¸ÑÐµÑÐºÐ¸Ðµ Ð´Ð¶Ð¸Ð½ÑÑ Ð¿ÑÑÐ¼Ð¾Ð³Ð¾ ÐºÑÐ¾Ñ. ÐÐ°ÑÐµÑÑÐ²ÐµÐ½Ð½Ð°Ñ ÑÐºÐ°Ð½Ñ."
    },
    {
        id: 3,
        title: "ÐÐ»Ð°ÑÑÐµ Ð²ÐµÑÐµÑÐ½ÐµÐµ",
        price: 5500,
        images: [
            "images/dress-1.jpg",
            "images/dress-2.jpg",
            "images/dress-3.jpg"
        ],
        description: "Ð­Ð»ÐµÐ³Ð°Ð½ÑÐ½Ð¾Ðµ Ð²ÐµÑÐµÑÐ½ÐµÐµ Ð¿Ð»Ð°ÑÑÐµ Ð´Ð»Ñ Ð¾ÑÐ¾Ð±ÑÑ ÑÐ»ÑÑÐ°ÐµÐ²."
    }
];

const catalogGrid = document.getElementById('catalog-grid');
const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalThumbnails = document.getElementById('modalThumbnails');

let currentProduct = null;
let currentPhotoIndex = 0;

// ÐÑÐ¾Ð±ÑÐ°Ð¶ÐµÐ½Ð¸Ðµ ÑÐ¾Ð²Ð°ÑÐ¾Ð²
function renderProducts(items) {
    catalogGrid.innerHTML = '';
    
    if (items.length === 0) {
        catalogGrid.innerHTML = '<p>Ð¢Ð¾Ð²Ð°ÑÑ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ñ</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);
        const mainImage = product.images[0];

        card.innerHTML = `
            <img src="${mainImage}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formattedPrice} â½</div>
            </div>
        `;
        
        card.onclick = () => openModal(product);
        
        catalogGrid.appendChild(card);
    });
}

// ÐÑÐºÑÑÑÐ¸Ðµ Ð¼Ð¾Ð´Ð°Ð»ÑÐ½Ð¾Ð³Ð¾ Ð¾ÐºÐ½Ð°
function openModal(product) {
    currentProduct = product;
    currentPhotoIndex = 0;
    
    modalTitle.textContent = product.title;
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);
    modalPrice.textContent = `${formattedPrice} â½`;
    modalDesc.textContent = product.description || 'ÐÐ¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð¾ÑÑÑÑÑÑÐ²ÑÐµÑ';
    
    updateModalImage();
    createThumbnails();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ÐÐ°ÐºÑÑÑÐ¸Ðµ Ð¼Ð¾Ð´Ð°Ð»ÑÐ½Ð¾Ð³Ð¾ Ð¾ÐºÐ½Ð°
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

modal.onclick = (e) => {
    if (e.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ÐÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð³Ð»Ð°Ð²Ð½Ð¾Ð³Ð¾ ÑÐ¾ÑÐ¾
function updateModalImage() {
    if (currentProduct && currentProduct.images.length > 0) {
        modalImage.src = currentProduct.images[currentPhotoIndex];
        
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentPhotoIndex);
        });
        
        const prevBtn = document.querySelector('.gallery-nav.prev');
        const nextBtn = document.querySelector('.gallery-nav.next');
        
        if (currentProduct.images.length === 1) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }
    }
}

// ÐÐµÑÐµÐºÐ»ÑÑÐµÐ½Ð¸Ðµ ÑÐ¾ÑÐ¾ ÑÑÑÐµÐ»ÐºÐ°Ð¼Ð¸
function changePhoto(direction) {
    if (!currentProduct) return;
    
    const total = currentProduct.images.length;
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = total - 1;
    } else if (currentPhotoIndex >= total) {
        currentPhotoIndex = 0;
    }
    
    updateModalImage();
}

// Ð¡Ð¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð¼Ð¸Ð½Ð¸Ð°ÑÑÑ
function createThumbnails() {
    modalThumbnails.innerHTML = '';
    
    if (!currentProduct || currentProduct.images.length <= 1) {
        return;
    }
    
    currentProduct.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.className = 'thumbnail' + (index === currentPhotoIndex ? ' active' : '');
        thumb.onclick = () => {
            currentPhotoIndex = index;
            updateModalImage();
        };
        modalThumbnails.appendChild(thumb);
    });
}

// ÐÐ¾Ð¸ÑÐº ÑÐ¾Ð²Ð°ÑÐ¾Ð²
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(item => item.title.toLowerCase().includes(query));
    renderProducts(filtered);
}

// ÐÐ°Ð¿ÑÑÐº Ð¿ÑÐ¸ Ð·Ð°Ð³ÑÑÐ·ÐºÐµ ÑÑÑÐ°Ð½Ð¸ÑÑ
renderProducts(products);