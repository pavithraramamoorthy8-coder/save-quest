document.addEventListener('DOMContentLoaded', () => {

    // --- MEGA QUIZ DATA BANK (Expanded and Categorized) ---
    const megaQuizBank = {
        'Financial Literacy': [
            { question: "What is compound interest?", options: ["Interest calculated only on the principal amount.", "Interest calculated on the principal and accumulated interest.", "A fixed fee charged for borrowing money.", "The profit gained from selling an asset."], answer: "Interest calculated on the principal and accumulated interest." },
            { question: "Which typically carries the lowest investment risk?", options: ["Individual Tech Stocks", "Real Estate", "Government Bonds", "Cryptocurrency"], answer: "Government Bonds" },
            { question: "What is the primary purpose of an emergency fund?", options: ["To invest in high-risk stocks.", "To pay for yearly vacations.", "To cover unexpected expenses like medical bills or job loss.", "To buy expensive consumer goods."], answer: "To cover unexpected expenses like medical bills or job loss." },
            { question: "In budgeting, what does the '50/30/20 rule' suggest for the 20% portion?", options: ["Needs (Rent, Groceries)", "Wants (Entertainment, Dining Out)", "Savings and Debt Repayment", "Taxes and Insurance"], answer: "Savings and Debt Repayment" },
            { question: "Inflation is best described as:", options: ["A general decrease in the price of goods and services.", "An increase in the value of money.", "A general increase in the price of goods and services.", "A sudden stock market crash."], answer: "A general increase in the price of goods and services." },
            { question: "What does ROI stand for?", options: ["Return on Interest", "Revenue of Investment", "Rate of Inflation", "Return on Investment"], answer: "Return on Investment" },
            { question: "What is the term for diversifying your portfolio?", options: ["Putting all money in one stock.", "Spreading investments across different assets.", "Selling all your stocks.", "Borrowing money to invest."], answer: "Spreading investments across different assets." }
        ],
        'General Knowledge': [
            { question: "Which planet is known as the 'Red Planet'?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
            { question: "Who wrote the play 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
            { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
            { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
            { question: "What is the highest mountain in Africa?", options: ["Mount Everest", "Mount Kilimanjaro", "Mount Denali", "Mount Fuji"], answer: "Mount Kilimanjaro" },
            { question: "What is the chemical symbol for gold?", options: ["Ag", "Fe", "Au", "Cu"], answer: "Au" }
        ],
        'English Grammar': [
            { question: "Identify the pronoun in the sentence: 'She quickly ran home.'", options: ["quickly", "ran", "She", "home"], answer: "She" },
            { question: "Which sentence uses the correct plural form?", options: ["I saw three wolfs.", "I saw three wolves.", "I saw three wolfses.", "I saw three wolf."], answer: "I saw three wolves." },
            { question: "What is the past tense of 'to teach'?", options: ["teached", "taught", "teacht", "tought"], answer: "taught" },
            { question: "The word 'incredibly' is what part of speech?", options: ["Verb", "Noun", "Adjective", "Adverb"], answer: "Adverb" },
            { question: "Which word means the opposite of 'pessimistic'?", options: ["Cynical", "Optimistic", "Realistic", "Doubtful"], answer: "Optimistic" }
        ],
        'Maths': [
            { question: "What is 7 multiplied by 9?", options: ["63", "56", "72", "61"], answer: "63" },
            { question: "If a circle has a radius of 5, what is its diameter?", options: ["5", "10", "25", "7.5"], answer: "10" },
            { question: "What is the square root of 81?", options: ["7", "8", "9", "18"], answer: "9" },
            { question: "What is 15% of 200?", options: ["20", "30", "45", "15"], answer: "30" },
            { question: "If x - 5 = 12, what is x?", options: ["17", "7", "10", "60"], answer: "17" }
        ],
        'Science': [
            { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO"], answer: "H2O" },
            { question: "What force keeps planets in orbit around the Sun?", options: ["Magnetism", "Air Pressure", "Gravity", "Friction"], answer: "Gravity" },
            { question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Cell", "Proton"], answer: "Atom" },
            { question: "Which element is essential for human respiration?", options: ["Nitrogen", "Carbon Dioxide", "Hydrogen", "Oxygen"], answer: "Oxygen" },
            { question: "What is the freezing point of water in Celsius?", options: ["100°C", "0°C", "32°C", "-10°C"], answer: "0°C" }
        ]
    };

    // --- STATE VARIABLES ---
    let currentQuestionIndex = 0;
    let score = 0;
    let quizQuestions = [];
    const questionsPerQuiz = 8; // Increased the quiz length
    const categories = Object.keys(megaQuizBank);
    let answered = false;

    // --- DOM ELEMENTS ---
    const spaceBg = document.getElementById('space-bg');
    const iconOverlay = document.getElementById('icon-overlay');
    // ... (rest of DOM elements remain the same) ...
    const lobbyScreen = document.getElementById('quiz-lobby');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultsScreen = document.getElementById('quiz-results');
    const startButton = document.getElementById('start-quiz-btn');
    const questionArea = document.getElementById('question-area');
    const progressBar = document.getElementById('progress-bar-fill');
    const resultsTitle = document.getElementById('results-title');
    const resultsScore = document.getElementById('results-score');
    const resultsMessage = document.getElementById('results-message');
    const restartButton = document.getElementById('restart-quiz-btn');
    const quizInfoElement = document.querySelector('.quiz-info');


    // --- UTILITY & ANIMATION FUNCTIONS ---

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generateQuizQuestions() {
        quizQuestions = [];
        const numCategories = categories.length;
        const baseQuestionsPerCategory = Math.floor(questionsPerQuiz / numCategories);
        let remainder = questionsPerQuiz % numCategories;

        // Ensure we don't try to pull more questions than exist in a category
        categories.forEach(category => {
            let questions = megaQuizBank[category];
            let count = baseQuestionsPerCategory;
            
            if (remainder > 0) {
                count++;
                remainder--;
            }
            count = Math.min(count, questions.length); // Limit count to available questions

            // Shuffle and slice the questions for the current category
            const selected = shuffleArray([...questions]).slice(0, count);
            quizQuestions.push(...selected);
        });

        // Final shuffle to mix questions from different subjects
        quizQuestions = shuffleArray(quizQuestions);
        
        quizInfoElement.textContent = `${quizQuestions.length} Questions | Mixed Subjects`;
    }

    function injectBackgroundAnimations() {
        // --- A. Animated Star Twinkle ---
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

        // --- B. Floating Books Animation ---
        const bookIcons = ['fas fa-book', 'fas fa-lightbulb', 'fas fa-graduation-cap'];
        const numBooks = 10;
        for (let i = 0; i < numBooks; i++) {
            const icon = document.createElement('i');
            icon.className = `floating-book ${bookIcons[Math.floor(Math.random() * bookIcons.length)]}`;
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.top = `${Math.random() * 100}vh`;
            icon.style.animationDuration = `${Math.random() * 30 + 15}s`;
            icon.style.animationDelay = `${Math.random() * 15}s`;
            
            iconOverlay.appendChild(icon);
        }
    }


    // --- QUIZ LOGIC FUNCTIONS (Mostly Unchanged) ---

    function showScreen(screenId) {
        document.querySelectorAll('.quiz-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    function renderQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            showResults();
            return;
        }
        // ... (Question rendering logic remains the same, using quizQuestions array) ...
        answered = false;
        const q = quizQuestions[currentQuestionIndex];
        
        const shuffledOptions = shuffleArray([...q.options]);

        let optionsHtml = shuffledOptions.map((option) => 
            `<button class="option-btn" data-answer="${option}">${option}</button>`
        ).join('');

        questionArea.innerHTML = `
            <p id="question-text">${currentQuestionIndex + 1}. ${q.question}</p>
            <div class="options-container">
                ${optionsHtml}
            </div>
        `;
        
        document.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', handleAnswerClick);
        });

        updateProgressBar();
    }

    function handleAnswerClick(event) {
        if (answered) return;
        answered = true;

        const selectedOption = event.target;
        const selectedAnswer = selectedOption.getAttribute('data-answer');
        const correctAnswer = quizQuestions[currentQuestionIndex].answer;

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.add('disabled');
        });

        if (selectedAnswer === correctAnswer) {
            score++;
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('incorrect');
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.getAttribute('data-answer') === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }
        
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion();
        }, 1000);
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showResults() {
        showScreen('quiz-results');
        
        const total = quizQuestions.length;
        const percentage = (score / total) * 100;
        
        resultsScore.textContent = `You scored: ${score} / ${total}`;

        if (percentage >= 80) {
            resultsTitle.textContent = "Flawless Victory!";
            resultsMessage.textContent = "You are a master of all subjects! Keep boosting your knowledge.";
        } else if (percentage >= 60) {
            resultsTitle.textContent = "Solid Performance!";
            resultsMessage.textContent = "Good job! You're well-rounded. Review the topics you missed.";
        } else {
            resultsTitle.textContent = "Mission Control needs work.";
            resultsMessage.textContent = "Don't worry! Time to boost your knowledge base.";
        }
    }
    
    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        updateProgressBar();
        generateQuizQuestions(); // Generate a new set of questions
        showScreen('quiz-lobby');
    }


    // --- INITIALIZATION & EVENT LISTENERS ---
    
    injectBackgroundAnimations(); // Inject stars and books on load
    generateQuizQuestions(); // Initialize the first set of questions

    startButton.addEventListener('click', () => {
        showScreen('quiz-question-screen');
        renderQuestion();
    });
    
    restartButton.addEventListener('click', resetQuiz);
});
