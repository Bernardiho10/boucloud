document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement;
    const statusMsg = document.getElementById('status-msg') as HTMLDivElement;

    if (!emailInput || !subscribeBtn || !statusMsg) return;

    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            // Simulate API call
            subscribeBtn.disabled = true;
            subscribeBtn.innerText = 'Sending...';

            setTimeout(() => {
                subscribeBtn.innerText = 'Thank You!';
                subscribeBtn.classList.replace('bg-blue-600', 'bg-bou-green');
                
                statusMsg.style.opacity = '1';
                statusMsg.classList.add('text-bou-green');
                
                emailInput.value = '';
                emailInput.disabled = true;
            }, 800);
        } else {
            statusMsg.innerText = 'Please enter a valid email address.';
            statusMsg.style.opacity = '1';
            statusMsg.classList.add('text-red-400');
            
            emailInput.classList.add('ring-2', 'ring-red-400');
            
            setTimeout(() => {
                statusMsg.style.opacity = '0';
                emailInput.classList.remove('ring-2', 'ring-red-400');
                setTimeout(() => {
                    statusMsg.innerText = "Thanks! We'll stay in touch.";
                    statusMsg.classList.remove('text-red-400');
                }, 300);
            }, 3000);
        }
    });

    function validateEmail(email: string) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
});
