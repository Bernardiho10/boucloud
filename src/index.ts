document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer for appear-on-scroll animations (two-way)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('exit');
            } else {
                // Determine if it should "exit" (slide up) or just hide
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

    // Email Capture Logic
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement;
    const statusMsg = document.getElementById('status-msg') as HTMLDivElement;

    if (emailInput && subscribeBtn && statusMsg) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                subscribeBtn.disabled = true;
                const originalText = subscribeBtn.innerText;
                subscribeBtn.innerText = 'Syncing...';

                setTimeout(() => {
                    subscribeBtn.innerText = 'Reserved';
                    subscribeBtn.classList.replace('bg-blue-600', 'bg-bou-green');
                    
                    statusMsg.style.opacity = '1';
                    statusMsg.classList.add('text-bou-green');
                    statusMsg.innerText = "You're on the list. Welcome to BouCloud.";
                    
                    emailInput.value = '';
                    emailInput.disabled = true;
                }, 1200);
            } else {
                statusMsg.innerText = 'Valid enterprise email required.';
                statusMsg.style.opacity = '1';
                statusMsg.classList.add('text-red-400');
                
                emailInput.classList.add('shake');
                setTimeout(() => emailInput.classList.remove('shake'), 500);
                
                setTimeout(() => {
                    statusMsg.style.opacity = '0';
                    setTimeout(() => {
                        statusMsg.innerText = "Reserved for early access.";
                        statusMsg.classList.remove('text-red-400');
                    }, 300);
                }, 3000);
            }
        });
    }

    function validateEmail(email: string) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
});
