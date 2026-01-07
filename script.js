document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Carousel Logic
    const track = document.getElementById('carouselTrack');
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        let carouselInterval = setInterval(nextSlide, 4000);

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(nextSlide, 4000);
            });
        }
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);

            if (targetContent) {
                window.scrollTo({
                    top: targetContent.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
