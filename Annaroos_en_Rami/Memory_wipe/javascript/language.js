const translations = {
  nl: {
    pageTitles: {
      home: "Memory Wipe - Kies je niveau",
      game: "Memory Wipe",
      tutorial: "Memory Wipe - Tutorial",
      results: "Memory Wipe - Resultaten"
    },
    homeTitle: "Kies je niveau",
    homeIntro: "Hoe moeilijk wil je het maken?",
    difficultyGroup: "Kies een moeilijkheid",
    tutorialLink: "Bekijk de tutorial",
    tutorialTitle: "Tutorial",
    tutorialIntro: "Zo werkt het spel",
    tutorialStep1: "Kies Easy, Medium of Hard. Elke modus heeft een eigen raster.",
    tutorialStep2: "Elke ronde begint met een aftelling van 3. Bij “Start!” verschijnt de pijl.",
    tutorialStep3: "Let op de pijl: die gaat van links naar rechts en vervolgt op de volgende rij. Het vak onder de pijl krijgt een omlijning.",
    tutorialStep4: "Probeer de volgorde van de vakken te onthouden. Na elke ronde kun je doorgaan naar de volgende.",
    tutorialStep5: "Na 3 rondes kun je je resultaten bekijken.",
    backToModes: "Terug naar de moduskeuze",
    backToMenu: "Terug naar het menu",
    grid2by4: "Een raster van 2 bij 4",
    grid3by4: "Een raster van 3 bij 4",
    grid2by4Label: "Raster met 2 rijen en 4 kolommen",
    grid3by4Label: "Raster met 3 rijen en 4 kolommen",
    roundStatusInitial: "Ronde 1 van 3",
    roundStatus: (round, total) => `Ronde ${round} van ${total}`,
    start: "Start!",
    roundComplete: "Ronde afgerond",
    nextRound: "Volgende ronde",
    viewResults: "Bekijk resultaten",
    microphoneNotice: "De microfoon wordt gevraagd bij de start. Opnames blijven in deze browsersessie.",
    microphoneUnsupported: "Opnemen wordt niet ondersteund. Gebruik een recente browser via HTTPS of localhost.",
    microphonePermissionError: "Geen microfoontoegang. Geef toestemming in de browser en probeer opnieuw.",
    microphoneDeviceError: "Geen microfoon gevonden. Sluit een microfoon aan en probeer opnieuw.",
    recordingError: "De opname is mislukt. Controleer je microfoon en probeer opnieuw.",
    recordingNow: (round) => `Ronde ${round} wordt opgenomen...`,
    recordingReady: (round) => `De opname van ronde ${round} is klaar.`,
    recordingEmpty: "Er is geen audio opgenomen. Controleer je microfoon en probeer opnieuw.",
    playRecordingUnavailable: "Luister naar opname",
    playRecording: (round) => `Luister naar opname van ronde ${round}`,
    playbackError: "De opname kon niet worden afgespeeld.",
    resultsTitle: "Resultaten",
    resultsIntro: "Alle 3 rondes zijn afgerond.",
    resultsMode: (mode) => `Alle 3 rondes van ${mode} zijn afgerond.`,
    resultsListLabel: "Resultaten per ronde",
    round1: "Ronde 1",
    round2: "Ronde 2",
    round3: "Ronde 3",
    completed: "Afgerond",
    switchLanguage: "Taal wijzigen naar Engels",
    switchLanguageLabel: "English"
  },
  en: {
    pageTitles: {
      home: "Memory Wipe - Choose your level",
      game: "Memory Wipe",
      tutorial: "Memory Wipe - Tutorial",
      results: "Memory Wipe - Results"
    },
    homeTitle: "Choose your level",
    homeIntro: "How difficult would you like it?",
    difficultyGroup: "Choose a difficulty",
    tutorialLink: "View the tutorial",
    tutorialTitle: "Tutorial",
    tutorialIntro: "How to play",
    tutorialStep1: "Choose Easy, Medium, or Hard. Each mode has its own grid.",
    tutorialStep2: "Each round starts with a countdown from 3. The arrow appears at “Start!”",
    tutorialStep3: "Watch the arrow: it moves from left to right, then continues on the next row. The cell under the arrow gets an outline.",
    tutorialStep4: "Try to remember the order of the cells. After each round, you can continue to the next one.",
    tutorialStep5: "After 3 rounds, you can view your results.",
    backToModes: "Back to mode selection",
    backToMenu: "Back to the menu",
    grid2by4: "A 2 by 4 grid",
    grid3by4: "A 3 by 4 grid",
    grid2by4Label: "Grid with 2 rows and 4 columns",
    grid3by4Label: "Grid with 3 rows and 4 columns",
    roundStatusInitial: "Round 1 of 3",
    roundStatus: (round, total) => `Round ${round} of ${total}`,
    start: "Start!",
    roundComplete: "Round complete",
    nextRound: "Next round",
    viewResults: "View results",
    microphoneNotice: "Microphone access is requested when a round starts. Recordings stay in this browser session.",
    microphoneUnsupported: "Recording is not supported. Use a recent browser over HTTPS or localhost.",
    microphonePermissionError: "Microphone access denied. Allow access in your browser and try again.",
    microphoneDeviceError: "No microphone found. Connect a microphone and try again.",
    recordingError: "Recording failed. Check your microphone and try again.",
    recordingNow: (round) => `Recording round ${round}...`,
    recordingReady: (round) => `Recording for round ${round} is ready.`,
    recordingEmpty: "No audio was recorded. Check your microphone and try again.",
    playRecordingUnavailable: "Play recording",
    playRecording: (round) => `Play round ${round} recording`,
    playbackError: "The recording could not be played.",
    resultsTitle: "Results",
    resultsIntro: "All 3 rounds are complete.",
    resultsMode: (mode) => `All 3 rounds of ${mode} are complete.`,
    resultsListLabel: "Results by round",
    round1: "Round 1",
    round2: "Round 2",
    round3: "Round 3",
    completed: "Complete",
    switchLanguage: "Switch language to Dutch",
    switchLanguageLabel: "Nederlands"
  }
};

const savedLanguage = window.localStorage.getItem("memoryWipeLanguage");
let currentLanguage = savedLanguage === "en" ? "en" : "nl";

function translate(key, ...values) {
  const translation = translations[currentLanguage][key];
  return typeof translation === "function" ? translation(...values) : translation;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.body.dataset.language = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });

  const page = document.body.dataset.page;
  const pageTitle = translations[currentLanguage].pageTitles[page];
  const modeTitle = document.querySelector(".game h1");
  document.title = page === "game" && modeTitle
    ? `${pageTitle} - ${modeTitle.textContent}`
    : pageTitle;

  const resultMode = document.querySelector("#result-mode");
  if (resultMode) {
    const mode = new URLSearchParams(window.location.search).get("mode");
    resultMode.textContent = mode ? translate("resultsMode", mode) : translate("resultsIntro");
  }

  const languageButton = document.querySelector(".language-toggle");
  if (languageButton) {
    languageButton.textContent = translate("switchLanguageLabel");
    languageButton.setAttribute("aria-label", translate("switchLanguage"));
  }
}

const languageButton = document.querySelector(".language-toggle");
if (languageButton) {
  languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "nl" ? "en" : "nl";
    window.localStorage.setItem("memoryWipeLanguage", currentLanguage);
    applyLanguage();
  });
}

window.memoryWipeLanguage = {
  t: translate
};

applyLanguage();
