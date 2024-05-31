const prompt = require("prompt-sync")(); // get user input

// Variables globales
const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
  '€': 2,
  '£': 4,
  '$': 6,
  '7': 8
};

const SYMBOLS_VALUES = {
  '€': 5,
  '£': 4,
  '$': 3,
  '7': 2
};

// Fonction pour que le joueur dépose l'argent.
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Entrez un montant: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Veuillez écrire un montant valide ! Réessayez");
    } else {
      return numberDepositAmount;
    }
  }
};

// Fonction qui collecte la somme pariée
const getBet = (balance) => {
  while (true) {
    const bet = prompt("Entrez votre mise: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0) {
      console.log("Mise invalide ! Réessayez");
    } else if (numberBet > balance) {
      console.log("Vous n'avez pas assez d'argent pour cette mise. Réessayez.");
    } else {
      return numberBet;
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

// Fonction qui transpose nos colonnes en lignes
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLUMNS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

// Fonction qui affiche les lignes avec ses symboles
const printRows = (rows) => {
  for (const row of rows) {
    console.log(row.join(" | "));
  }
};

// Fonction qui check si le joueur a gagné
const getWin = (rows, bet) => {
  let winnings = 0;

  for (const row of rows) {
    if (row.every(symbol => symbol === row[0])) {
      winnings += bet * SYMBOLS_VALUES[row[0]];
    }
  }

  return winnings;
};

// Fonction qui permet de jouer
const game = () => {
  let balance = deposit();

  while (balance > 0) {
    console.log("Votre solde est de " + balance + "€");
    const bet = getBet(balance);
    balance -= bet;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWin(rows, bet);
    balance += winnings;
    console.log("Vous avez gagné " + winnings + "€");
    console.log("Votre solde est maintenant de " + balance + "€");

    let playAgain;
    while (true) {
      playAgain = prompt("Voulez-vous rejouer ? (oui/non) ").toLowerCase();
      if (playAgain === "oui" || playAgain === "non") {
        break;
      }
      console.log("Saisie incorrecte, réessayez.");
    }

    if (playAgain === "non") {
      console.log("Merci d'avoir joué, à très vite !");
      break;
    }

    if (balance <= 0) {
      console.log("Votre solde est vide...");
      while (true) {
        playAgain = prompt("Voulez-vous rejouer ? (oui/non) ").toLowerCase();
        if (playAgain === "oui" || playAgain === "non") {
          break;
        }
        console.log("Saisie incorrecte, réessayez.");
      }
      if (playAgain === "non") {
        console.log("Merci d'avoir joué, à très vite !");
        break;
      } else {
        balance = deposit();
      }
    }
  }
};

game(); // Lance le jeu
