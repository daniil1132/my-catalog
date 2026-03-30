// Каталог товаров "Краски Сезона"

const products = [
{
        id: 1,
        title: "Юбка белая",
        price: 1200,
        images: [
            "images/skirt-1.jpg"
        ],
        description: "Стильная белая юбка"
    },
    {
        id: 2,
        title: "Джинсы классические",
        price: 3500,
        images: [
            "images/jeans-1.jpg"
        ],
        description: "Классические джинсы прямого кроя"
    },
    {
    "id": 1774893007077,
    "title": "юбка чёрная",
    "price": 123124214,
    "description": "124421412",
    "images": [
        "images/1774893001716_0_cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL3BmLXM3Mi1wYWktMTAtMDEtbW9ja3VwLWEtam9iMTc2OS1sZjhjd2xzay5qcGc.jpg"
    ]
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

// Отображение товаров
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

// Открытие модального окна
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

// Закрытие модального окна
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

// Обновление главного фото
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

// Переключение фото стрелками
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

// Создание миниатюр
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

// Поиск товаров
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(item => item.title.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Запуск при загрузке страницы
renderProducts(products);
