// 1. База данных товаров (Редактируйте этот список)
const products = [
    {
        id: 1,
        title: "Смартфон Super X",
        price: 25000,
        category: "electronics",
        image: "https://via.placeholder.com/300x200?text=Phone" 
    },
    {
        id: 2,
        title: "Ноутбук Pro 15",
        price: 85000,
        category: "electronics",
        image: "https://via.placeholder.com/300x200?text=Laptop"
    },
    {
        id: 3,
        title: "Футболка белая",
        price: 1200,
        category: "clothing",
        image: "https://via.placeholder.com/300x200?text=T-Shirt"
    },
    {
        id: 4,
        title: "Джинсы классические",
        price: 3500,
        category: "clothing",
        image: "https://via.placeholder.com/300x200?text=Jeans"
    },
    {
        id: 5,
        title: "Наушники беспроводные",
        price: 5000,
        category: "electronics",
        image: "https://via.placeholder.com/300x200?text=Headphones"
    }
];

const catalogGrid = document.getElementById('catalog-grid');

// 2. Функция отображения товаров
function renderProducts(items) {
    catalogGrid.innerHTML = ''; // Очищаем сетку
    
    if (items.length === 0) {
        catalogGrid.innerHTML = '<p>Товары не найдены</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Форматируем цену (добавляем пробелы: 25 000)
        const formattedPrice = new Intl.NumberFormat('ru-RU').format(product.price);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formattedPrice} ₽</div>
                <button class="btn-buy" onclick="alert('Товар: ${product.title}')">Купить</button>
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

// 3. Функция фильтрации по категориям
function filterCategory(category) {
    // Подсветка активной кнопки
    document.querySelectorAll('.categories button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(item => item.category === category);
        renderProducts(filtered);
    }
}

// 4. Функция поиска
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(item => item.title.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Запуск при загрузке страницы
renderProducts(products);