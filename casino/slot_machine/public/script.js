// Variables globales
const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
  'bar': 3,
  '7': 3,
  'cerise': 4,
  'raisin': 6,
  'fraise': 8
};

const SYMBOLS_VALUES = {
  '7': 5,
  'cerise': 4,
  'raisin': 3,
  'fraise': 2
};

let balance = 0;

// Fonction pour démarrer le jeu en déposant de l'argent
const startGame = () => {
  const depositAmount = parseFloat(document.getElementById('deposit-amount').value);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Veuillez écrire un montant valide !");
  } else {
    balance = depositAmount;
    updateBalance();
    document.getElementById('play-again').style.display = 'none'; // Cache le bouton "rejouer?"
    document.getElementById('bet-amount').focus(); // Tabulation auto vers bouton suivant
  }
};

// Fonction pour mettre à jour le solde affiché
const updateBalance = () => {
  document.getElementById('balance').innerText = `Votre solde est de ${balance}€`;
};

// Fonction pour placer une mise
const placeBet = () => {
  const betAmount = parseFloat(document.getElementById('bet-amount').value);
  if (isNaN(betAmount) || betAmount <= 0) {
    alert("Mise invalide ! Réessayez");
  } else if (betAmount > balance) {
    alert("Vous n'avez pas assez d'argent pour cette mise. Réessayez.");
  } else {
    balance -= betAmount;
    updateBalance();
    const reels = spin();
    displayReels(reels);
    const winnings = getWin(reels, betAmount);
    balance += winnings;
    updateBalance();
    document.getElementById('result').innerText = `Vous avez gagné ${winnings}€`;

    if (balance <= 0) {
      document.getElementById('play-again').style.display = 'block'; // Afficher le bouton "rejouer"
    } else {
      document.getElementById('play-again').style.display = 'none'; // Cache le bouton "rejouer" si solde > 0
    }
  }
};

// Fonction qui lance la machine à sous aléatoirement
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLUMNS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

// Fonction qui affiche les lignes avec ses symboles
const displayReels = (rows) => {
  const reelsDiv = document.getElementById('reels');
  reelsDiv.innerHTML = '';
  for (const row of rows) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'reel';
    rowDiv.innerHTML = row.map(symbol => `<img src="images/${symbol}.svg" alt="${symbol}" />`).join('');
    reelsDiv.appendChild(rowDiv);
  }
};

// Fonction qui check si le joueur a gagné + bonus si "bar"
const getWin = (reels, bet) => {
  let winnings = 0;
  let barCount = 0;

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    const rowSymbols = reels.map(reel => reel[rowIndex]);
    if (rowSymbols.every(symbol => symbol === rowSymbols[0])) {
      winnings += bet * SYMBOLS_VALUES[rowSymbols[0]];
    }
    barCount += rowSymbols.filter(symbol => symbol === 'bar').length;
  }

  if (winnings > 0 && barCount > 0) {
    winnings *= barCount;
  }

  return winnings;
};

// Fonction pour rejouer
const playAgain = () => {
  balance = 0;
  document.getElementById('deposit-amount').value = '';
  document.getElementById('bet-amount').value = '';
  document.getElementById('balance').innerText = '';
  document.getElementById('reels').innerHTML = '';
  document.getElementById('result').innerText = '';
  document.getElementById('play-again').style.display = 'none';
};

// Ajout des gestionnaires d'événements pour la touche "Entrée"
document.getElementById('deposit-amount').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    startGame();
  }
});

document.getElementById('bet-amount').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    placeBet();
  }
});
