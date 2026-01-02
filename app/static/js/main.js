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
    
    // Инициализация программ
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
    
});

