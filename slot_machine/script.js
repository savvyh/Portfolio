const prompt = require("prompt-sync")(); // get user input

// variables globale
const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
  '€': 2,
  '£': 4,
  '$': 6,
  '7': 8
}

const SYMBOLS_VALUES = {
  '€': 5,
  '£': 4,
  '$': 3,
  '7': 2
}

// Créer une fonction pour que le joueur dépose l'argent.
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

// Créer une fonction qui collecte la somme pariée
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

// Créer une fonction qui lance la machine à sous aléatoirement
const spin = () => {
  const symbols = []; // Crée un tableau vide pour stocker les symboles
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // Ajoute le symbole à l'array "symbols" autant de fois qu'il y a de "count"
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = []; // Crée un tableau vide pour stocker les résultats des "reels" (bobines)
  for (let i =0; i < COLUMNS; i++) {
    reels.push([]); // Ajoute un tableau vide au tableau vide "reels" à chaque colonne existante
    const reelSymbols = [...symbols]; // Crée une copie de l'array de symboles pour cette colonne
    for (let j = 0; j < ROWS; j++) {
        // Génère un index aléatoire pour sélectionner un symbole de l'array "reelSymbols"
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex]; // Sélectionne un symbole aléatoire à partir de l'array "reelSymbols"

      reels[i].push(selectedSymbol); // Ajoute le symbole sélectionné à la colonne actuelle des "reels"
      reelSymbols.splice(randomIndex, 1); // Supprime le symbole sélectionné de l'array "reelSymbols" pour éviter les doublons
    }
  }

  return reels; // Retourne les "reels" avec les symboles sélectionnés pour chaque colonne et rangée
};

// Fonction qui transpose nos colonnes en lignes
const transpose = (reels) => {
  const rows = [];
  for (let i= 0; i < ROWS; i++) { // Itère jusqu'au nombre de ligne (3 lignes)
    rows.push([]); // Ajoute un tableau vide pour chaque ligne
    for (let j= 0; j < COLUMNS; j++) { // Itère sur le nombre de colonne (3 colonnes)
      rows[i].push(reels[j][i]); // Ajoute à la ligne actuelle (i), le symbole récupéré dans la colonne (j) de la ligne (i)
    }
  }
  return rows;
}

// Fonction qui affiche les lignes avec ses symboles
const printRows = (rows) => {
  for (const row of rows) { // Parcours chaque ligne du tableau "rows" (3 lignes)
    let rowString = ""; // représente la ligne affichée
    for (const [i, symbol] of row.entries()) { // Parcours chaque symbole de la ligne actuelle (row), récupère le symbole à tel index
      rowString += symbol // Ajoute le symbole à la ligne
      if (i != row.length - 1) { // Vérifie si l'élément actuel n'est pas le dernier de la ligne. Si ce n'est pas le cas, cela signifie qu'il y a encore des symboles à ajouter après celui-ci
        rowString += " | "
      }
    }
    console.log(rowString)
  }
}

// Fonction qui check si le joueur a gagné
const getWin = (rows, bet) => {
   let winnings = 0;

   for (const row of rows) { // Itère sur chaque ligne
    let allSame = true;

    for (const symbol of row) { // Itère sur chaque symbole de la ligne
      if (symbol != row[0]) { // Vérifie si le symbole actuel est différent du premier symbole de la ligne. Si c'est le cas, cela signifie que tous les symboles de la ligne ne sont pas les mêmes.
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[row[0]]; // Si tous les symboles sont identiques, le gain est augmenté en multipliant la mise (bet) par la valeur du symbole (stockée dans SYMBOLS_VALUES) de la première position (row[0]) de la ligne.
    }
   }
   return winnings;
}

// Fonction qui permet de jouer
const game = () => {
  let balance = deposit(); // enregistre le montant valide du joueur (balance entre sa mise et son solde)

  while (balance > 0) { // Permet de jouer tant que le joueur a de l'argent
    console.log("Votre solde est de " + balance + "€");
    const bet = getBet(balance); // enregistre la mise du joueur
    balance -= bet; // soustrait la mise du solde du joueur
    const reels = spin(); // lance les bobines
    const rows = transpose(reels); // transpose les résultats des bobines
    printRows(rows); // affiche les résultats
    const winnings = getWin(rows, bet); // récupère les gains
    balance += winnings; // ajoute les gains au solde du joueur
    console.log("Vous avez gagné " + winnings.toString() + "€");
    console.log("Votre solde est maintenant de " + balance + "€"); // Affiche le solde après chaque résultat

    // Play again ?
    const playAgain = prompt("Voulez-vous rejouer ? (oui/non) ");

    if (playAgain.toLowerCase() == "non") {
      console.log("Merci d'avoir joué, à très vite !");
      break;
    }
    if (playAgain.toLowerCase() !== "oui" && playAgain.toLowerCase() !== "non") {
      console.log("Saisie incorrect, Réessayez");
      const retry = prompt("Voulez-vous rejouer ? (oui/non) "); // Repropose au joueur de rejouer avec 'retry'

      if (retry.toLowerCase() == "non") {
        console.log("Merci d'avoir joué, à très vite !");
        break;
      }
    }

    if (balance <= 0) {
      console.log("Votre solde est vide...");
      const retry = prompt("Voulez-vous rejouer ? (oui/non) ");
      if (retry.toLowerCase() == "non") {
        console.log("Merci d'avoir joué, à très vite !");
        break;
      } else {
        game();
      }
    }
  }
};

game(); // Lance le jeu
