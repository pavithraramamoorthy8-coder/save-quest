document.addEventListener('DOMContentLoaded', () => {

    const spaceBg = document.getElementById('space-bg');
    
    // --- UTILITY: Shuffle Array (Needed for option randomization if we use it) ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- ANIMATION 1: Star Background Generation ---
    function injectStarBackground() {
        // Star styles (CSS classes) are defined in literacy.css
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 2 + 1}px;
                height: ${Math.random() * 2 + 1}px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                opacity: ${Math.random() * 0.9 + 0.1};
                animation-name: twinkle;
                animation-duration: ${Math.random() * 3 + 1}s;
                animation-delay: ${Math.random() * 5}s;
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
                animation-direction: alternate;
            `;
            spaceBg.appendChild(star);
        }

        // Inject the required Star CSS keyframe definition if it somehow wasn't loaded
        if (!document.querySelector('style#star-styles')) {
            const style = document.createElement('style');  
            style.id = 'star-styles';
            style.innerHTML = `  
                @keyframes twinkle { 0% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.5); opacity: 0.9; } 100% { transform: scale(1); opacity: 0.4; } }  
            `;  
            document.head.appendChild(style);
        }
    }
    
    // --- ANIMATION 2: Water Ripple Effect on Click ---
    document.body.addEventListener('click', (event) => {
        // Prevent ripple on the cards themselves to avoid interfering with the card burst
        if (event.target.closest('.game-card') || event.target.closest('#space-bg')) return; 

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${event.clientX - 10}px`;
        ripple.style.top = `${event.clientY - 10}px`;
        
        document.body.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });

    // Inject Ripple CSS
    if (!document.querySelector('style#ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-styles';
        rippleStyle.innerHTML = `
            .ripple-effect {
                position: absolute; width: 20px; height: 20px; background: radial-gradient(circle, rgba(26, 174, 176, 0.8) 0%, rgba(26, 174, 176, 0.0) 70%); 
                border-radius: 50%; transform: scale(0); pointer-events: none; z-index: 5; animation: ripple-grow 1s ease-out; filter: drop-shadow(0 0 10px var(--bg3));
            }
            @keyframes ripple-grow { to { transform: scale(50); opacity: 0; } }
        `;
        document.head.appendChild(rippleStyle);
    }


    // --- ANIMATION 3: Intercept Card Clicks for Energy Burst Transition ---
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const targetUrl = card.getAttribute('href'); 
        
        card.addEventListener('click', function(event) {
            event.preventDefault(); // STOP immediate navigation

            // 1. Create the energy burst element
            const burst = document.createElement('div');
            burst.className = 'energy-burst-effect';
            
            // Get the card's custom color property
            const cardColor = card.style.getPropertyValue('--card-color');
            burst.style.setProperty('--card-color', cardColor);
            
            card.appendChild(burst);

            // 2. Apply the animation
            burst.style.animation = 'energy-burst 0.5s ease-out forwards';

            // 3. Navigate after the animation finishes
            setTimeout(() => {
                window.location.href = targetUrl || '#'; 
            }, 500); // 500ms matches the animation duration
            
        });
    });
    
    // Initialize background stars
    injectStarBackground();
});
