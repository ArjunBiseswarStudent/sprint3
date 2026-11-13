let points = parseInt(localStorage.getItem('userPoints')) || 0;
let timerSeconds = 300;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  const pointsEl = document.getElementById('user-points');
  if (pointsEl) pointsEl.innerText = points;
  updateTimerDisplay();
});

function updateTimerDisplay() {
  let m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  let s = (timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer').innerText = `${m}:${s}`;
}

function toggleTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  } else {
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        alert("Tijd is om!");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 300;
  updateTimerDisplay();
}

function finishGame(won, rewardPt) {
  clearInterval(timerInterval);
  if (won) {
    points += rewardPt;
    localStorage.setItem('userPoints', points);
    alert(`Gefeliciteerd! Je hebt ${rewardPt} PT gewonnen!`);
  } else {
    alert("Helaas! Volgende keer beter.");
  }
  window.location.href = "../../index.html";
}