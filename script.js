// 1. База данных товаров с несколькими фото
const products = [
    {
        id: 1,
        title: "Смартфон Super X",
        price: 25000,
        category: "electronics",
        images: [
            "images/phone-1.jpg",
            "images/phone-2.jpg",
            "images/phone-3.jpg"
        ],
        description: "Современный смартфон с отличной камерой и долгим временем работы батареи. Дисплей 6.7 дюймов, память 256 ГБ."
    },
    {
        id: 2,
        title: "Ноутбук Pro 15",
        price: 85000,
        category: "electronics",
        images: [
            "images/laptop-1.jpg",
            "images/laptop-2.jpg"
        ],
        description: "Мощный ноутбук для работы и развлечений. Процессор последнего поколения, 16 ГБ ОЗУ, SSD 512 ГБ."
    },
    {
        id: 3,
        title: "Юбка белая",
        price: 1200,
        category: "clothing",
        images: [
            "images/tshirt-1.jpg",
            "images/tshirt-2.jpg",
            "images/tshirt-3.jpg"
        ],
        description: "Классическая белая футболка из 100% хлопка. Удобный крой, подходит для повседневной носки."
    },
    {
        id: 4,
        title: "Джинсы классические",
        price: 3500,
        category: "clothing",
        images: [
            "images/jeans-1.jpg",
            "images/jeans-2.jpg"
        ],
        description: "Классические джинсы прямого кроя. Качественная ткань, износостойкие."
    },
    {
        id: 5,
        title: "Наушники беспроводные",
        price: 5000,
        category: "electronics",
        images: [
            "images/headphones-1.jpg",
            "images/headphones-2.jpg",
            "images/headphones-3.jpg"
        ],
        description: "Беспроводные наушники с шумоподавлением и качественным звуком. Время работы до 30 часов."
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

// 2. Функция отображения товаров
function renderProducts(items) {
    catalogGrid.innerHTML = '';
    
    if (items.length === 0) {
        catalogGrid.innerHTML = '<p>Товары не найдены</p>';
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
                <div class="product-price">${formattedPrice} ₽</div>
            </div>
        `;
        
        card.onclick = () => openModal(product);
        
        catalogGrid.appendChild(card);
    });
}

// 3. Открытие модального окна
function openModal(product) {
    currentProduct = product;
    currentPhotoIndex = 0;
    
    modalTitle.textContent = product.title;
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);
    modalPrice.textContent = `${formattedPrice} ₽`;
    modalDesc.textContent = product.description || 'Описание отсутствует';
    
    updateModalImage();
    createThumbnails();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 4. Закрытие модального окна
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

// 5. Обновление главного фото
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

// 6. Переключение фото стрелками
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

// 7. Создание миниатюр
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

// 8. Функция фильтрации по категориям
function filterCategory(category) {
    document.querySelectorAll('.categories button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(item => item.category === category);
        renderProducts(filtered);
    }
}

// 9. Функция поиска
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(item => item.title.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Запуск при загрузке страницы
renderProducts(products);