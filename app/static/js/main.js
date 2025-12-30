/**
 * Основной JavaScript для лендинга LUMMEH SPA POINT
 */

/**
 * Данные для программ и подарков
 */
const programsData = {
    gifts: [
        {
            name: 'Подарочные сертификаты',
            desc: 'Элитный подарок на любую сумму от 5 000 Р',
            price: 'от 5 000 Р',
            image: 'Gift1.jpg'
        },
        {
            name: 'Подарочный набор',
            desc: 'Комплект косметики и сертификат на услугу',
            price: 'от 8 000 Р',
            image: 'gift2.jpg'
        },
        {
            name: 'VIP сертификат',
            desc: 'Премиальный подарок на сумму от 15 000 Р',
            price: 'от 15 000 Р',
            image: 'gift3.jpg'
        }
    ],
    spa: [
        {
            name: 'Дыхание Карелии',
            desc: 'Стоун-терапия с ароматическим массажем',
            price: '12 000 Р',
            image: 'proccess1.jpg'
        },
        {
            name: 'Великолепие роскоши',
            desc: 'Уникальное spa-путешествие на двоих, 2.5 часа',
            price: '25 000 Р',
            image: 'procces2.jpg'
        },
        {
            name: 'Пенное великолепие',
            desc: 'Гармония хаммама и пенного массажа, 2 часа',
            price: '25 000 Р',
            image: 'proccess3.jpg'
        },
        {
            name: 'Роскошь Востока',
            desc: 'Тайский массаж и ароматерапия, 1.5 часа',
            price: '18 000 Р',
            image: 'proccess.jpg'
        }
    ],
    cosmetics: [
        {
            name: 'Набор эфирных масел',
            desc: 'Комплект масел doTerra для домашнего использования',
            price: '5 000 Р',
            image: 'Kosm.jpg'
        },
        {
            name: 'Уходовая косметика',
            desc: 'Премиальная линия по уходу за телом',
            price: 'от 3 500 Р',
            image: 'Kosm1.jpg'
        },
        {
            name: 'Подарочный набор косметики',
            desc: 'Эксклюзивный набор для домашнего спа',
            price: '7 000 Р',
            image: 'Kosm2.jpg'
        }
    ]
};

/**
 * Слайдер программ
 */
let currentSlide = 0;
let currentCategory = 'gifts';

function getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
        return 1;
    } else if (width <= 1024) {
        return 2;
    }
    return 3;
}

/**
 * Рендеринг карточек для текущей категории
 */
function renderProgramsCards() {
    const carousel = document.getElementById('programsCarousel');
    if (!carousel) return;
    
    const items = programsData[currentCategory] || [];
    carousel.innerHTML = '';
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.innerHTML = `
            <div class="program-icon">
                <img src="/static/images/Line.png" alt="">
            </div>
            <h3 class="program-name">${item.name}</h3>
            <div class="program-image">
                <img src="/static/images/${item.image}" alt="${item.name}" loading="lazy" decoding="async">
            </div>
            <p class="program-desc">${item.desc}</p>
            <p class="program-price">${item.price}</p>
            <button class="btn-secondary">Подробнее</button>
        `;
        carousel.appendChild(card);
    });
    
    // Сбрасываем слайдер
    currentSlide = 0;
    carousel.style.transform = 'translateX(0px)';
    updateIndicators();
    updateArrowButtons();
}

/**
 * Переключение категории
 */
function switchCategory(category) {
    currentCategory = category;
    currentSlide = 0;
    
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
 * Переключение слайдов
 */
function slidePrograms(direction) {
    const carousel = document.getElementById('programsCarousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.program-card');
    if (cards.length === 0) return;
    
    const totalSlides = cards.length;
    const slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, totalSlides - slidesPerView);
    
    if (direction === 'left') {
        currentSlide = Math.max(0, currentSlide - 1);
    } else {
        currentSlide = Math.min(maxSlide, currentSlide + 1);
    }
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 40;
    const offset = -currentSlide * (cardWidth + gap);
    carousel.style.transform = `translateX(${offset}px)`;
    
    updateIndicators();
    updateArrowButtons();
}

/**
 * Обновление индикаторов
 */
function updateIndicators() {
    const indicatorsContainer = document.getElementById('sliderIndicators');
    if (!indicatorsContainer) return;
    
    const carousel = document.getElementById('programsCarousel');
    const cards = carousel ? carousel.querySelectorAll('.program-card') : [];
    const totalSlides = cards.length;
    const slidesPerView = getSlidesPerView();
    const totalPages = Math.ceil(totalSlides / slidesPerView);
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        if (Math.floor(currentSlide / slidesPerView) === i) {
            indicator.classList.add('active');
        }
        indicatorsContainer.appendChild(indicator);
    }
}

/**
 * Обновление состояния кнопок стрелок
 */
function updateArrowButtons() {
    const carousel = document.getElementById('programsCarousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.program-card');
    const totalSlides = cards.length;
    const slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, totalSlides - slidesPerView);
    
    const leftBtn = document.getElementById('sliderArrowLeft');
    const rightBtn = document.getElementById('sliderArrowRight');
    
    if (leftBtn) {
        leftBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        leftBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
    }
    
    if (rightBtn) {
        rightBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
        rightBtn.style.pointerEvents = currentSlide >= maxSlide ? 'none' : 'auto';
    }
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
 * Данные об услугах для модального окна
 */
const servicesData = {
    1: {
        name: 'Авторский массаж',
        price: '5 000 Р',
        desc: 'Уникальная техника массажа',
        details: 'Авторский массаж от наших мастеров — это синтез тайских и балийских практик, адаптированный под индивидуальные потребности. Глубокое расслабление мышц, снятие напряжения и восстановление энергетического баланса.',
        icon: 'usliga1.png'
    },
    2: {
        name: 'Aroma Touch (doTerra)',
        price: '4 000 Р',
        desc: 'Массаж с эфирными маслами',
        details: 'Техника массажа с использованием сертифицированных эфирных масел doTerra. Комплексное воздействие на физическое и эмоциональное состояние через ароматерапию и тактильные практики.',
        icon: 'usluga2.png'
    },
    3: {
        name: 'Стоун-терапия',
        price: '2 000 Р',
        desc: '(жадеит, шунгит, базальт)',
        details: 'Терапия горячими и холодными камнями из натуральных минералов. Жадеит для омоложения, шунгит для детоксикации, базальт для глубокого прогревания. Восстанавливает энергетический баланс и снимает мышечное напряжение.',
        icon: 'usluga3.png'
    },
    4: {
        name: 'Тайский aroma oil массаж',
        price: '3 500–6 500 Р',
        desc: 'Классический тайский массаж',
        details: 'Традиционный тайский массаж с ароматическими маслами. Сочетание растяжек, надавливаний и работы с энергетическими линиями. Длительность и интенсивность подбираются индивидуально.',
        icon: 'usluga4.png'
    },
    5: {
        name: 'Массаж тающей свечой',
        price: '4 500–8 500 Р',
        desc: 'Роскошный массаж восковой свечой',
        details: 'Эксклюзивная процедура с использованием специальных массажных свечей из натурального воска и масел. Теплый воск создает неповторимое ощущение комфорта и глубокого расслабления.',
        icon: 'usluga5.png'
    },
    6: {
        name: 'Пенное великолепие',
        price: '25 000 Р',
        desc: '(программа)',
        details: 'Комплексная программа на 2 часа, включающая хаммам, пенный массаж, скрабирование и уходовые процедуры. Полное погружение в атмосферу роскоши и релаксации.',
        icon: 'usluga6.png'
    }
};

/**
 * Открытие модального окна услуги
 */
function openServiceModal(serviceId) {
    const modal = document.getElementById('serviceModal');
    const service = servicesData[serviceId];
    
    if (!modal || !service) return;
    
    // Заполняем данные
    document.getElementById('modalServiceName').textContent = service.name;
    document.getElementById('modalServicePrice').textContent = service.price;
    document.getElementById('modalServiceDesc').textContent = service.desc;
    document.getElementById('modalServiceDetails').textContent = service.details;
    document.getElementById('modalServiceIcon').src = `/static/images/${service.icon}`;
    
    // Находим исходную карточку для анимации
    const card = document.querySelector(`[data-service="${serviceId}"]`);
    if (card) {
        // Добавляем класс для отслеживания активной карточки
        card.classList.add('active-card');
        
        const rect = card.getBoundingClientRect();
        const modalContent = modal.querySelector('.service-modal-content');
        
        // Устанавливаем начальную позицию
        modalContent.style.left = rect.left + 'px';
        modalContent.style.top = rect.top + 'px';
        modalContent.style.width = rect.width + 'px';
        modalContent.style.height = rect.height + 'px';
        modalContent.style.transform = '';
        
        // Показываем модальное окно
        modal.classList.add('active');
        
        // Анимация расширения
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modalContent.style.left = '50%';
                modalContent.style.top = '50%';
                modalContent.style.width = '50%';
                modalContent.style.height = 'auto';
                modalContent.style.transform = 'translate(-50%, -50%)';
            });
        });
    } else {
        modal.classList.add('active');
    }
}

/**
 * Закрытие модального окна
 */
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.service-modal-content');
    
    // Анимация закрытия - возвращаем к исходной позиции карточки
    if (modalContent) {
        const card = document.querySelector('.service-card.active-card');
        if (card) {
            const rect = card.getBoundingClientRect();
            modalContent.style.left = rect.left + 'px';
            modalContent.style.top = rect.top + 'px';
            modalContent.style.width = rect.width + 'px';
            modalContent.style.height = rect.height + 'px';
            modalContent.style.transform = '';
        }
    }
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        if (modalContent) {
            modalContent.style.left = '';
            modalContent.style.top = '';
            modalContent.style.width = '';
            modalContent.style.height = '';
            modalContent.style.transform = '';
        }
        // Убираем класс active-card с карточки
        const activeCard = document.querySelector('.service-card.active-card');
        if (activeCard) {
            activeCard.classList.remove('active-card');
        }
    }, 500);
}

/**
 * Инициализация при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function() {
    initAtmosphereHover();
    
    // Инициализация слайдера программ
    renderProgramsCards();
    
    // Обработчики для табов
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-tab');
            if (category) {
                switchCategory(category);
            }
        });
    });
    
    // Обработчики для стрелок слайдера
    const leftBtn = document.getElementById('sliderArrowLeft');
    const rightBtn = document.getElementById('sliderArrowRight');
    
    if (leftBtn) {
        leftBtn.addEventListener('click', () => slidePrograms('left'));
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', () => slidePrograms('right'));
    }
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', function() {
        renderProgramsCards();
    });
    
    // Обработчики для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            if (serviceId) {
                openServiceModal(parseInt(serviceId));
            }
        });
    });
    
    // Закрытие модального окна
    const modalClose = document.getElementById('serviceModalClose');
    const modal = document.getElementById('serviceModal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeServiceModal);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.service-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeServiceModal);
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeServiceModal();
            }
        });
    }
    
    window.addEventListener('resize', function() {
        currentSlide = 0;
        const carousel = document.getElementById('programsCarousel');
        if (carousel) {
            carousel.style.transform = 'translateX(0px)';
        }
        updateIndicators();
    });
});

