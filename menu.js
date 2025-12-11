document.addEventListener('DOMContentLoaded', () => {

    const spaceBg = document.getElementById('space-bg');
    
    // --- 0. Setup New Animation Containers ---
    let starBackground = document.getElementById('star-background');
    if (!starBackground) {
        starBackground = document.createElement('div');
        starBackground.id = 'star-background';
        spaceBg.appendChild(starBackground);
    }

    const iconOverlay = document.getElementById('icon-overlay');
    const networkOverlay = document.getElementById('network-overlay');
    
    // --- NEW: Staggered Menu Card Entry ---
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        // Apply the card-entry animation with a delay based on its index
        const delay = 500 + (index * 150); // Start after 500ms, then 150ms delay for each card
        
        card.style.animation = `card-entry 0.6s ease-out forwards ${delay}ms, 
                                wave-motion 6s infinite ease-in-out alternate, 
                                menu-glow 2s infinite ease-in-out alternate`;
        
        // Ensure the entry animation is applied only once
        card.style.opacity = 1; // Set final state opacity
        card.style.transform = 'scale(1)'; // Set final state scale
    });

    // --- 1. Star Background Generation ---
    const numStars = 150;   
    for (let i = 0; i < numStars; i++) {  
        const star = document.createElement('div');  
        star.className = 'star';  
        star.style.left = `${Math.random() * 100}vw`;  
        star.style.top = `${Math.random() * 100}vh`;  
        const size = Math.random() * 2 + 1;  
        star.style.width = `${size}px`;  
        star.style.height = `${size}px`;  
        star.style.opacity = Math.random() * 0.9 + 0.1;  
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;  
        star.style.animationDelay = `${Math.random() * 5}s`;  
        starBackground.appendChild(star);  
    }  
      
    // Inject Star CSS (Necessary if not in main CSS)
    if (!document.querySelector('style#star-styles')) {
        const style = document.createElement('style');  
        style.id = 'star-styles';
        style.innerHTML = `  
            .star { position: absolute; background: #fff; border-radius: 50%; box-shadow: 0 0 3px rgba(255, 255, 255, 0.7); animation-name: twinkle; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: alternate; }  
            @keyframes twinkle { 0% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.5); opacity: 0.9; } 100% { transform: scale(1); opacity: 0.4; } }  
        `;  
        document.head.appendChild(style);
    }

    // --- 2. Generate Meteor Shower ---
    const numMeteors = 5;
    for (let i = 0; i < numMeteors; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = `${Math.random() * 50}vw`;
        meteor.style.top = `${Math.random() * 50}vh - 100px`;
        meteor.style.animationDuration = `${Math.random() * 10 + 8}s`; 
        meteor.style.animationDelay = `${Math.random() * 15}s`; 
        spaceBg.appendChild(meteor);
    }
    
    // --- 3. Generate Floating Icons ---
    function generateFloatingIcons() {
        const iconClasses = [
            'fas fa-chart-line', 'fas fa-wallet', 'fas fa-lightbulb', 'fas fa-lock', 'fas fa-microchip',
        ];
        
        const numIcons = 10;
        for (let i = 0; i < numIcons; i++) {
            const icon = document.createElement('i');
            icon.className = `floating-icon ${iconClasses[Math.floor(Math.random() * iconClasses.length)]}`;
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.top = `${Math.random() * 100}vh`;
            icon.style.animationDuration = `${Math.random() * 30 + 15}s`;
            icon.style.animationDelay = `${Math.random() * 15}s`;
            
            iconOverlay.appendChild(icon);
        }
    }
    generateFloatingIcons();

    // --- 4. Generate Network Model ---
    function generateNetworkModel() {
        if (!networkOverlay) return; 
        const numDots = 15;
        const dots = [];
        const containerRect = networkOverlay.getBoundingClientRect();

        // 1. Create Dots at random positions
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'network-dot';

            dot.x = 10 + Math.random() * 80;
            dot.y = 10 + Math.random() * 80;

            dot.style.left = `${dot.x}%`;
            dot.style.top = `${dot.y}%`;
            dot.style.animationDelay = `${Math.random() * 2}s`;

            networkOverlay.appendChild(dot);
            dots.push(dot);
        }

        // 2. Connect Dots with Lines (if close enough)
        const maxDistanceSq = 3000; 

        for (let i = 0; i < numDots; i++) {
            for (let j = i + 1; j < numDots; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq < maxDistanceSq) {
                    const line = document.createElement('div');
                    line.className = 'network-line';
                    
                    const distance = Math.sqrt(distanceSq);
                    const angle = Math.atan2(dy, dx);

                    line.style.left = dots[i].style.left;
                    line.style.top = dots[i].style.top;
                    
                    line.style.width = `${distance * (containerRect.width / 100)}px`;
                    line.style.transform = `rotate(${angle + Math.PI}rad)`; 
                    line.style.animationDelay = `${Math.random() * 3}s`;

                    networkOverlay.appendChild(line);
                }
            }
        }
    }
    setTimeout(generateNetworkModel, 100); 

    // --- 5. Coin Counter Logic (Claim Functionality) ---
    const coinValueElement = document.getElementById('coin-value');
    let coinCount = parseInt(coinValueElement.textContent);

    window.addCoins = (amount) => {
        coinCount += amount;
        coinValueElement.textContent = coinCount;
        
        coinValueElement.classList.add('coin-update-pulse');
        setTimeout(() => {
            coinValueElement.classList.remove('coin-update-pulse');
        }, 500);
    };

    // Inject Coin Pulse CSS (if needed)
    if (!document.querySelector('style#coin-pulse-styles')) {
        const coinPulseStyle = document.createElement('style');
        coinPulseStyle.id = 'coin-pulse-styles';
        coinPulseStyle.innerHTML = `
            .coin-update-pulse { animation: pulse-shine 0.5s ease-out; }
            @keyframes pulse-shine {
                0% { transform: scale(1); text-shadow: 0 0 5px var(--coin-gold); }
                50% { transform: scale(1.2); text-shadow: 0 0 20px var(--coin-gold); }
                100% { transform: scale(1); text-shadow: 0 0 5px var(--coin-gold); }
            }
        `;
        document.head.appendChild(coinPulseStyle);
    }

    // Test Claim: Simulates claiming the daily reward (100 coins)
    setTimeout(() => {
        console.log("Simulating Daily Reward Claim: +100 T-Coins");
        addCoins(100); 
    }, 5000);


    // --- 6. Water Ripple Effect on Click ---
    document.body.addEventListener('click', (event) => {
        if (event.target.closest('#space-bg')) return; 

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        // Centering the 20px ripple
        ripple.style.left = `${event.clientX - 10}px`;
        ripple.style.top = `${event.clientY - 10}px`;
        
        document.body.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});
