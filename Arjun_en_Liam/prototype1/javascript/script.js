// Haal opgeslagen punten op (start standaard op 0)
let points = parseInt(localStorage.getItem('userPoints')) || 0;

// Toon het actuele saldo direct bij het laden van de pagina
document.addEventListener('DOMContentLoaded', () => {
  const pointsEl = document.getElementById('user-points');
  if (pointsEl) pointsEl.innerText = points;
});

function openGame(gameId, seconds, rewardPt) {
  alert(`Je hebt gekozen om ${gameId} te starten!`);
}

function buyItem(itemName, cost) {
  if (points >= cost) {
    points -= cost;
    localStorage.setItem('userPoints', points);
    document.getElementById('user-points').innerText = points;
    alert(`Gefeliciteerd! Je hebt '${itemName}' ontgrendeld!`);
  } else {
    alert("Onvoldoende punten voor deze beloning! Speel spellen om punten te verdienen.");
  }
}