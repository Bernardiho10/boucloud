document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise Canvas Particle Engine
    initParticles();

    // 2. Reveal Observer for appear-on-scroll animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('exit');
            } else {
                if (entry.boundingClientRect.top < 0) {
                    entry.target.classList.add('exit');
                } else {
                    entry.target.classList.remove('active');
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Email Capture Logic
    setupEmailCapture();
});

/**
 * Particle Engine - Canvas Implementation
 * Industry-standard performance with 0 dependencies
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
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
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
            ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`; // Bou Blue
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const init = () => {
        particles = [];
        const count = Math.min(Math.floor((w * h) / 10000), 100);
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

/**
 * Email Capture Feedback & Logic
 */
function setupEmailCapture() {
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement;
    const statusMsg = document.getElementById('status-msg') as HTMLDivElement;

    if (emailInput && subscribeBtn && statusMsg) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                subscribeBtn.disabled = true;
                subscribeBtn.innerText = 'Syncing...';

                setTimeout(() => {
                    subscribeBtn.innerText = 'Reserved';
                    subscribeBtn.style.backgroundColor = '#10A500'; // Bou Green
                    
                    statusMsg.style.opacity = '1';
                    statusMsg.innerText = "Welcome to the future of cloud.";
                }, 1200);
            } else {
                statusMsg.innerText = 'Enterprise email required.';
                statusMsg.style.opacity = '1';
                statusMsg.style.color = '#ef4444';
                
                setTimeout(() => {
                    statusMsg.style.opacity = '0';
                }, 3000);
            }
        });
    }
}

function validateEmail(email: string) {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
