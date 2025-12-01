document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup the star container inside the main space-bg
    const spaceBg = document.getElementById('space-bg');
    const starBackground = document.createElement('div');
    starBackground.id = 'star-background';
    spaceBg.appendChild(starBackground);
    
    const numStars = 150; 

    // 2. Generate and append stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;

        // Random size and opacity
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = Math.random() * 0.9 + 0.1;

        // Random animation duration and delay for the twinkling effect
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;

        starBackground.appendChild(star);
    }
    
    // 3. Add CSS for the generated stars dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .star {
            position: absolute;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
            /* Only twinkle animation remains */
            animation-name: twinkle; 
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            animation-duration: var(--animation-duration, 2s);
        }

        @keyframes twinkle {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);
});
