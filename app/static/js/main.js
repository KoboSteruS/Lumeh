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
 * Данные для всех услуг спа-салона
 */
let allServicesData = {
    'balinese': [
        { name: 'Балийский массаж', duration: '60 мин', price: '3 500 руб' },
        { name: 'Балийский массаж', duration: '90 мин', price: '5 000 руб' },
        { name: 'Балийский массаж', duration: '120 мин', price: '6 500 руб' },
        { name: 'Royal Bali (массаж в 4 руки)', duration: '60 мин', price: '6 200 руб' },
        { name: 'Royal Bali (массаж в 4 руки)', duration: '90 мин', price: '9 000 руб' },
        { name: 'Балийский массаж спины', duration: '60 мин', price: '2 900 руб' }
    ],
    'thai': [
        { name: 'Тайский aroma oil массаж', duration: '60 мин', price: '3 500 руб' },
        { name: 'Тайский aroma oil массаж', duration: '90 мин', price: '5 000 руб' },
        { name: 'Тайский aroma oil массаж', duration: '120 мин', price: '6 500 руб' },
        { name: 'Тайский традиционный в кимоно на массажном столе', duration: '60 мин', price: '3 000 руб' },
        { name: 'Тайский традиционный в кимоно на массажном столе', duration: '90 мин', price: '4 500 руб' },
        { name: 'Тайский традиционный в кимоно на массажном столе', duration: '120 мин', price: '6 000 руб' },
        { name: 'Foot массаж', duration: '60 мин', price: '2 900 руб' },
        { name: 'Глубокие ткани', duration: '60 мин', price: '4 000 руб' },
        { name: 'Тайский массаж лица и головы с косметикой', duration: '60 мин', price: '3 600 руб' }
    ],
    'european': [
        { name: 'Aroma Touch массаж (на маслах do TERRA)', duration: '60 мин', price: '4 000 руб' },
        { name: 'Солевой detox массаж', duration: '60 мин', price: '3 600 руб' },
        { name: 'Авторский массаж', duration: '60 мин', price: '5 000 руб' },
        { name: 'Испанский Хиромассаж лица', duration: '60 мин', price: '3 500 руб' },
        { name: 'Шведский массаж', duration: '60 мин', price: '3 600 руб' }
    ],
    'care': [
        { name: 'Экспресс уход (гоммаж, обертывание с сухой морской водой, нанесение крема массажными движениями)', duration: '90 мин', price: '5 000 руб' },
        { name: 'Гранд уход (гоммаж, обертывание с сухой морской водой, балийский массаж 60 минут)', duration: '120 мин', price: '8 000 руб' }
    ],
    'figure': [
        { name: 'Slim массаж', duration: '60 мин', price: '4 500 руб' },
        { name: 'Slim массаж', duration: '90 мин', price: '6 500 руб' },
        { name: 'Лимфодренажный', duration: '60 мин', price: '4 700 руб' },
        { name: 'Лимфодренажный', duration: '90 мин', price: '7 000 руб' },
        { name: 'Комплекс по коррекции фигуры (распаривание в бочке, Здрава 15 минут, обертывание, массаж на выбор: slim/лимфодренажный 30 минут, чайный релакс)', duration: '90 мин', price: '5 500 руб' }
    ],
    'children': [
        { name: 'Тайский aroma oil массаж', duration: '45 мин', price: '2 500 руб', age: '(от 4 до 13 лет)' },
        { name: 'Тайский aroma oil массаж', duration: '60 мин', price: '2 600 руб', age: '(от 4 до 13 лет)' },
        { name: 'Массаж спины', duration: '30 мин', price: '2 000 руб', age: '(от 4 до 13 лет)' },
        { name: 'Скрабирование', duration: '20 мин', price: '1 500 руб', age: '(от 4 до 13 лет)' },
        { name: 'Пенный массаж в Хаммаме', duration: '15 мин', price: '1 500 руб', age: '(от 4 до 13 лет)' }
    ],
    'other': [
        { name: 'Массаж горячими камнями', duration: '60 мин', price: '4 200 руб' },
        { name: 'Массаж горячими камнями', duration: '90 мин', price: '6 100 руб' },
        { name: 'Массаж тающей свечой', duration: '60 мин', price: '4 500 руб' },
        { name: 'Массаж тающей свечой', duration: '90 мин', price: '6 500 руб' },
        { name: 'Массаж тающей свечой', duration: '120 мин', price: '8 500 руб' },
        { name: 'Herbal массаж травяными мешочками', duration: '60 мин', price: '4 500 руб' },
        { name: 'Herbal массаж травяными мешочками', duration: '90 мин', price: '6 500 руб' },
        { name: 'Антистресс массаж', duration: '60 мин', price: '3 500 руб' },
        { name: 'Антистресс массаж', duration: '90 мин', price: '5 000 руб' },
        { name: 'Антистресс массаж', duration: '120 мин', price: '6 500 руб' },
        { name: 'Гавайский массаж Ломи-Ломи', duration: '60 мин', price: '4 000 руб' },
        { name: 'Гавайский массаж Ломи-Ломи', duration: '90 мин', price: '6 000 руб' },
        { name: 'Абхъянга массаж', duration: '60 мин', price: '4 500 руб' },
        { name: 'Абхъянга массаж', duration: '90 мин', price: '6 500 руб' }
    ],
    'spa-single': [
        { name: 'Путешествие к себе (тайский aroma oil-массаж 60 минут, массаж стоп/головы 15 минут, чайный релакс)', duration: '90 мин', price: '5 500 руб', category: 'Без прогрева' },
        { name: 'Наедине с собой (скрабирование, массаж на выбор 60 минут, чайный релакс)', duration: '120 мин', price: '6 500 руб', category: 'Без прогрева' },
        { name: 'Мудрость Севера (распаривание в бочке Фурако, массаж на выбор 60 минут, чайный релакс)', duration: '120 мин', price: '6 600 руб', category: 'С бочкой Фурако' },
        { name: 'Мудрость Севера (распаривание в бочке Фурако, массаж на выбор 90 минут, чайный релакс)', duration: '150 мин', price: '8 200 руб', category: 'С бочкой Фурако' },
        { name: 'Голубая лагуна (посещение Хаммама с бассейном 45 минут, массаж на выбор 60 минут, чайный релакс)', duration: '140 мин', price: '10 500 руб', category: 'Хаммам' },
        { name: 'Пенное совершенство (парение в Хаммаме с посещением бассейна 30 минут, пилинг всего тела варежкой Кесе 15 минут, традиционный пенный массаж 15 минут, антистресс массаж 60 минут с нанесением маски для лица, чайный релакс)', duration: '170 мин', price: '17 500 руб', category: 'Хаммам' },
        { name: 'Океан удовольствий (парение в Хаммаме с посещением бассейна 45 минут, пилинг всего тела варежкой Кесе 15 минут, Royal Bali массаж в 4 руки двумя мастерами 60 минут, чайный релакс)', duration: '170 мин', price: '18 000 руб', category: 'Хаммам' },
        { name: 'Сила Природы (распаривание в бочке Здрава, скрабирование, антистресс массаж 60 минут, чайный релакс)', duration: '120 мин', price: '7 500 руб', category: 'С бочкой Здрава' },
        { name: 'Сила Природы + (распаривание в бочке Здрава, скрабирование, обертывание, антистресс массаж 60 минут, чайный релакс)', duration: '150 мин', price: '9 000 руб', category: 'С бочкой Здрава' },
        { name: 'Тайны Карельского камня (прогрев в ИК-сауне, омовение ног, антистресс массаж 60 минут + шунгит стоун терапия для спины 15 минут, чайный релакс)', duration: '130 мин', price: '7 000 руб', category: 'С инфракрасной сауной' },
        { name: 'Энергия Белого моря (прогрев в ИК-сауне, омовение ног, соляной пилинг, детокс обертывание 30 минут, массаж лица с нанесением маски для лица, чайный релакс)', duration: '140 мин', price: '7 200 руб', category: 'С инфракрасной сауной' }
    ],
    'spa-couple': [
        { name: 'Мерцание кувшинки (распаривание в бочке Фурако, антистресс массаж 45 минут, проработка спины аромамешочками 30 минут, чайный релакс)', duration: '130 мин', price: '14 500 руб', category: 'С бочкой Фурако' },
        { name: 'Сочный манго (распаривание в бочке Фурако, манговое скрабирование, антистресс массаж 45 минут «для нее», массаж лица 15 минут «для него», массаж стоп 15 минут, чайный релакс)', duration: '140 мин', price: '15 000 руб', category: 'С бочкой Фурако' },
        { name: 'Шоколадные берега (распаривание в бочке Фурако, шоколадное скрабирование, шоколадное обертывание, массаж спины 30 минут, чайный релакс)', duration: '140 мин', price: '13 000 руб', category: 'С бочкой Фурако' },
        { name: 'Северное равновесие (прогрев в ИК-сауне, омовение ног, антистресс массаж 45 минут + массаж лица 30 минут, чайный релакс)', duration: '140 мин', price: '14 000 руб', category: 'С инфракрасной сауной' },
        { name: 'Карельский Thai (прогрев в ИК-сауне, омовение ног, соляной пилинг, тайский aroma-oil массаж 60 минут, чайный релакс)', duration: '150 мин', price: '15 000 руб', category: 'С инфракрасной сауной' },
        { name: 'Райская лагуна (посещение Хаммама с бассейном 60 минут, массаж на выбор 60 минут, чайный релакс)', duration: '150 мин', price: '20 000 руб', category: 'Хаммам' },
        { name: 'Райская лагуна (посещение Хаммама с бассейном 60 минут, массаж на выбор 90 минут, чайный релакс)', duration: '180 мин', price: '22 000 руб', category: 'Хаммам' },
        { name: 'Пенное великолепие (парение в Хаммаме с посещением бассейна 45 минут, пилинг всего тела варежкой Кесе 15 минут и традиционный пенный массаж 15 минут поочередно, чайная пауза 15 минут, антистресс массаж 60 минут)', duration: '200 мин', price: '25 000 руб', category: 'Хаммам' },
        { name: 'Жемчужина LUMMEH (парение в Хаммаме с посещением бассейна, подача шампанского и сезонных фруктов 60 минут, кокосовое скрабирование поочередно, тайский aroma-oil массаж 60 минут, чайный релакс)', duration: '210 мин', price: '28 000 руб', category: 'Хаммам' }
    ],
    'spa-special': [
        { name: 'GIRL\'S POWER (посещение Хаммама с бассейном, предоставление скраба, чайный релакс с угощениями)', duration: '120 мин', price: '4 000 руб', note: 'Стоимость указана за 1 гостя, при посещении от 3-х человек. *скидка на массажи 10%', category: 'Девичники' },
        { name: 'Туристический экспресс (прогрев в ИК-сауне, омовение ног, массаж ног 30 минут, чайный релакс)', duration: '60 мин', price: '4 000 руб', category: 'Туристический СПА' },
        { name: 'Туристический релакс (распаривание в бочке Здрава 15 минут, масаж Royal Bali 45 минут, чайный релакс)', duration: '90 мин', price: '7 000 руб', category: 'Туристический СПА' },
        { name: 'Семейная идиллия (посещение Хаммама с бассейном 15 минут, традиционный пенный массаж поочередно 15 минут, массаж на выбор 60 минут, чайный релакс)', duration: '180 мин', price: '22 000 руб', note: '2 взрослых и 1 ребенок от 4 до 13 лет. *стоимость за 2-го ребенка + 3 000 руб.', category: 'Семейный СПА' }
    ],
    'additions': [
        { name: 'Стоун-терапия (шунгит, жадеит, базальт) 1 зона', duration: '30 мин', price: '2 000 руб' },
        { name: 'Хаммам (за 1 гостя, за каждого следующего 1 000 руб.)', duration: '30 мин', price: '3 000 руб' },
        { name: 'Массаж стоп', duration: '30 мин', price: '1 500 руб' },
        { name: 'Herbal массаж аромамешочками (на выбор спина/голова + лицо)', duration: '30 мин', price: '2 500 руб' },
        { name: 'Массаж лица/головы/спины+шеи', duration: '30 мин', price: '2 000 руб' },
        { name: 'Маска для лица', duration: '20 мин', price: '1 500 руб' },
        { name: 'Обертывание живыми водорослями', duration: '60 мин', price: '3 500 руб' },
        { name: 'Обертывание', duration: '30 мин', price: '2 000 руб' },
        { name: 'Скрабирование', duration: '30 мин', price: '2 000 руб' },
        { name: 'Пилинг варежкой Кесе (выполняется в Хаммаме)', duration: '15 мин', price: '3 000 руб' },
        { name: 'Пенный массаж (выполняется в Хаммаме)', duration: '15 мин', price: '3 000 руб' },
        { name: 'Инфракрасная сауна', duration: '15 мин', price: '2 000 руб' },
        { name: 'Фурако (японская купель с водой 38-41 C°)', duration: '15 мин', price: '2 500 руб' },
        { name: 'Здрава (аромасауна из кедра)', duration: '15 мин', price: '1 500 руб' },
        { name: 'Романтическая обстановка (сезонные фрукты, лепестки роз, свечи, шампанское в подарок)', duration: '', price: '5 000 руб' }
    ]
};

/**
 * Текущая выбранная категория фильтра
 */
let currentFilterCategory = 'all';

/**
 * Инициализация данных для модального окна услуг
 */
function initServicesModalData() {
    renderAllServices();
}

/**
 * Открытие модального окна с услугами
 */
function openServicesModal() {
    const modal = document.getElementById('servicesModal');
    const modalBody = document.getElementById('servicesModalBody');
    const serviceDetailView = document.getElementById('serviceDetailView');
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Сброс фильтра при открытии
        currentFilterCategory = 'all';
        filterServices('all');
        
        // Показываем список услуг, скрываем детальное окно
        if (modalBody) {
            modalBody.style.display = 'block';
        }
        if (serviceDetailView) {
            serviceDetailView.style.display = 'none';
        }
        selectedServiceData = null;
    }
}

/**
 * Закрытие модального окна
 */
function closeServicesModal() {
    const modal = document.getElementById('servicesModal');
    const modalBody = document.getElementById('servicesModalBody');
    const serviceDetailView = document.getElementById('serviceDetailView');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Сбрасываем вид
        if (modalBody) {
            modalBody.style.display = 'block';
        }
        if (serviceDetailView) {
            serviceDetailView.style.display = 'none';
        }
        selectedServiceData = null;
    }
}

/**
 * Обработчик закрытия модального окна по ESC
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('servicesModal');
        if (modal && modal.classList.contains('active')) {
            closeServicesModal();
        }
    }
});

/**
 * Фильтрация услуг по категории
 */
function filterServices(category) {
    currentFilterCategory = category;
    
    // Обновление активной кнопки фильтра
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Рендеринг отфильтрованных услуг
    renderAllServices();
    
    // Прокрутка к началу списка
    const modalBody = document.getElementById('servicesModalBody');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }
}

/**
 * Рендеринг всех услуг в модальном окне
 */
function renderAllServices() {
    const modalBody = document.getElementById('servicesModalBody');
    if (!modalBody) return;
    
    let html = '';
    
    if (currentFilterCategory === 'all') {
        // Показываем все категории
        Object.keys(allServicesData).forEach(category => {
            const categoryName = getCategoryName(category);
            html += `<div class="services-category-section">
                <h3 class="services-category-title">${categoryName}</h3>
                <div class="services-category-list">`;
            
            allServicesData[category].forEach((service) => {
                html += renderServiceItem(service, category);
            });
            
            html += `</div></div>`;
        });
    } else {
        // Показываем только выбранную категорию
        const categoryName = getCategoryName(currentFilterCategory);
        html += `<div class="services-category-section">
            <h3 class="services-category-title">${categoryName}</h3>
            <div class="services-category-list">`;
        
        if (allServicesData[currentFilterCategory]) {
            allServicesData[currentFilterCategory].forEach((service, index) => {
                html += renderServiceItem(service, currentFilterCategory);
            });
        }
        
        html += `</div></div>`;
    }
    
    modalBody.innerHTML = html;
}

/**
 * Получение названия категории
 */
function getCategoryName(category) {
    const names = {
        'all': 'Все услуги',
        'balinese': 'Традиционные балийские массажи',
        'thai': 'Традиционные тайские массажи',
        'european': 'Массаж от европейского мастера',
        'care': 'Уходовый комплекс на французской косметике',
        'figure': 'Массаж по коррекции фигуры',
        'children': 'Детские массажи',
        'other': 'Другие виды массажа',
        'spa-single': 'СПА программы для одного гостя',
        'spa-couple': 'СПА программы для двоих',
        'spa-special': 'Особые программы',
        'additions': 'Дополнения к программам'
    };
    return names[category] || category;
}

/**
 * Текущая выбранная услуга
 */
let selectedServiceData = null;

/**
 * Рендеринг одного элемента услуги
 */
function renderServiceItem(service, category = null) {
    const serviceJson = encodeURIComponent(JSON.stringify(service));
    let html = `<div class="service-modal-item" onclick="handleServiceClick('${serviceJson}')" style="cursor: pointer;">`;
    html += `<div class="service-modal-info">`;
    html += `<h4 class="service-modal-name">${service.name}</h4>`;
    if (service.age) {
        html += `<span class="service-modal-age">${service.age}</span>`;
    }
    if (service.category) {
        html += `<span class="service-modal-category">${service.category}</span>`;
    }
    if (service.note) {
        html += `<p class="service-modal-note">${service.note}</p>`;
    }
    html += `</div>`;
    html += `<div class="service-modal-price">`;
    if (service.duration) {
        html += `<span class="service-modal-duration">${service.duration}</span>`;
    }
    html += `<span class="service-modal-price-value">${service.price}</span>`;
    html += `</div>`;
    html += '</div>';
    return html;
}

/**
 * Обработчик клика на услугу
 */
function handleServiceClick(serviceJson) {
    try {
        const service = JSON.parse(decodeURIComponent(serviceJson));
        openServiceDetail(service);
    } catch (e) {
        console.error('Ошибка при открытии услуги:', e);
    }
}

/**
 * Открытие детального окна услуги
 */
function openServiceDetail(service) {
    selectedServiceData = service;
    const modalBody = document.getElementById('servicesModalBody');
    const serviceDetailView = document.getElementById('serviceDetailView');
    
    if (modalBody && serviceDetailView) {
        modalBody.style.display = 'none';
        serviceDetailView.style.display = 'block';
        
        // Заполняем детальное окно
        document.getElementById('serviceDetailTitle').textContent = service.name || '';
        document.getElementById('serviceDetailDuration').textContent = service.duration || 'Не указано';
        document.getElementById('serviceDetailPrice').textContent = service.price || 'Не указано';
        
        let description = '';
        if (service.age) {
            description += `<p><strong>Возраст:</strong> ${service.age}</p>`;
        }
        if (service.category) {
            description += `<p><strong>Категория:</strong> ${service.category}</p>`;
        }
        if (service.note) {
            description += `<p>${service.note}</p>`;
        }
        if (!description) {
            description = '<p>Описание услуги будет добавлено в ближайшее время.</p>';
        }
        
        document.getElementById('serviceDetailDescription').innerHTML = description;
        
        const noteElement = document.getElementById('serviceDetailNote');
        if (service.note && noteElement) {
            noteElement.textContent = service.note;
            noteElement.style.display = 'block';
        } else if (noteElement) {
            noteElement.style.display = 'none';
        }
    }
}

/**
 * Возврат к списку услуг
 */
function backToServicesList() {
    const modalBody = document.getElementById('servicesModalBody');
    const serviceDetailView = document.getElementById('serviceDetailView');
    
    if (modalBody && serviceDetailView) {
        serviceDetailView.style.display = 'none';
        modalBody.style.display = 'block';
        selectedServiceData = null;
    }
}

/**
 * Выбор услуги для бронирования
 */
function selectServiceForBooking() {
    if (!selectedServiceData) return;
    
    // Заполняем форму заявки
    const serviceSelectBtn = document.getElementById('serviceSelectBtn');
    const selectedServiceText = document.getElementById('selectedServiceText');
    const selectedServiceInput = document.getElementById('selectedServiceInput');
    const selectedServiceNameInput = document.getElementById('selectedServiceNameInput');
    const selectedServiceDurationInput = document.getElementById('selectedServiceDurationInput');
    const selectedServicePriceInput = document.getElementById('selectedServicePriceInput');
    
    if (serviceSelectBtn && selectedServiceText) {
        selectedServiceText.textContent = selectedServiceData.name || 'Услуга выбрана';
        serviceSelectBtn.classList.add('selected');
    }
    
    if (selectedServiceInput) {
        selectedServiceInput.value = selectedServiceData.name || '';
    }
    
    if (selectedServiceNameInput) {
        selectedServiceNameInput.value = selectedServiceData.name || '';
    }
    
    if (selectedServiceDurationInput) {
        selectedServiceDurationInput.value = selectedServiceData.duration || '';
    }
    
    if (selectedServicePriceInput) {
        selectedServicePriceInput.value = selectedServiceData.price || '';
    }
    
    // Закрываем модальное окно
    closeServicesModal();
    
    // Прокручиваем к форме
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    
    // Инициализируем данные для модального окна услуг
    initServicesModalData();
    
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

