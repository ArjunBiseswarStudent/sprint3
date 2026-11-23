function setupPhysicalGame(minutes, reward) {
  const roundDuration = minutes * 60 * 1000;
  const pointsKey = 'userPoints';
  const timer = document.getElementById('timer');
  const toggleButton = document.getElementById('toggle-timer');
  const resetButton = document.getElementById('reset-timer');
  const winButton = document.getElementById('win');
  const lossButton = document.getElementById('loss');
  const pointsDisplay = document.getElementById('user-points');
  const status = document.getElementById('game-status');

  let remaining = roundDuration;
  let deadline = 0;
  let intervalId = null;
  let finished = false;

  function readPoints() {
    return Number.parseInt(localStorage.getItem(pointsKey), 10) || 0;
  }

  function renderTimer() {
    const totalSeconds = Math.ceil(remaining / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
  }

  function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function updateTimer() {
    remaining = Math.max(0, deadline - Date.now());
    renderTimer();
    if (remaining === 0) {
      stopTimer();
      toggleButton.textContent = 'Start / Pauze';
      toggleButton.disabled = true;
      status.textContent = 'De tijd is om. Kies de uitslag van het potje.';
    }
  }

  toggleButton.addEventListener('click', () => {
    if (intervalId !== null) {
      updateTimer();
      stopTimer();
      if (remaining > 0) toggleButton.textContent = 'Hervatten';
      return;
    }

    deadline = Date.now() + remaining;
    intervalId = setInterval(updateTimer, 100);
    toggleButton.textContent = 'Pauze';
  });

  resetButton.addEventListener('click', () => {
    stopTimer();
    remaining = roundDuration;
    finished = false;
    toggleButton.textContent = 'Start / Pauze';
    toggleButton.disabled = false;
    winButton.disabled = false;
    lossButton.disabled = false;
    status.textContent = '';
    renderTimer();
  });

  function finishRound(won) {
    if (finished) return;

    if (won) {
      const points = readPoints() + reward;
      localStorage.setItem(pointsKey, points);
      pointsDisplay.textContent = points;
    }

    finished = true;
    if (intervalId !== null) updateTimer();
    stopTimer();
    toggleButton.disabled = true;
    winButton.disabled = true;
    lossButton.disabled = true;
    status.textContent = won ? `Je hebt ${reward} punten verdiend!` : 'Je medespeler heeft gewonnen.';
  }

  winButton.addEventListener('click', () => finishRound(true));
  lossButton.addEventListener('click', () => finishRound(false));
  window.addEventListener('pageshow', () => {
    pointsDisplay.textContent = readPoints();
  });
}
