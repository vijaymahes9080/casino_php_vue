// app.js - Casino Client-side SPA Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // ==================== APP STATE ====================
    let currentUser = null;
    let users = JSON.parse(localStorage.getItem('casino_users')) || [
        { name: 'admin', password: 'admin', cash: 1000 } // Default admin account
    ];

    // Card Deck Configuration (Russian symbols to match files)
    const ORIGINAL_DECK = [
        { title: '2ч', url: 'public/img/cards/2ч.jpeg', value: 2 },
        { title: '3ч', url: 'public/img/cards/3ч.jpeg', value: 3 },
        { title: '4ч', url: 'public/img/cards/4ч.jpeg', value: 4 },
        { title: '5ч', url: 'public/img/cards/5ч.jpeg', value: 5 },
        { title: '6ч', url: 'public/img/cards/6ч.jpeg', value: 6 },
        { title: '7ч', url: 'public/img/cards/7ч.jpeg', value: 7 },
        { title: '8ч', url: 'public/img/cards/8ч.jpeg', value: 8 },
        { title: '9ч', url: 'public/img/cards/9ч.jpeg', value: 9 },
        { title: '10ч', url: 'public/img/cards/10ч.jpeg', value: 10 },
        { title: 'Вч', url: 'public/img/cards/Вч.jpeg', value: 10 },
        { title: 'Дч', url: 'public/img/cards/Дч.jpeg', value: 10 },
        { title: 'Кч', url: 'public/img/cards/Кч.jpeg', value: 10 },
        { title: 'Тч', url: 'public/img/cards/Тч.jpeg', value: 11 },

        { title: '2т', url: 'public/img/cards/2т.jpeg', value: 2 },
        { title: '3т', url: 'public/img/cards/3т.jpeg', value: 3 },
        { title: '4т', url: 'public/img/cards/4т.jpeg', value: 4 },
        { title: '5т', url: 'public/img/cards/5т.jpeg', value: 5 },
        { title: '6т', url: 'public/img/cards/6т.jpeg', value: 6 },
        { title: '7т', url: 'public/img/cards/7т.jpeg', value: 7 },
        { title: '8т', url: 'public/img/cards/8т.jpeg', value: 8 },
        { title: '9т', url: 'public/img/cards/9т.jpeg', value: 9 },
        { title: '10т', url: 'public/img/cards/10т.jpeg', value: 10 },
        { title: 'Вт', url: 'public/img/cards/Вт.jpeg', value: 10 },
        { title: 'Дт', url: 'public/img/cards/Дт.jpeg', value: 10 },
        { title: 'Кт', url: 'public/img/cards/Кт.jpeg', value: 10 },
        { title: 'Тт', url: 'public/img/cards/Тт.jpeg', value: 11 },

        { title: '2б', url: 'public/img/cards/2б.jpeg', value: 2 },
        { title: '3б', url: 'public/img/cards/3б.jpeg', value: 3 },
        { title: '4б', url: 'public/img/cards/4б.jpeg', value: 4 },
        { title: '5б', url: 'public/img/cards/5б.jpeg', value: 5 },
        { title: '6б', url: 'public/img/cards/6б.jpeg', value: 6 },
        { title: '7б', url: 'public/img/cards/7б.jpeg', value: 7 },
        { title: '8б', url: 'public/img/cards/8б.jpeg', value: 8 },
        { title: '9б', url: 'public/img/cards/9б.jpeg', value: 9 },
        { title: '10б', url: 'public/img/cards/10б.jpeg', value: 10 },
        { title: 'Вб', url: 'public/img/cards/Вб.jpeg', value: 10 },
        { title: 'Дб', url: 'public/img/cards/Дб.jpeg', value: 10 },
        { title: 'Кб', url: 'public/img/cards/Кб.jpeg', value: 10 },
        { title: 'Тб', url: 'public/img/cards/Тб.jpeg', value: 11 },

        { title: '2п', url: 'public/img/cards/2п.jpeg', value: 2 },
        { title: '3п', url: 'public/img/cards/3п.jpeg', value: 3 },
        { title: '4п', url: 'public/img/cards/4п.jpeg', value: 4 },
        { title: '5п', url: 'public/img/cards/5п.jpeg', value: 5 },
        { title: '6п', url: 'public/img/cards/6п.jpeg', value: 6 },
        { title: '7п', url: 'public/img/cards/7п.jpeg', value: 7 },
        { title: '8п', url: 'public/img/cards/8п.jpeg', value: 8 },
        { title: '9п', url: 'public/img/cards/9п.jpeg', value: 9 },
        { title: '10п', url: 'public/img/cards/10п.jpeg', value: 10 },
        { title: 'Вп', url: 'public/img/cards/Вп.jpeg', value: 10 },
        { title: 'Дп', url: 'public/img/cards/Дп.jpeg', value: 10 },
        { title: 'Кп', url: 'public/img/cards/Кп.jpeg', value: 10 },
        { title: 'Тп', url: 'public/img/cards/Тп.jpeg', value: 11 }
    ];

    // Slots Machine Reels Config
    const SLOTS_ITEMS = [
        { title: 'cherry', url: 'public/img/slots/slot1.png' },
        { title: 'orange', url: 'public/img/slots/slot2.png' },
        { title: 'plum', url: 'public/img/slots/slot3.png' },
        { title: 'bell', url: 'public/img/slots/slot4.png' },
        { title: 'bar', url: 'public/img/slots/slot5.png' },
        { title: 'seven', url: 'public/img/slots/slot6.png' }
    ];

    // ==================== SAVE USERS ====================
    function saveUsers() {
        localStorage.setItem('casino_users', JSON.stringify(users));
    }

    // ==================== NAVIGATING SCREENS ====================
    function showScreen(screenId) {
        document.querySelectorAll('.app-screen').forEach(screen => {
            screen.style.display = 'none';
        });
        document.getElementById(screenId).style.display = 'block';

        // Set active state in navbar links
        document.querySelectorAll('.nav-link-item').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.screen === screenId) {
                link.classList.add('active');
            }
        });
    }

    // Update global UI displays for balance and user
    function updateHeaderInfo() {
        if (currentUser) {
            document.getElementById('nav-user-info').style.display = 'flex';
            document.getElementById('nav-auth-links').style.display = 'none';
            document.getElementById('display-username').textContent = currentUser.name;
            document.getElementById('display-balance').textContent = currentUser.cash + ' $';
        } else {
            document.getElementById('nav-user-info').style.display = 'none';
            document.getElementById('nav-auth-links').style.display = 'flex';
        }
    }

    function updateCashOnServer(amount) {
        if (currentUser) {
            currentUser.cash = amount;
            const idx = users.findIndex(u => u.name === currentUser.name);
            if (idx !== -1) {
                users[idx].cash = amount;
                saveUsers();
            }
            updateHeaderInfo();
        }
    }

    // ==================== LOGIN/REGISTRATION HANDLERS ====================
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');

    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
    });

    tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        registerBox.style.display = 'block';
        loginBox.style.display = 'none';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('login-username').value.trim();
        const passwordInput = document.getElementById('login-password').value;

        const user = users.find(u => u.name === usernameInput && u.password === passwordInput);
        if (user) {
            currentUser = user;
            updateHeaderInfo();
            showScreen('lobby-screen');
            document.getElementById('lobby-welcome-text').textContent = `Welcome, ${currentUser.name}!`;
            loginForm.reset();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid username or password.',
                icon: 'error',
                confirmButtonColor: '#ff4500'
            });
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('register-username').value.trim();
        const passwordInput = document.getElementById('register-password').value;

        if (users.some(u => u.name === usernameInput)) {
            Swal.fire({
                title: 'Error!',
                text: 'Username already exists.',
                icon: 'error',
                confirmButtonColor: '#ff4500'
            });
            return;
        }

        const newUser = { name: usernameInput, password: passwordInput, cash: 1000 };
        users.push(newUser);
        saveUsers();

        currentUser = newUser;
        updateHeaderInfo();
        showScreen('lobby-screen');
        document.getElementById('lobby-welcome-text').textContent = `Welcome, ${currentUser.name}!`;
        registerForm.reset();
    });

    // Logout Click
    document.getElementById('btn-logout').addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = null;
        updateHeaderInfo();
        showScreen('login-screen');
    });

    // Lobby Navigation Card Clicks
    document.getElementById('lobby-go-bj').addEventListener('click', () => {
        showScreen('blackjack-screen');
        initBlackjackGame();
    });

    document.getElementById('lobby-go-slots').addEventListener('click', () => {
        showScreen('slots-screen');
        initSlotsGame();
    });

    // Top up Balance
    const topupModal = document.getElementById('balance-modal');
    document.getElementById('btn-open-topup').addEventListener('click', () => {
        topupModal.classList.add('open');
    });

    document.getElementById('modal-close-btn').addEventListener('click', () => {
        topupModal.classList.remove('open');
    });

    document.getElementById('balance-topup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const topupAmt = parseInt(document.getElementById('topup-amount').value);
        if (topupAmt > 0 && currentUser) {
            updateCashOnServer(currentUser.cash + topupAmt);
            topupModal.classList.remove('open');
            document.getElementById('topup-amount').value = '';
            Swal.fire({
                title: 'Success!',
                text: `Deposited ${topupAmt}$ successfully.`,
                icon: 'success',
                confirmButtonColor: '#34c759'
            });
        }
    });

    // Home / Lobby brand links
    document.getElementById('brand-link').addEventListener('click', () => {
        if (currentUser) {
            showScreen('lobby-screen');
        } else {
            showScreen('login-screen');
        }
    });
    document.getElementById('nav-home-link').addEventListener('click', () => {
        if (currentUser) showScreen('lobby-screen');
    });

    // Initialize Default User Display
    saveUsers(); // Make sure initial admin account is written
    updateHeaderInfo();


    // ==================== BLACKJACK GAME IMPLEMENTATION ====================
    let bjDeck = [];
    let bjBet = 0;
    let bjUserCards = [];
    let bjDealerCards = [];
    let bjUserCount = 0;
    let bjDealerCount = 0;

    const bjBetSetup = document.getElementById('bj-bet-setup');
    const bjPlayArea = document.getElementById('bj-play-area');
    const bjDealerCardsDiv = document.getElementById('bj-dealer-cards');
    const bjUserCardsDiv = document.getElementById('bj-user-cards');
    const bjDealerCountSpan = document.getElementById('bj-dealer-count');
    const bjUserCountSpan = document.getElementById('bj-user-count');
    const bjBetDisplay = document.getElementById('bj-bet-display');
    const inputBet = document.getElementById('bj-bet-input');

    function initBlackjackGame() {
        bjBetSetup.style.display = 'block';
        bjPlayArea.style.display = 'none';
        inputBet.value = 10;
        bjUserCards = [];
        bjDealerCards = [];
        bjUserCount = 0;
        bjDealerCount = 0;
    }

    document.getElementById('bj-start-btn').addEventListener('click', () => {
        const betAmt = parseInt(inputBet.value);
        if (betAmt <= 0) {
            Swal.fire({ title: 'Make your bet!', confirmButtonColor: '#ff4500' });
            return;
        }
        if (betAmt > currentUser.cash) {
            Swal.fire({ title: 'Not enough cash!', confirmButtonColor: '#ff4500' });
            return;
        }

        bjBet = betAmt;
        bjDeck = [...ORIGINAL_DECK]; // Clone base deck
        bjUserCards = [];
        bjDealerCards = [];
        bjUserCount = 0;
        bjDealerCount = 0;

        bjDealerCardsDiv.innerHTML = '';
        bjUserCardsDiv.innerHTML = '';

        bjBetSetup.style.display = 'none';
        bjPlayArea.style.display = 'block';
        bjBetDisplay.textContent = `Your bet: ${bjBet} $`;

        // Dealer gets 1 face card & 1 back shirt card
        const dealerCardIdx1 = Math.floor(Math.random() * bjDeck.length);
        const dealerCard1 = bjDeck.splice(dealerCardIdx1, 1)[0];
        bjDealerCards.push(dealerCard1);
        bjDealerCount += dealerCard1.value;

        // Visuals for 1st Dealer card
        addCardToTable(bjDealerCardsDiv, dealerCard1, true);

        // Card back for dealer
        addCardToTable(bjDealerCardsDiv, { url: 'public/img/cards/shirt.png' }, false, 'dealer-shirt-card');

        // Player gets 2 cards
        dealCardToPlayer();
        dealCardToPlayer();

        // Aces adjust
        if (bjUserCards.length === 2 && bjUserCards[0].value === 11 && bjUserCards[1].value === 11) {
            bjUserCount = 12;
            bjUserCountSpan.textContent = bjUserCount;
        }

        bjDealerCountSpan.textContent = bjDealerCount;

        // Check Natural Blackjack
        if (bjUserCount === 21) {
            bjBet = bjBet * 2.5; // Natural Blackjack payout
            updateCashOnServer(currentUser.cash + bjBet);
            Swal.fire({
                title: 'BLACKJACK!!!',
                text: `Your count is: 21. You won ${bjBet} $`,
                animation: false,
                allowOutsideClick: false,
                customClass: { popup: 'animated tada' }
            }).then(() => {
                initBlackjackGame();
            });
        }
    });

    function addCardToTable(container, card, animate, customId) {
        const img = document.createElement('img');
        img.className = 'card-item';
        if (customId) img.id = customId;
        img.src = card.url;
        img.alt = card.title || 'card';
        if (animate) {
            img.classList.add('card-deal-anim');
        }
        container.appendChild(img);
    }

    function dealCardToPlayer() {
        const cardIdx = Math.floor(Math.random() * bjDeck.length);
        const card = bjDeck.splice(cardIdx, 1)[0];
        bjUserCards.push(card);
        bjUserCount += card.value;
        addCardToTable(bjUserCardsDiv, card, true);
        bjUserCountSpan.textContent = bjUserCount;

        if (bjUserCount > 21) {
            updateCashOnServer(currentUser.cash - bjBet);
            Swal.fire({
                title: 'You lose!',
                text: `Your count is: ${bjUserCount}. You lost ${bjBet} $`,
                animation: false,
                allowOutsideClick: false,
                customClass: { popup: 'animated tada' }
            }).then(() => {
                initBlackjackGame();
            });
        }
    }

    // BJ Controls
    document.getElementById('bj-hit-btn').addEventListener('click', () => {
        dealCardToPlayer();
    });

    document.getElementById('bj-double-btn').addEventListener('click', () => {
        if (currentUser.cash < bjBet * 2) {
            Swal.fire({ title: 'Not enough cash to double!', confirmButtonColor: '#ff4500' });
            return;
        }
        bjBet *= 2;
        bjBetDisplay.textContent = `Your bet: ${bjBet} $`;
        dealCardToPlayer();

        if (bjUserCount <= 21) {
            dealerPlay();
        }
    });

    document.getElementById('bj-stand-btn').addEventListener('click', () => {
        dealerPlay();
    });

    function dealerPlay() {
        // Pop the shirt card back
        const shirtCard = document.getElementById('dealer-shirt-card');
        if (shirtCard) shirtCard.remove();

        // Dealer draws until score is at least 16
        const drawDealerCard = () => {
            if (bjDealerCount < 16) {
                const cardIdx = Math.floor(Math.random() * bjDeck.length);
                const card = bjDeck.splice(cardIdx, 1)[0];
                bjDealerCards.push(card);
                bjDealerCount += card.value;
                addCardToTable(bjDealerCardsDiv, card, true);
                bjDealerCountSpan.textContent = bjDealerCount;

                setTimeout(drawDealerCard, 300); // Small interval for visual appeal
            } else {
                evaluateOutcome();
            }
        };

        drawDealerCard();
    }

    function evaluateOutcome() {
        if (bjDealerCount > 21 || bjUserCount > bjDealerCount) {
            // Player wins
            updateCashOnServer(currentUser.cash + bjBet);
            Swal.fire({
                title: 'You win!',
                text: `Player: ${bjUserCount} | Dealer: ${bjDealerCount}. You won ${bjBet} $`,
                animation: false,
                allowOutsideClick: false,
                customClass: { popup: 'animated tada' }
            }).then(() => {
                initBlackjackGame();
            });
        } else if (bjDealerCount === bjUserCount) {
            // Draw
            Swal.fire({
                title: 'Draw!',
                text: `Player: ${bjUserCount} | Dealer: ${bjDealerCount}. Bet returned.`,
                confirmButtonColor: '#ff4500'
            }).then(() => {
                initBlackjackGame();
            });
        } else {
            // Loss
            updateCashOnServer(currentUser.cash - bjBet);
            Swal.fire({
                title: 'You lose!',
                text: `Player: ${bjUserCount} | Dealer: ${bjDealerCount}. You lost ${bjBet} $`,
                animation: false,
                allowOutsideClick: false,
                customClass: { popup: 'animated tada' }
            }).then(() => {
                initBlackjackGame();
            });
        }
    }


    // ==================== SLOTS GAME IMPLEMENTATION ====================
    let slotsBet = 0;
    let slotsWins = 0;
    let slotsReels = [
        [{ url: 'public/img/slots/slot1.png' }, { url: 'public/img/slots/slot2.png' }, { url: 'public/img/slots/slot3.png' }],
        [{ url: 'public/img/slots/slot4.png' }, { url: 'public/img/slots/slot5.png' }, { url: 'public/img/slots/slot6.png' }],
        [{ url: 'public/img/slots/slot3.png' }, { url: 'public/img/slots/slot1.png' }, { url: 'public/img/slots/slot2.png' }]
    ];

    function initSlotsGame() {
        slotsBet = 0;
        slotsWins = 0;
        updateSlotsDisplay();
    }

    function updateSlotsDisplay() {
        document.getElementById('slots-bet').textContent = slotsBet + ' $';
        document.getElementById('slots-cash').textContent = currentUser.cash + ' $';
        document.getElementById('slots-wins').textContent = slotsWins + ' $';

        // Render reels
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellId = `slot-${row + 1}-${col + 1}`;
                const cell = document.getElementById(cellId);
                cell.innerHTML = `<img src="${slotsReels[row][col].url}" alt="slot">`;
            }
        }
    }

    window.spinSlots = function(bet) {
        if (bet > currentUser.cash) {
            Swal.fire({ title: 'Not enough cash!', confirmButtonColor: '#ff4500' });
            return;
        }

        slotsBet = bet;
        slotsWins = 0;
        updateCashOnServer(currentUser.cash - slotsBet);
        updateSlotsDisplay();

        // Visual spin effect
        const cells = document.querySelectorAll('.slot-cell');
        cells.forEach(cell => {
            cell.classList.add('spinning');
            // Inject spin reel strip image inside cell for aesthetic animation
            cell.innerHTML = `<img src="public/img/slots/reel3.png" style="animation: slotSpin 0.1s linear infinite;">`;
        });

        setTimeout(() => {
            // Generate final reels state
            slotsReels = [];
            for (let r = 0; r < 3; r++) {
                let rowItems = [];
                for (let c = 0; c < 3; c++) {
                    const rndIdx = Math.floor(Math.random() * SLOTS_ITEMS.length);
                    rowItems.push(SLOTS_ITEMS[rndIdx]);
                }
                slotsReels.push(rowItems);
            }

            // Remove spinning state
            cells.forEach(cell => cell.classList.remove('spinning'));

            // Calculate winnings based on slots math
            calculateSlotsPayout();

            updateCashOnServer(currentUser.cash + slotsWins);
            updateSlotsDisplay();

            // Highlight win if there is a payout
            if (slotsWins > 0) {
                const winPill = document.querySelector('.win-pill');
                winPill.classList.add('pop-win');
                setTimeout(() => winPill.classList.remove('pop-win'), 500);

                Swal.fire({
                    title: 'Winner!',
                    text: `You won: ${slotsWins} $`,
                    animation: false,
                    allowOutsideClick: true,
                    customClass: { popup: 'animated tada' }
                });
            }
        }, 1000);
    };

    function calculateSlotsPayout() {
        let line1 = 0, line2 = 0, line3 = 0, line4 = 0, line5 = 0;

        // Line 1: Horizontal Top Row
        if (slotsReels[0][0].title === 'cherry' && slotsReels[0][1].title === 'cherry') {
            line1 = slotsBet * 2;
        }
        if (slotsReels[0][0].title === 'cherry' && slotsReels[0][1].title === 'cherry' && slotsReels[0][2].title === 'cherry') {
            line1 = slotsBet * 14;
        }

        // Line 2: Horizontal Middle Row
        if (slotsReels[1][0].title === 'cherry' && slotsReels[1][1].title === 'cherry') {
            line2 = slotsBet * 2;
        }
        if (slotsReels[1][0].title === 'cherry' && slotsReels[1][1].title === 'cherry' && slotsReels[1][2].title === 'cherry') {
            line2 = slotsBet * 14;
        }

        // Line 3: Horizontal Bottom Row
        if (slotsReels[2][0].title === 'cherry' && slotsReels[2][1].title === 'cherry') {
            line3 = slotsBet * 2;
        }
        if (slotsReels[2][0].title === 'cherry' && slotsReels[2][1].title === 'cherry' && slotsReels[2][2].title === 'cherry') {
            line3 = slotsBet * 14;
        }

        // Line 4: Diagonal Top-Left to Bottom-Right
        if (slotsReels[0][0].title === 'cherry' && slotsReels[1][1].title === 'cherry') {
            line4 = slotsBet * 2;
        }
        if (slotsReels[0][0].title === 'cherry' && slotsReels[1][1].title === 'cherry' && slotsReels[2][2].title === 'cherry') {
            line4 = slotsBet * 14;
        }

        // Line 5: Diagonal Bottom-Left to Top-Right
        if (slotsReels[2][0].title === 'cherry' && slotsReels[1][1].title === 'cherry') {
            line5 = slotsBet * 2;
        }
        if (slotsReels[2][0].title === 'cherry' && slotsReels[1][1].title === 'cherry' && slotsReels[0][2].title === 'cherry') {
            line5 = slotsBet * 14;
        }

        // Orange Payouts
        if (slotsReels[0][0].title === 'orange' && slotsReels[0][1].title === 'orange') {
            line1 = slotsBet * 3;
        }
        if (slotsReels[0][0].title === 'orange' && slotsReels[0][1].title === 'orange' && slotsReels[0][2].title === 'orange') {
            line1 = slotsBet * 24;
        }

        if (slotsReels[1][0].title === 'orange' && slotsReels[1][1].title === 'orange') {
            line2 = slotsBet * 3;
        }
        if (slotsReels[1][0].title === 'cherry' && slotsReels[1][1].title === 'orange' && slotsReels[1][2].title === 'orange') {
            line2 = slotsBet * 24;
        }

        if (slotsReels[2][0].title === 'orange' && slotsReels[2][1].title === 'orange') {
            line3 = slotsBet * 3;
        }
        if (slotsReels[2][0].title === 'orange' && slotsReels[2][1].title === 'orange' && slotsReels[2][2].title === 'orange') {
            line3 = slotsBet * 24;
        }

        if (slotsReels[0][0].title === 'orange' && slotsReels[1][1].title === 'orange') {
            line4 = slotsBet * 3;
        }
        if (slotsReels[0][0].title === 'orange' && slotsReels[1][1].title === 'orange' && slotsReels[2][2].title === 'orange') {
            line4 = slotsBet * 24;
        }

        if (slotsReels[2][0].title === 'orange' && slotsReels[1][1].title === 'orange') {
            line5 = slotsBet * 3;
        }
        if (slotsReels[2][0].title === 'orange' && slotsReels[1][1].title === 'orange' && slotsReels[0][2].title === 'orange') {
            line5 = slotsBet * 24;
        }

        // Plum Payouts
        if (slotsReels[0][0].title === 'plum' && slotsReels[0][1].title === 'plum' && slotsReels[0][2].title === 'plum') {
            line1 = slotsBet * 32;
        }
        if (slotsReels[1][0].title === 'plum' && slotsReels[1][1].title === 'plum' && slotsReels[1][2].title === 'plum') {
            line2 = slotsBet * 32;
        }
        if (slotsReels[2][0].title === 'plum' && slotsReels[2][1].title === 'plum' && slotsReels[2][2].title === 'plum') {
            line3 = slotsBet * 32;
        }
        if (slotsReels[0][0].title === 'plum' && slotsReels[1][1].title === 'plum' && slotsReels[2][2].title === 'plum') {
            line4 = slotsBet * 32;
        }
        if (slotsReels[2][0].title === 'plum' && slotsReels[1][1].title === 'plum' && slotsReels[0][2].title === 'plum') {
            line5 = slotsBet * 32;
        }

        // Bell Payouts
        if (slotsReels[0][0].title === 'bell' && slotsReels[0][1].title === 'bell' && slotsReels[0][2].title === 'bell') {
            line1 = slotsBet * 40;
        }
        if (slotsReels[1][0].title === 'bell' && slotsReels[1][1].title === 'bell' && slotsReels[1][2].title === 'bell') {
            line2 = slotsBet * 40;
        }
        if (slotsReels[2][0].title === 'bell' && slotsReels[2][1].title === 'bell' && slotsReels[2][2].title === 'bell') {
            line3 = slotsBet * 40;
        }
        if (slotsReels[0][0].title === 'bell' && slotsReels[1][1].title === 'bell' && slotsReels[2][2].title === 'bell') {
            line4 = slotsBet * 40;
        }
        if (slotsReels[2][0].title === 'bell' && slotsReels[1][1].title === 'bell' && slotsReels[0][2].title === 'bell') {
            line5 = slotsBet * 40;
        }

        // Bar Payouts
        if (slotsReels[0][0].title === 'bar' && slotsReels[0][1].title === 'bar' && slotsReels[0][2].title === 'bar') {
            line1 = slotsBet * 50;
        }
        if (slotsReels[1][0].title === 'bar' && slotsReels[1][1].title === 'bar' && slotsReels[1][2].title === 'bar') {
            line2 = slotsBet * 50;
        }
        if (slotsReels[2][0].title === 'bar' && slotsReels[2][1].title === 'bar' && slotsReels[2][2].title === 'bar') {
            line3 = slotsBet * 50;
        }
        if (slotsReels[0][0].title === 'bar' && slotsReels[1][1].title === 'bar' && slotsReels[2][2].title === 'bar') {
            line4 = slotsBet * 50;
        }
        if (slotsReels[2][0].title === 'bar' && slotsReels[1][1].title === 'bar' && slotsReels[0][2].title === 'bar') {
            line5 = slotsBet * 50;
        }

        // Seven Payouts
        if (slotsReels[0][0].title === 'seven' && slotsReels[0][1].title === 'seven' && slotsReels[0][2].title === 'seven') {
            line1 = slotsBet * 100;
        }
        if (slotsReels[1][0].title === 'seven' && slotsReels[1][1].title === 'seven' && slotsReels[1][2].title === 'seven') {
            line2 = slotsBet * 100;
        }
        if (slotsReels[2][0].title === 'seven' && slotsReels[2][1].title === 'seven' && slotsReels[2][2].title === 'seven') {
            line3 = slotsBet * 100;
        }
        if (slotsReels[0][0].title === 'seven' && slotsReels[1][1].title === 'seven' && slotsReels[2][2].title === 'seven') {
            line4 = slotsBet * 100;
        }
        if (slotsReels[2][0].title === 'seven' && slotsReels[1][1].title === 'seven' && slotsReels[0][2].title === 'seven') {
            line5 = slotsBet * 100;
        }

        slotsWins = line1 + line2 + line3 + line4 + line5;
    }
});
