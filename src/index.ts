document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise Canvas Particle Engine (High Intensity)
    initParticles();

    // 2. Clear Sky Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('exit');
                
                // Trigger background lazy-load
                const bg = entry.target.querySelector('.section-bg');
                if (bg) bg.classList.add('visible');
            } else {
                if (entry.boundingClientRect.top < 0) {
                    entry.target.classList.add('exit');
                } else {
                    entry.target.classList.remove('active');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    document.querySelectorAll('.snap-section').forEach(el => revealObserver.observe(el));

    // 3. Email Registry Logic
    setupEmailRegistry();
});

/**
 * Particle Engine - High Contrast Edition
 * Darker Sky-blue particles (#0284C7) for high visibility on light backgrounds.
 */
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let w: number, h: number;

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = w;
            if (this.x > w) this.x = 0;
            if (this.y < 0) this.y = h;
            if (this.y > h) this.y = 0;
        }

        draw() {
            if (!ctx) return;
            // High Visibility Blue particles
            ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const init = () => {
        particles = [];
        const count = Math.min(Math.floor((w * h) / 8000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    init();
    animate();
}

function setupEmailRegistry() {
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement;
    const statusMsg = document.getElementById('status-msg') as HTMLDivElement;

    if (emailInput && subscribeBtn && statusMsg) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (!email) return;

            subscribeBtn.disabled = true;
            subscribeBtn.innerText = 'Syncing Entry...';

            setTimeout(() => {
                subscribeBtn.innerText = 'Initialized';
                subscribeBtn.style.backgroundColor = '#10A500'; // BOU Green
                statusMsg.style.opacity = '1';
                statusMsg.classList.add('translate-y-0');
            }, 1000);
        });
    }
}
