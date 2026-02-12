/* ================================
   DOODLE LOVE VALENTINE JAVASCRIPT
   All interactive functionality
   ================================ */

// ===== GLOBAL VARIABLES =====
let currentPage = 1;
let noButtonAttempts = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerSymbol = '❤️';
let computerSymbol = '💔';

// ===== PAGE NAVIGATION =====
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show the target page
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
        
        // Initialize page-specific functionality
        if (pageNumber === 2) {
            initializeLoveNotes();
        } else if (pageNumber === 4) {
            resetGame();
        } else if (pageNumber === 5) {
            initializeValentineQuestion();
        }
    }
}

// ===== PAGE 1: LOADING PAGE =====
window.addEventListener('DOMContentLoaded', () => {
    startLoading();
    initializeCursorHearts();
    addSamNameListeners();
});

function startLoading() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingText = document.getElementById('loadingText');
    const errorMessage = document.getElementById('errorMessage');
    
    let percent = 0;
    const interval = setInterval(() => {
        percent += 1;
        loadingBar.style.width = percent + '%';
        loadingPercent.textContent = percent + '%';
        
        // Change text at different percentages
        if (percent === 30) {
            loadingText.textContent = 'Searching for love...';
        } else if (percent === 50) {
            loadingText.textContent = 'Connecting to Sam\'s heart...';
        } else if (percent === 69) {
            // Stop at 69% and show error
            clearInterval(interval);
            setTimeout(() => {
                loadingText.textContent = 'Connection failed!';
                errorMessage.classList.remove('hidden');
                
                // Console easter egg
                console.log('💔 ERROR: Valentine slot is empty!');
                console.log('💡 TIP: Click the button to fix this critical issue!');
            }, 500);
        }
    }, 50);
}

function fixError() {
    // Hide error and continue loading
    const errorMessage = document.getElementById('errorMessage');
    const loadingBar = document.getElementById('loadingBar');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingText = document.getElementById('loadingText');
    
    errorMessage.classList.add('hidden');
    loadingText.textContent = 'Assigning you as Valentine...';
    
    let percent = 69;
    const interval = setInterval(() => {
        percent += 1;
        loadingBar.style.width = percent + '%';
        loadingPercent.textContent = percent + '%';
        
        if (percent === 100) {
            clearInterval(interval);
            loadingText.textContent = 'Success! ❤️';
            setTimeout(() => {
                goToPage(2);
            }, 1000);
        }
    }, 30);
}

// ===== PAGE 2: 20 LOVE NOTES FROM DANIEL CAESAR SONGS =====
const loveNotes = [
    "You're the coffee that I need in the morning",
    "You're the sunshine on my life",
    "The best part of my day is when I'm with you",
    "You're my end and my beginning",
    "Even when I lose, I'm winning",
    "You're the Tylenol when my head hurts",
    "Girl, you're such a dream to me",
    "I get lost in your eyes",
    "You're not just a lover, you're my friend",
    "We could slow dance to rock music",
    "Kiss while we do it, talk until we both turn blue",
    "Blessed is the one who's got you",
    "You make my heart feel like it's summer when the rain is pouring down",
    "I could hold you in my arms forever and it wouldn't be enough",
    "You're the only one I want by my side",
    "There's nobody I'd rather give my time to",
    "Through the dark, you're shining",
    "Hold me in your arms, never let me go",
    "We're perfect for each other",
];

// The special last one
const lastNote = "I love you more";

function initializeLoveNotes() {
    const container = document.getElementById('loveNotesContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const signatureArea = document.getElementById('signatureArea');
    
    container.innerHTML = '';
    let checkedCount = 0;
    const totalNotes = loveNotes.length + 1; // +1 for the special last note
    
    // Create the first 19 love notes
    loveNotes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'love-note-item';
        noteItem.style.animationDelay = (index * 0.1) + 's';
        
        const checkbox = document.createElement('div');
        checkbox.className = 'love-checkbox';
        checkbox.dataset.index = index;
        
        const text = document.createElement('span');
        text.textContent = `${index + 1}. ${note}`;
        
        noteItem.appendChild(checkbox);
        noteItem.appendChild(text);
        container.appendChild(noteItem);
    });
    
    // Add the special last note
    const lastNoteItem = document.createElement('div');
    lastNoteItem.className = 'love-note-item special-note';
    lastNoteItem.style.animationDelay = (loveNotes.length * 0.1) + 's';
    
    const lastCheckbox = document.createElement('div');
    lastCheckbox.className = 'love-checkbox';
    lastCheckbox.dataset.index = loveNotes.length;
    
    const lastText = document.createElement('span');
    lastText.textContent = `20. ${lastNote}`;
    
    lastNoteItem.appendChild(lastCheckbox);
    lastNoteItem.appendChild(lastText);
    container.appendChild(lastNoteItem);
    
    // Auto-check on scroll
    container.addEventListener('scroll', () => {
        const checkboxes = container.querySelectorAll('.love-checkbox:not(.checked)');
        const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
        
        // Check items based on scroll position
        checkboxes.forEach((checkbox, idx) => {
            const itemIndex = parseInt(checkbox.dataset.index);
            if (itemIndex < (scrollPercentage / 100) * totalNotes) {
                checkbox.classList.add('checked');
                checkedCount++;
                
                // Update progress
                const progress = Math.floor((checkedCount / totalNotes) * 100);
                progressFill.style.width = progress + '%';
                progressText.textContent = `Connection Restored: ${progress}%`;
            }
        });
        
        // Show signature at bottom
        if (scrollPercentage > 85) {
            signatureArea.classList.remove('hidden');
        }
    });
}

// ===== PAGE 3: EVIDENCE & CONFIRMATION =====
function confirmLove() {
    const name = document.getElementById('signatureInput').value || 'Ananya';
    document.getElementById('displayName').textContent = name;
    
    const systemMessages = document.getElementById('systemMessages');
    const screenshotPrompt = document.getElementById('screenshotPrompt');
    const computer = document.getElementById('doodleComputer');
    
    systemMessages.classList.remove('hidden');
    
    // Shake computer at the right time
    setTimeout(() => {
        computer.classList.add('shaking');
        
        // Shake the whole page
        document.body.style.animation = 'shake 0.5s ease-in-out';
        
        console.log('⚠️ WARNING: Love overload detected!');
        console.log('💖 System unable to process this much affection!');
        
        setTimeout(() => {
            computer.classList.remove('shaking');
            document.body.style.animation = '';
            screenshotPrompt.classList.remove('hidden');
        }, 2000);
    }, 4000);
}

// ===== PAGE 4: TIC-TAC-TOE GAME =====
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.dataset.symbol = '';
    });
    document.getElementById('winMessage').classList.add('hidden');
    document.getElementById('gameStatus').textContent = 'You are ❤️ | Sam is 💔';
}

function playerMove(index) {
    if (!gameActive || gameBoard[index] !== '') return;
    
    // Player move
    gameBoard[index] = playerSymbol;
    const cells = document.querySelectorAll('.game-cell');
    cells[index].textContent = playerSymbol;
    cells[index].dataset.symbol = playerSymbol;
    
    // Check if player won
    if (checkWin(playerSymbol)) {
        gameActive = false;
        setTimeout(() => {
            showWinMessage();
        }, 500);
        return;
    }
    
    // Computer move (but rigged so player always wins)
    setTimeout(() => {
        computerMove();
    }, 500);
}

function computerMove() {
    if (!gameActive) return;
    
    // Find empty cells
    const emptyCells = gameBoard.map((cell, idx) => cell === '' ? idx : null).filter(idx => idx !== null);
    
    if (emptyCells.length === 0) {
        // It's a draw, but let's magically make the player win
        magicallyWin();
        return;
    }
    
    // Computer makes a move, but never in a winning position
    let moveIndex;
    do {
        moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } while (wouldWin(computerSymbol, moveIndex) && emptyCells.length > 1);
    
    gameBoard[moveIndex] = computerSymbol;
    const cells = document.querySelectorAll('.game-cell');
    cells[moveIndex].textContent = computerSymbol;
    cells[moveIndex].dataset.symbol = computerSymbol;
    
    // Check if computer "won" (shouldn't happen, but if it does, reset)
    if (checkWin(computerSymbol)) {
        setTimeout(() => {
            document.getElementById('gameStatus').textContent = 'Nice try. You always win. 😏';
            resetGame();
        }, 1000);
    }
}

function wouldWin(symbol, index) {
    const testBoard = [...gameBoard];
    testBoard[index] = symbol;
    return checkWinOnBoard(testBoard, symbol);
}

function checkWin(symbol) {
    return checkWinOnBoard(gameBoard, symbol);
}

function checkWinOnBoard(board, symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === symbol)
    );
}

function magicallyWin() {
    // If somehow it's a draw, magically give the player a win
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach(cell => {
        if (cell.dataset.symbol === computerSymbol) {
            cell.textContent = playerSymbol;
            cell.dataset.symbol = playerSymbol;
        }
    });
    showWinMessage();
}

function showWinMessage() {
    document.getElementById('winMessage').classList.remove('hidden');
    
    // Create hearts burst
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '2rem';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'burstUp 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// ===== PAGE 5: VALENTINE QUESTION =====
function initializeValentineQuestion() {
    const noButton = document.getElementById('noButton');
    noButtonAttempts = 0;
    
    // Reset button
    noButton.style.transform = '';
    noButton.style.opacity = '1';
    noButton.classList.remove('shrinking');
    
    // Add hover effect to No button
    noButton.addEventListener('mouseenter', handleNoButtonHover);
    noButton.addEventListener('click', handleNoButtonClick);
}

function handleNoButtonHover() {
    const noButton = document.getElementById('noButton');
    const hint = document.getElementById('hint');
    
    noButtonAttempts++;
    
    if (noButtonAttempts === 1) {
        // Move button away
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
        hint.textContent = 'The button is shy... 😊';
    } else if (noButtonAttempts === 2) {
        // Move again
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = (Math.random() - 0.5) * 300;
        noButton.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.8)`;
        hint.textContent = 'It really doesn\'t want to be clicked... 🤔';
    } else if (noButtonAttempts === 3) {
        // Start shrinking
        noButton.classList.add('shrinking');
        hint.textContent = 'I give up... there\'s only one answer anyway ❤️';
        
        setTimeout(() => {
            noButton.style.display = 'none';
        }, 2000);
    }
}

function handleNoButtonClick(e) {
    e.preventDefault();
    const hint = document.getElementById('hint');
    hint.textContent = 'Nice try, but that button doesn\'t work! 😏';
}

function sayYes() {
    const heartsBurst = document.getElementById('heartsBurst');
    heartsBurst.classList.remove('hidden');
    
    // Create lots of hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'burst-heart';
            heart.textContent = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            heartsBurst.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50);
    }
    
    // Console message
    console.log('🎉 SHE SAID YES!');
    console.log('💖 Best decision ever!');
    
    setTimeout(() => {
        goToPage(6);
    }, 2500);
}

// ===== PAGE 6: MUSIC CONTROL =====
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const button = document.getElementById('musicButton');
    
    if (music.paused) {
        music.play();
        button.textContent = 'Pause Music';
    } else {
        music.pause();
        button.textContent = 'Play Music';
    }
}

// ===== CURSOR HEARTS EFFECT =====
function initializeCursorHearts() {
    const container = document.getElementById('cursor-hearts');
    let heartCount = 0;
    
    document.addEventListener('mousemove', (e) => {
        // Only create hearts occasionally (not every pixel)
        heartCount++;
        if (heartCount % 10 !== 0) return;
        
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.textContent = '❤️';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    });
}

// ===== EASTER EGG =====
function addSamNameListeners() {
    document.addEventListener('click', (e) => {
        const text = e.target.textContent || '';
        if (text.includes('Sam') && !e.target.classList.contains('doodle-button')) {
            showEasterEgg();
        }
    });
}

function showEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    easterEgg.classList.remove('hidden');
    
    console.log('🎉 Easter egg found!');
    console.log('💖 Sam really cares about you!');
}

function closeEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    easterEgg.classList.add('hidden');
}

// ===== RELOAD MESSAGE =====
window.addEventListener('beforeunload', (e) => {
    if (currentPage > 1) {
        e.preventDefault();
        e.returnValue = 'Reloading won\'t change my answer. I still love you! ❤️';
        return e.returnValue;
    }
});

// ===== CONSOLE MESSAGES =====
console.log('%c💖 Welcome to the Doodle Love Valentine Website! 💖', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%cMade with love by Sam ❤️', 'color: #ffb3ba; font-size: 14px;');
console.log('%cTip: Click on "Sam" anywhere to find a secret! 🎁', 'color: #c7b8ea; font-size: 12px;');
