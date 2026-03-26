document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 208, 255, 0.66)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();


const langToggle = document.getElementById('langToggle');
    const typerEl = document.getElementById('typewriter');
    let currentLang = 'vi';
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    let timeoutId;

    function typeEffect() {
        const words = typerEl.getAttribute(`data-${currentLang}`).split(',');
        const currentWord = words[wordIdx];
        
        typerEl.textContent = isDeleting 
            ? currentWord.substring(0, charIdx--) 
            : currentWord.substring(0, charIdx++);

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx > currentWord.length) {
            isDeleting = true; speed = 2000;
        } else if (isDeleting && charIdx < 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 500;
        }
        timeoutId = setTimeout(typeEffect, speed);
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'vi' ? 'ja' : 'vi';
        langToggle.textContent = currentLang === 'vi' ? 'JP' : 'VN';
        
        // Cập nhật text tĩnh
        document.querySelectorAll('[data-vi]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });

        // Reset Typewriter
        clearTimeout(timeoutId);
        wordIdx = 0; charIdx = 0; isDeleting = false;
        typeEffect();
    });

    typeEffect(); 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // 4. Tilt Effect cho các card kỹ năng
    document.querySelectorAll('.tilt').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translateZ(5px)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = `none`);
    });
});