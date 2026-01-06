/**
 * Основной JavaScript для лендинга LUMMEH SPA POINT
 */

/**
 * Данные для программ и подарков (загружаются динамически)
 */
let programsData = {
    programs: [
        {
            name: 'Дыхание Карелии',
            desc: 'Авторская программа, сочетающая целебные карельские травы и восточные массажные техники',
            duration: '120 мин',
            price: '8 500 ₽',
            includes: ['Массаж всего тела', 'Ароматерапия', 'Травяной чай', 'Релаксация'],
            image: 'proccess1 1.png'
        },
        {
            name: 'Великолепие роскоши',
            desc: 'Премиум spa-программа с эксклюзивными процедурами для полного восстановления',
            duration: '180 мин',
            price: '12 000 ₽',
            includes: ['Стоун-терапия', 'Массаж лица', 'Пилинг тела', 'Шампанское'],
            image: 'procces2 1.png'
        },
        {
            name: 'Пенное великолепие',
            desc: 'Экзотическая процедура в облаке ароматной пены для абсолютного наслаждения',
            duration: '90 мин',
            price: '5 500 ₽',
            includes: ['Пенный массаж', 'Масло-массаж', 'Ароматерапия'],
            image: 'proccess3 1.png'
        }
    ],
    gifts: [
        {
            name: 'Подарочный сертификат 5000₽',
            desc: 'Идеальный подарок для близких на любой случай',
            price: '5 000 ₽',
            image: 'Gift1.png'
        },
        {
            name: 'Подарочный сертификат 10000₽',
            desc: 'Полноценная spa-программа в подарок',
            price: '10 000 ₽',
            image: 'gift2.png'
        },
        {
            name: 'Индивидуальный сертификат',
            desc: 'Создайте уникальный подарок на любую сумму',
            price: 'от 3 000 ₽',
            image: 'gift3.png'
        }
    ],
    cosmetics: [
        {
            name: 'Массажные масла',
            desc: 'Премиальные натуральные масла для домашнего использования',
            price: 'от 1 500 ₽',
            image: 'Kosm.png'
        },
        {
            name: 'Ароматические свечи',
            desc: 'Авторские свечи с натуральными эфирными маслами',
            price: 'от 800 ₽',
            image: 'Kosm1.png'
        },
        {
            name: 'Травяные сборы',
            desc: 'Карельские травы для чая и ванн',
            price: 'от 600 ₽',
            image: 'Kosm2.png'
        }
    ]
};

/**
 * Переменные для программ
 */
let currentCategory = 'programs';

/**
 * Загрузка программ с сервера
 */
async function loadProgramsFromAPI() {
    try {
        const response = await fetch('/api/programs');
        if (response.ok) {
            const data = await response.json();
            programsData = data;
            renderProgramsCards();
        } else {
            console.error('Ошибка загрузки программ:', response.status);
        }
    } catch (error) {
        console.error('Ошибка загрузки программ:', error);
    }
}

/**
 * Рендеринг карточек для текущей категории
 */
function renderProgramsCards() {
    const grid = document.getElementById('programsGrid');
    if (!grid) return;
    
    const items = programsData[currentCategory] || [];
    grid.innerHTML = '';
    
    items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        
        // Определяем иконку в зависимости от категории
        let iconSvg = '';
        if (currentCategory === 'programs') {
            iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
        } else if (currentCategory === 'gifts') {
            iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';
        } else {
            iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
        }
        
        let cardContent = '';
        
        // Добавляем изображение если есть
        if (item.image) {
            cardContent += `
                <div class="program-card-image-wrapper">
                    <img src="/static/images/${item.image}" alt="${item.name}" class="program-card-image" loading="eager" decoding="async" fetchpriority="high">
                </div>
            `;
        }
        
        cardContent += `
            <div class="program-card-content">
                <h3 class="program-name">${item.name}</h3>
        `;
        
        // Для программ добавляем длительность
        if (currentCategory === 'programs' && item.duration) {
            cardContent += `<p class="program-duration">${item.duration}</p>`;
        }
        
        cardContent += `
            <p class="program-desc">${item.desc}</p>
        `;
        
        // Для программ добавляем список включенных услуг
        if (currentCategory === 'programs' && item.includes) {
            cardContent += `
                <div class="program-includes">
                    <p class="program-includes-title">Включает:</p>
                    <ul class="program-includes-list">
            `;
            item.includes.forEach(include => {
                cardContent += `<li class="program-includes-item">${include}</li>`;
            });
            cardContent += `
                    </ul>
                </div>
            `;
        }
        
        cardContent += `
            <div class="program-footer">
                <span class="program-price">${item.price}</span>
                <button class="program-btn">${currentCategory === 'gifts' || currentCategory === 'cosmetics' ? 'Купить' : 'Подробнее'}</button>
            </div>
            </div>
        `;
        
        card.innerHTML = cardContent;
        grid.appendChild(card);
    });
}

/**
 * Переключение категории
 */
function switchCategory(category) {
    currentCategory = category;
    
    // Обновляем активную кнопку таба
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === category) {
            btn.classList.add('active');
        }
    });
    
    renderProgramsCards();
}

/**
 * Плавная прокрутка для навигации
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Учитываем высоту навигации
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Эффект hover для блока атмосферы (отключен - все элементы используют CSS hover)
 */
function initAtmosphereHover() {
    // Специальный hover эффект отключен - все элементы используют единый CSS hover
}

/**
 * Данные об услугах (загружаются динамически)
 */
let servicesData = {};

/**
 * Загрузка услуг с сервера
 */
async function loadServicesFromAPI() {
    try {
        const response = await fetch('/api/services');
        if (response.ok) {
            servicesData = await response.json();
            renderServices();
        } else {
            console.error('Ошибка загрузки услуг:', response.status);
            // Используем пустые данные, если не удалось загрузить
            servicesData = {};
        }
    } catch (error) {
        console.error('Ошибка загрузки услуг:', error);
        servicesData = {};
    }
}

/**
 * Рендеринг карточек услуг
 */
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (!servicesData || Object.keys(servicesData).length === 0) {
        grid.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; grid-column: 1/-1;">Услуги временно недоступны</p>';
        return;
    }
    
    Object.keys(servicesData).sort((a, b) => Number(a) - Number(b)).forEach(id => {
        const service = servicesData[id];
        if (!service) return;
        
        const card = document.createElement('div');
        card.className = 'service-card';
        
        const imageSrc = service.image 
            ? `/static/images/${service.image}` 
            : `/static/images/usliga${id}.png`;
        
        // Устанавливаем фон карточки
        card.style.backgroundImage = `url('${imageSrc}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.backgroundRepeat = 'no-repeat';
        
        card.innerHTML = `
            <div class="service-overlay"></div>
            <div class="service-content">
                <div class="service-header">
                    <span class="service-duration">${service.duration || ''}</span>
                </div>
                <h3 class="service-name">${service.name || 'Услуга'}</h3>
                <p class="service-desc">${service.desc || ''}</p>
                <div class="service-footer">
                    <span class="service-price">${service.price || ''}</span>
                    <a href="#booking" class="service-link">Подробнее →</a>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}


/**
 * Параллакс эффект для блока достижений
 */
function initAchievementsParallax() {
    const aboutSection = document.querySelector('.about-section');
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    if (!aboutSection) return;
    
    let ticking = false;
    
    function updateParallax() {
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // Параллакс для элементов
        achievementItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.3;
            if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
                const progress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
                const translateY = (progress - 0.5) * 30 * speed;
                item.style.transform = `translateY(${translateY}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    updateParallax();
}

/**
 * Анимация счетчиков для достижений
 */
function animateCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                counter.classList.add('animated');
                
                const suffix = counter.getAttribute('data-suffix') || '';
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString('ru-RU') + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('ru-RU') + suffix;
                    }
                };
                
                updateCounter();
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Предзагрузка всех изображений программ
 */
function preloadProgramImages() {
    const allImages = [];
    
    // Собираем все изображения из всех категорий
    Object.values(programsData).forEach(category => {
        category.forEach(item => {
            if (item.image) {
                allImages.push(`/static/images/${item.image}`);
            }
        });
    });
    
    // Предзагружаем все изображения
    allImages.forEach(imageSrc => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageSrc;
        document.head.appendChild(link);
        
        // Также создаем Image объект для предзагрузки
        const img = new Image();
        img.src = imageSrc;
    });
}

/**
 * Инициализация при загрузке страницы
 */
// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем услуги с сервера
    loadServicesFromAPI();
    
    // Загружаем программы с сервера
    loadProgramsFromAPI();
    // Предзагружаем изображения программ сразу
    preloadProgramImages();
    
    initAtmosphereHover();
    
    // Инициализация программ
    renderProgramsCards();
    
    // Параллакс для достижений
    initAchievementsParallax();
    
    // Анимация счетчиков
    animateCounters();
    
    // Обработчики для табов
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-tab');
            if (category) {
                switchCategory(category);
            }
        });
    });
    
    
});

