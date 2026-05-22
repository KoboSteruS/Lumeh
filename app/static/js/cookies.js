/**
 * Баннер согласия на использование cookies
 */
(function () {
    var STORAGE_KEY = 'lumeh_cookie_consent';
    var banner = document.getElementById('cookieBanner');
    var btnAll = document.getElementById('cookieAcceptAll');
    var btnNecessary = document.getElementById('cookieAcceptNecessary');

    if (!banner) {
        return;
    }

    function getConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function setConsent(level) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    level: level,
                    at: new Date().toISOString()
                })
            );
        } catch (e) {
            /* localStorage недоступен */
        }
        banner.hidden = true;
        document.body.classList.remove('cookie-banner-visible');
    }

    function showBanner() {
        banner.hidden = false;
        document.body.classList.add('cookie-banner-visible');
    }

    if (!getConsent()) {
        showBanner();
    }

    if (btnAll) {
        btnAll.addEventListener('click', function () {
            setConsent('all');
        });
    }

    if (btnNecessary) {
        btnNecessary.addEventListener('click', function () {
            setConsent('necessary');
        });
    }
})();
