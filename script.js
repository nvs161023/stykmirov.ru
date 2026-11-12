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
    
    if (form) {
        form.addEventListener('submit', (e) => {
            setTimeout(() => {
                modal.classList.add('active');
                form.reset();
            }, 500); 
        });
    }

    // 4. Работа мобильного бургер-меню
    const burger = document.getElementById("burger-menu");
    const navLinks = document.getElementById("nav-links");

    if (burger) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    if (navLinks) {
        const menuItems = navLinks.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                burger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // 5. АВТОМАТИЧЕСКАЯ ЗАГРУЗКА СТАТЕЙ ИЗ JSON
    async function loadArticles() {
        const container = document.getElementById('blog-container');
        if (!container) return; // Если блока нет на странице, ничего не делаем

        try {
            const response = await fetch('articles.json');
            const articles = await response.json();

            articles.forEach(article => {
                const cardHTML = `
                    <a href="${article.link}" class="blog-card">
                        <div class="blog-card-img">
                            <img src="${article.img}" alt="${article.title}">
                        </div>
                        <div class="blog-card-content">
                            <span class="blog-category">${article.category}</span>
                            <h3>${article.title}</h3>
                            <p>${article.desc}</p>
                            <span class="blog-read-more">Читать статью &rarr;</span>
                        </div>
                    </a>
                `;
                container.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error('Ошибка при загрузке статей:', error);
            container.innerHTML = '<p style="text-align:center; width:100%;">Не удалось загрузить статьи.</p>';
        }
    }

    loadArticles();
});

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}