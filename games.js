document.addEventListener('DOMContentLoaded', () => {

    const spaceBg = document.getElementById('space-bg');
    
    // --- 1. Star Background Generation ---
    let starBackground = document.getElementById('star-background');
    if (!starBackground) {
        starBackground = document.createElement('div');
        starBackground.id = 'star-background';
        spaceBg.appendChild(starBackground);
    }

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
    
    // --- 2. Water Ripple Effect on Click ---
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

    // Inject Ripple CSS (if not in main CSS)
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
});
