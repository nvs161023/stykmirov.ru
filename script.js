document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Плавное появление элементов
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Эффект навигации при скролле
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Обработка отправки формы
    const form = document.getElementById('consultationForm');
    const modal = document.getElementById('successModal');
    
    form.addEventListener('submit', (e) => {
        setTimeout(() => {
            modal.classList.add('active');
            form.reset();
        }, 500); 
    });
});

// Функция закрытия модального окна
function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}