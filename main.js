/**
 * Mirable Main Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Language Detection & Manual Toggle
    const html = document.documentElement;
    const langToggle = document.getElementById('lang-toggle');
    
    // Detect Language
    let userLang = localStorage.getItem('mirable-lang') || navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ko')) {
        html.lang = 'ko';
    } else {
        html.lang = 'en';
    }

    // Toggle Click Event
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = html.lang === 'ko' ? 'en' : 'ko';
            html.lang = newLang;
            localStorage.setItem('mirable-lang', newLang);
        });
    }

    // 1. Hero Animations on Load
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');

    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
    }, 300);

    setTimeout(() => {
        heroDesc.style.opacity = '1';
        heroDesc.style.transform = 'translateY(0)';
        heroDesc.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
    }, 600);

    // 2. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // 한 번 나타나면 감시 중단
            }
        });
    }, {
        threshold: 0.15 // 15% 정도 보일 때 애니메이션 시작
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Mouse Interaction for Pearl Texture (Subtle Depth)
    const pearlTexture = document.querySelector('.pearl-texture');
    if (pearlTexture) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 30;
            
            // 자개 텍스처의 위치를 미세하게 조정하여 빛의 반사각 변화 시뮬레이션
            pearlTexture.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        });
    }

    // 4. Smooth Scroll for Navigation (Optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
