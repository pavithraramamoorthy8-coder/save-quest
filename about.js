document.addEventListener('DOMContentLoaded', () => {

    // STARFIELD BACKGROUND INJECTION
    const spaceBg = document.getElementById('space-bg');
    
    function injectStarBackground() {
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
    }
    injectStarBackground();
});
