document.addEventListener('DOMContentLoaded', () => {

    const spaceBg = document.getElementById('space-bg');
    const streakCounter = document.getElementById('streak-counter');
    const currentCoinsDisplay = document.getElementById('current-coins'); 
    const claimBtn = document.getElementById('claim-btn');
    const claimMessage = document.getElementById('claim-message');
    const countdownDisplay = document.getElementById('countdown-display');
    const timerText = document.getElementById('timer-text');
    
    // --- Configuration and Data Keys ---
    const STORAGE_KEY = 'rewardData';
    const DAILY_COIN_REWARD = 100; // Fixed reward amount
    const CLAIM_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // --- Initializing or Loading Data ---
    function loadRewardData() {
        const defaultData = {
            streak: 0,
            coins: 0, 
            lastClaimTimestamp: 0, // Store timestamp (ms since epoch)
        };
        const storedData = localStorage.getItem(STORAGE_KEY);
        // Ensure keys exist and parse the timestamp correctly
        return storedData ? { ...defaultData, ...JSON.parse(storedData) } : defaultData;
    }

    function saveRewardData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function updateCoinDisplay(coins) {
        currentCoinsDisplay.textContent = coins.toLocaleString();
    }
    
    // --- Timer and Status Logic ---
    let countdownInterval;

    function formatTime(ms) {
        if (ms <= 0) return "NOW!";
        const seconds = Math.floor(ms / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        // Pad numbers with leading zeros
        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(hours)}h : ${pad(minutes)}m : ${pad(remainingSeconds)}s`;
    }

    function startCountdown(endTime) {
        if (countdownInterval) clearInterval(countdownInterval);

        const updateTimer = () => {
            const now = Date.now();
            const remaining = endTime - now;

            if (remaining <= 0) {
                clearInterval(countdownInterval);
                checkAndLoadStatus(); // Cooldown finished, re-check status
            } else {
                timerText.textContent = formatTime(remaining);
            }
        };

        countdownInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Call immediately to avoid initial delay
    }

    function checkAndLoadStatus() {
        const data = loadRewardData();
        const now = Date.now();
        const nextClaimTime = data.lastClaimTimestamp + CLAIM_COOLDOWN_MS;
        const rewardReady = now >= nextClaimTime;

        // 1. Update Displays
        streakCounter.textContent = data.streak;
        updateCoinDisplay(data.coins);

        // 2. Set Status based on Timer
        if (rewardReady) {
            // Reward is READY
            claimMessage.textContent = "Your vault is unlocked! Click below to claim your daily loot.";
            countdownDisplay.style.display = 'none';
            claimBtn.disabled = false;
            claimBtn.textContent = `CLAIM ${DAILY_COIN_REWARD} COINS`;
            claimBtn.classList.remove('disabled');
        } else {
            // Reward is on COOLDOWN
            claimMessage.textContent = `Loot secured! You earned ${DAILY_COIN_REWARD} coins. Come back after 24 hours.`;
            countdownDisplay.style.display = 'block';
            claimBtn.disabled = true;
            claimBtn.textContent = "ON COOLDOWN";
            claimBtn.classList.add('disabled');
            startCountdown(nextClaimTime);
        }
    }


    // --- Claim Button Event ---
    claimBtn.addEventListener('click', () => {
        if (claimBtn.disabled) return;
        
        const data = loadRewardData();
        
        // 1. UPDATE STREAK, COINS, and TIMESTAMP
        data.streak += 1;
        data.coins += DAILY_COIN_REWARD;
        data.lastClaimTimestamp = Date.now();
        
        // 2. Save Data and Update Display
        saveRewardData(data);
        updateCoinDisplay(data.coins);
        
        alert(`REWARD GRABBED! You scored ${DAILY_COIN_REWARD} coins! Total: ${data.coins.toLocaleString()} coins.`); 
        
        checkAndLoadStatus(); // Re-render the page state (will enter cooldown)
    });


    // --- Background Star Generation (Same as before) ---
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
    
    // --- Initialize Page ---
    injectStarBackground();
    checkAndLoadStatus();
});
