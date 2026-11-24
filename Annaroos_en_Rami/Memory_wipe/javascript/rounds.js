const statusText = document.querySelector(".round-status");
const countdownText = document.querySelector(".round-countdown");
const audioStatusText = document.querySelector(".audio-status");
const roundButton = document.querySelector(".round-button");
const audioPlaybackButton = document.querySelector(".audio-playback-button");
const roundAudio = document.querySelector(".round-audio");
const grid = document.querySelector(".memory-grid");
const cells = Array.from(grid.querySelectorAll(".memory-cell"));
const imageCells = cells.filter((cell) => cell.matches(
  ".memory-cell--cat, .memory-cell--hat, .memory-cell--bat"
));
const maskedCells = new Set();
let currentRound = 1;
const totalRounds = 3;
let activeRecording = null;
let recordingUrl = null;

const pointer = document.createElement("span");
pointer.className = "memory-pointer";
pointer.setAttribute("aria-hidden", "true");
pointer.innerHTML = '<svg viewBox="0 0 30 26" focusable="false"><path d="M3 2 Q5 0 7 2 L15 11 L23 2 Q25 0 27 2 Q29 3 27 6 L17 23 Q15 26 13 23 L3 6 Q1 4 3 2 Z"></path></svg>';
grid.append(pointer);

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function getRecordingErrorKey(error) {
  if (error.name === "NotAllowedError" || error.name === "SecurityError") {
    return "microphonePermissionError";
  }
  if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
    return "microphoneDeviceError";
  }
  return "recordingError";
}

async function startAudioRecording(round) {
  if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function" ||
      typeof MediaRecorder === "undefined") {
    audioStatusText.textContent = window.memoryWipeLanguage.t("microphoneUnsupported");
    return null;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const recording = { recorder, stream, chunks: [], failed: false };

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recording.chunks.push(event.data);
      }
    });

    recorder.addEventListener("error", () => {
      recording.failed = true;
      audioStatusText.textContent = window.memoryWipeLanguage.t("recordingError");
    });

    recorder.start();
    activeRecording = recording;
    audioPlaybackButton.disabled = true;
    audioStatusText.textContent = window.memoryWipeLanguage.t("recordingNow", round);
    return recording;
  } catch (error) {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    audioStatusText.textContent = window.memoryWipeLanguage.t(getRecordingErrorKey(error));
    return null;
  }
}

async function stopAudioRecording(recording, round) {
  if (!recording) {
    return;
  }

  await new Promise((resolve) => {
    const finish = () => {
      recording.stream.getTracks().forEach((track) => track.stop());
      activeRecording = null;

      if (!recording.failed) {
        const audioBlob = new Blob(recording.chunks, { type: recording.recorder.mimeType });
        if (audioBlob.size > 0) {
          if (recordingUrl) {
            URL.revokeObjectURL(recordingUrl);
          }
          recordingUrl = URL.createObjectURL(audioBlob);
          roundAudio.src = recordingUrl;
          audioPlaybackButton.textContent = window.memoryWipeLanguage.t("playRecording", round);
          audioPlaybackButton.disabled = false;
          audioStatusText.textContent = window.memoryWipeLanguage.t("recordingReady", round);
        } else {
          audioStatusText.textContent = window.memoryWipeLanguage.t("recordingEmpty");
        }
      }
      resolve();
    };

    recording.recorder.addEventListener("stop", finish, { once: true });
    if (recording.recorder.state === "inactive") {
      finish();
    } else {
      recording.recorder.stop();
    }
  });
}

function maskRandomImageCells(count) {
  if (document.body.dataset.language !== "en" || !document.querySelector('.game[data-mode="easy"]')) {
    return;
  }

  const availableCells = imageCells.filter((cell) => !maskedCells.has(cell));
  for (let remaining = Math.min(count, availableCells.length); remaining > 0; remaining -= 1) {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const [cell] = availableCells.splice(randomIndex, 1);
    maskedCells.add(cell);
    cell.classList.add("memory-cell--question");
  }
}

async function startRound() {
  if (currentRound > 1) {
    maskRandomImageCells(2);
  }

  roundButton.disabled = true;
  pointer.hidden = true;

  for (let count = 3; count > 0; count -= 1) {
    countdownText.textContent = count;
    await wait(1000);
  }

  countdownText.textContent = window.memoryWipeLanguage.t("start");
  await wait(600);
  const recording = await startAudioRecording(currentRound);
  pointer.hidden = false;

  for (const cell of cells) {
    const gridBounds = grid.getBoundingClientRect();
    const cellBounds = cell.getBoundingClientRect();
    const left = cellBounds.left - gridBounds.left + (cellBounds.width - pointer.offsetWidth) / 2;
    const top = cellBounds.top - gridBounds.top + 4;

    cells.forEach((currentCell) => currentCell.classList.remove("memory-cell--current"));
    cell.classList.add("memory-cell--current");
    pointer.style.transform = `translate(${left}px, ${top}px)`;
    await wait(650);
  }

  cells.forEach((cell) => cell.classList.remove("memory-cell--current"));
  await stopAudioRecording(recording, currentRound);
  countdownText.textContent = window.memoryWipeLanguage.t("roundComplete");
  roundButton.disabled = false;
  roundButton.textContent = window.memoryWipeLanguage.t(
    currentRound < totalRounds ? "nextRound" : "viewResults"
  );
}

roundButton.addEventListener("click", async () => {
  if (currentRound < totalRounds) {
    currentRound += 1;
    statusText.textContent = window.memoryWipeLanguage.t("roundStatus", currentRound, totalRounds);
    await startRound();
  } else {
    const mode = document.querySelector("h1").textContent.toLowerCase();
    window.location.href = `results.html?mode=${encodeURIComponent(mode)}`;
  }
});

audioPlaybackButton.addEventListener("click", async () => {
  try {
    roundAudio.currentTime = 0;
    await roundAudio.play();
  } catch (error) {
    audioStatusText.textContent = window.memoryWipeLanguage.t("playbackError");
  }
});

window.addEventListener("pagehide", () => {
  if (activeRecording) {
    activeRecording.stream.getTracks().forEach((track) => track.stop());
  }
  if (recordingUrl) {
    URL.revokeObjectURL(recordingUrl);
  }
});

startRound();
