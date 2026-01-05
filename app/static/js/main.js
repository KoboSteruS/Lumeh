/**
 * Основной JavaScript для лендинга LUMMEH SPA POINT
 */

/**
 * Данные для программ и подарков
 */
const programsData = {
    programs: [
        {
            name: 'Дыхание Карелии',
            desc: 'Авторская программа, сочетающая целебные карельские травы и восточные массажные техники',
            duration: '120 мин',
            price: '8 500 ₽',
            includes: ['Массаж всего тела', 'Ароматерапия', 'Травяной чай', 'Релаксация'],
            image: 'proccess1.jpg'
        },
        {
            name: 'Великолепие роскоши',
            desc: 'Премиум spa-программа с эксклюзивными процедурами для полного восстановления',
            duration: '180 мин',
            price: '12 000 ₽',
            includes: ['Стоун-терапия', 'Массаж лица', 'Пилинг тела', 'Шампанское'],
            image: 'procces2.jpg'
        },
        {
            name: 'Пенное великолепие',
            desc: 'Экзотическая процедура в облаке ароматной пены для абсолютного наслаждения',
            duration: '90 мин',
            price: '5 500 ₽',
            includes: ['Пенный массаж', 'Масло-массаж', 'Ароматерапия'],
            image: 'proccess3.jpg'
        }
    ],
    gifts: [
        {
            name: 'Подарочный сертификат 5000₽',
            desc: 'Идеальный подарок для близких на любой случай',
            price: '5 000 ₽',
            image: 'Gift1.jpg'
        },
        {
            name: 'Подарочный сертификат 10000₽',
            desc: 'Полноценная spa-программа в подарок',
            price: '10 000 ₽',
            image: 'gift2.jpg'
        },
        {
            name: 'Индивидуальный сертификат',
            desc: 'Создайте уникальный подарок на любую сумму',
            price: 'от 3 000 ₽',
            image: 'gift3.jpg'
        }
    ],
    cosmetics: [
        {
            name: 'Массажные масла',
            desc: 'Премиальные натуральные масла для домашнего использования',
            price: 'от 1 500 ₽',
            image: 'Kosm.jpg'
        },
        {
            name: 'Ароматические свечи',
            desc: 'Авторские свечи с натуральными эфирными маслами',
            price: 'от 800 ₽',
            image: 'Kosm1.jpg'
        },
        {
            name: 'Травяные сборы',
            desc: 'Карельские травы для чая и ванн',
            price: 'от 600 ₽',
            image: 'Kosm2.jpg'
        }
    ]
};

/**
 * Переменные для программ
 */
let currentCategory = 'programs';

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
        
        let cardContent = `
            <div class="program-icon-wrapper">
                ${iconSvg}
            </div>
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
                <button class="program-btn">${currentCategory === 'gifts' || currentCategory === 'cosmetics' ? 'Купить' : 'Выбрать'}</button>
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
 * Данные об услугах для модального окна
 */
const servicesData = {
    1: {
        name: 'Авторский массаж',
        duration: '60-90 мин',
        price: 'от 3 500 ₽',
        desc: 'Уникальная техника, сочетающая восточные и европейские практики для глубокого расслабления. Авторский массаж от наших мастеров — это синтез тайских и балийских практик, адаптированный под индивидуальные потребности. Глубокое расслабление мышц, снятие напряжения и восстановление энергетического баланса.'
    },
    2: {
        name: 'Стоун-терапия',
        duration: '90 мин',
        price: 'от 4 200 ₽',
        desc: 'Массаж горячими камнями для улучшения кровообращения и снятия мышечного напряжения. Терапия горячими и холодными камнями из натуральных минералов (жадеит, шунгит, базальт). Жадеит для омоложения, шунгит для детоксикации, базальт для глубокого прогревания. Восстанавливает энергетический баланс и снимает мышечное напряжение.'
    },
    3: {
        name: 'Aroma Touch',
        duration: '60 мин',
        price: 'от 3 800 ₽',
        desc: 'Ароматерапевтический массаж с эфирными маслами для гармонии тела и души. Техника массажа с использованием сертифицированных эфирных масел doTerra. Комплексное воздействие на физическое и эмоциональное состояние через ароматерапию и тактильные практики.'
    },
    4: {
        name: 'Тайский aroma oil массаж',
        duration: '90 мин',
        price: 'от 4 500 ₽',
        desc: 'Традиционная тайская техника с использованием ароматических масел. Сочетание растяжек, надавливаний и работы с энергетическими линиями. Длительность и интенсивность подбираются индивидуально для максимального эффекта расслабления и восстановления.'
    },
    5: {
        name: 'Массаж тающей свечой',
        duration: '75 мин',
        price: 'от 4 000 ₽',
        desc: 'Роскошный массаж теплым маслом из натуральной свечи для нежности кожи. Эксклюзивная процедура с использованием специальных массажных свечей из натурального воска и масел. Теплый воск создает неповторимое ощущение комфорта и глубокого расслабления.'
    },
    6: {
        name: 'Пенное великолепие',
        duration: '90 мин',
        price: 'от 5 500 ₽',
        desc: 'Экзотический массаж в облаке ароматной пены для полного блаженства. Комплексная программа, включающая пенный массаж, скрабирование и уходовые процедуры. Полное погружение в атмосферу роскоши и релаксации.'
    }
};

/**
 * Хаотичное расположение карточек услуг
 */
function arrangeServiceCards(cards) {
    const container = document.querySelector('.services-grid');
    if (!container) return;
    
    const containerWidth = container.offsetWidth || 1400;
    const containerHeight = 1000;
    const cardWidth = 650;
    const cardHeight = 320;
    
    // Позиции для хаотичного расположения (как визитки на столе)
    const positions = [
        { left: '5%', top: '10%', rotation: -5 },
        { left: '25%', top: '5%', rotation: 8 },
        { left: '50%', top: '8%', rotation: -3 },
        { left: '70%', top: '12%', rotation: 12 },
        { left: '15%', top: '45%', rotation: -8 },
        { left: '60%', top: '50%', rotation: 6 }
    ];
    
    cards.forEach((card, index) => {
        if (positions[index]) {
            const pos = positions[index];
            card.style.left = pos.left;
            card.style.top = pos.top;
            card.style.transform = `rotate(${pos.rotation}deg)`;
            card.style.zIndex = index + 1;
        } else {
            // Для дополнительных карточек - случайное расположение
            const randomLeft = Math.random() * (containerWidth - cardWidth);
            const randomTop = Math.random() * (containerHeight - cardHeight);
            const randomRotation = (Math.random() - 0.5) * 15; // от -7.5 до 7.5 градусов
            
            card.style.left = randomLeft + 'px';
            card.style.top = randomTop + 'px';
            card.style.transform = `rotate(${randomRotation}deg)`;
            card.style.zIndex = index + 1;
        }
    });
}

/**
 * Открытие модального окна услуги
 */
function openServiceModal(serviceId) {
    const modal = document.getElementById('serviceModal');
    const service = servicesData[serviceId];
    
    if (!modal || !service) return;
    
    // Заполняем данные
    document.getElementById('modalServiceName').textContent = service.name;
    document.getElementById('modalDuration').textContent = service.duration;
    document.getElementById('modalServicePrice').textContent = service.price;
    document.getElementById('modalServiceDesc').textContent = service.desc;
    
    // Находим карточку
    const card = document.querySelector(`[data-service="${serviceId}"]`);
    if (!card) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }
    
    // Получаем позицию карточки
    const cardRect = card.getBoundingClientRect();
    const cardClone = card.cloneNode(true);
    cardClone.style.position = 'fixed';
    cardClone.style.top = cardRect.top + 'px';
    cardClone.style.left = cardRect.left + 'px';
    cardClone.style.width = cardRect.width + 'px';
    cardClone.style.height = cardRect.height + 'px';
    cardClone.style.zIndex = '9999';
    cardClone.style.pointerEvents = 'none';
    cardClone.style.margin = '0';
    cardClone.style.opacity = '1';
    cardClone.classList.add('service-card-flying');
    
    // Делаем оригинальную карточку невидимой
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';
    
    // Добавляем клон в body
    document.body.appendChild(cardClone);
    
    // Вычисляем центр экрана
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const targetWidth = 600;
    const targetHeight = 400;
    
    // Запускаем анимацию вылета
    requestAnimationFrame(() => {
        cardClone.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        cardClone.style.top = (centerY - targetHeight / 2) + 'px';
        cardClone.style.left = (centerX - targetWidth / 2) + 'px';
        cardClone.style.width = targetWidth + 'px';
        cardClone.style.height = targetHeight + 'px';
        cardClone.style.transform = 'scale(1.2)';
        cardClone.style.opacity = '0';
    });
    
    // Показываем модальное окно раньше, до завершения анимации карточки
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 150);
    
    // Удаляем клон карточки после завершения анимации
    setTimeout(() => {
        cardClone.remove();
        card.style.opacity = '1';
        card.style.pointerEvents = '';
    }, 400);
}

/**
 * Закрытие модального окна
 */
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
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
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString('ru-RU');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('ru-RU');
                    }
                };
                
                updateCounter();
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Инициализация при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Обработчики для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    arrangeServiceCards(serviceCards);
    
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
    
});

