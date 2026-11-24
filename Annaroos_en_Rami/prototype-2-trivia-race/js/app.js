// app.js: de spellogica. De inhoud (feitjes, hints) staat in data.js.

const SPEELTIJD = 60; // seconden per ronde

// Alles wat tijdens een ronde verandert, zit in één object.
// Er wordt niets opgeslagen: sluit je de pagina, dan is alles weg (bewust, vanwege privacy).
let spel = {
  categorie: null,
  gevonden: [],      // de feitjes die de speler al heeft genoemd
  restTijd: SPEELTIJD,
  timer: null,
  hintVolgorde: [],  // gehusselde volgorde van de hints
  hintNummer: 0
};

// ---------- Hulpfuncties voor het scherm ----------

function toonScherm(id) {
  // Verberg alle schermen en toon alleen het gevraagde scherm.
  document.querySelectorAll(".scherm").forEach(s => s.classList.remove("actief"));
  document.getElementById(id).classList.add("actief");
}

function vulMossyTeksten() {
  // De tekstballonnen komen uit data.js, zodat je de teksten op één plek aanpast.
  document.querySelectorAll("[data-mossy]").forEach(el => {
    el.textContent = MOSSY_TEKSTEN[el.dataset.mossy];
  });
}

function toonFeedback(tekst, isGoed) {
  const veld = document.getElementById("feedback");
  veld.textContent = tekst;
  veld.className = isGoed ? "feedback goed" : "feedback";
}

function husselen(lijst) {
  // Een simpele, eerlijke manier om een lijst door elkaar te gooien (Fisher-Yates).
  const kopie = [...lijst];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

// ---------- Categoriekeuze ----------

function maakCategorieKnoppen() {
  const lijst = document.getElementById("categorie-lijst");
  CATEGORIEEN.forEach(cat => {
    const knop = document.createElement("button");
    knop.className = "categorie-knop";
    knop.innerHTML = `<strong>${cat.naam}</strong><span>${cat.uitleg}</span>`;
    knop.addEventListener("click", () => startSpel(cat));
    lijst.appendChild(knop);
  });
}

// ---------- Het spel ----------

function startSpel(categorie) {
  spel.categorie = categorie;
  spel.gevonden = [];
  spel.restTijd = SPEELTIJD;
  spel.hintVolgorde = husselen(categorie.hints);
  spel.hintNummer = 0;

  document.getElementById("spel-titel").textContent = categorie.naam;
  document.getElementById("gevonden-lijst").innerHTML = "";
  document.getElementById("score-tekst").textContent = "0";
  document.getElementById("hulp-vak").classList.add("verborgen");
  toonFeedback("", false);

  const veld = document.getElementById("antwoord-veld");
  veld.disabled = false;
  veld.value = "";

  toonScherm("scherm-spel");
  veld.focus();
  startTimer();
}

function startTimer() {
  clearInterval(spel.timer); // voorkomt twee timers tegelijk
  updateTimer();
  spel.timer = setInterval(() => {
    spel.restTijd--;
    updateTimer();
    if (spel.restTijd <= 0) eindeSpel();
  }, 1000);
}

function updateTimer() {
  document.getElementById("timer-tekst").textContent = spel.restTijd;
  const procent = (spel.restTijd / SPEELTIJD) * 100;
  document.getElementById("timer-balk").style.width = procent + "%";
}

// ---------- Antwoorden beoordelen ----------

function normaliseer(tekst) {
  // Hoofdletters en accenten weghalen, zodat "Slaap" en "slaap" en "ë/e" gelijk zijn.
  return tekst.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

function zoekFeitjes(antwoord) {
  // Geeft alle feitjes terug waarvan een trefwoord in het antwoord voorkomt.
  const tekst = normaliseer(antwoord);
  return spel.categorie.feitjes.filter(feitje =>
    feitje.trefwoorden.some(woord => tekst.includes(normaliseer(woord)))
  );
}

function verwerkAntwoord(antwoord) {
  if (antwoord.trim().length < 2) return;

  const treffers = zoekFeitjes(antwoord);
  if (treffers.length === 0) {
    // Bewust vriendelijk: de lijst met trefwoorden is niet perfect.
    toonFeedback("Die herken ik nog niet. Probeer het met een ander woord.", false);
    return;
  }

  // Zijn er treffers die nog niet geteld zijn? Dan telt de eerste nieuwe.
  const nieuw = treffers.find(f => !spel.gevonden.includes(f));
  if (!nieuw) {
    toonFeedback("Dat had je al genoemd.", false);
    return;
  }

  spel.gevonden.push(nieuw);
  document.getElementById("score-tekst").textContent = spel.gevonden.length;
  const chip = document.createElement("li");
  chip.textContent = nieuw.label;
  document.getElementById("gevonden-lijst").appendChild(chip);
  toonFeedback("Goed zo: " + nieuw.label, true);
}

// ---------- Hulplijn ----------

function toonHint() {
  // De hints komen één voor één in gehusselde volgorde. Een deel is bewust
  // onjuist (zie data.js), maar de speler krijgt dat niet te horen.
  const hint = spel.hintVolgorde[spel.hintNummer % spel.hintVolgorde.length];
  spel.hintNummer++;

  document.getElementById("hulp-hint").textContent = hint.tekst;
  const opmerking = MOSSY_NA_HINT[Math.floor(Math.random() * MOSSY_NA_HINT.length)];
  document.getElementById("hulp-na").textContent = opmerking;
  document.getElementById("hulp-vak").classList.remove("verborgen");
}

// ---------- Einde ----------

function eindeSpel() {
  clearInterval(spel.timer);
  document.getElementById("antwoord-veld").disabled = true;

  const totaal = spel.categorie.feitjes.length;
  const score = spel.gevonden.length;

  document.getElementById("einde-score").textContent = score;
  document.getElementById("einde-totaal").textContent = totaal;
  // Noem de gekozen dimensie in de kop boven de feitjes die nog niet genoemd zijn.
  document.getElementById("einde-dimensie").textContent = spel.categorie.naam;

  // Mossy reageert op de score.
  let niveau = "laag";
  if (score >= 7) niveau = "hoog";
  else if (score >= 3) niveau = "midden";
  document.getElementById("einde-ballon").textContent = MOSSY_TEKSTEN.einde[niveau];

  // Laat de feitjes zien die gemist zijn, zodat de speler er iets van leert.
  const gemist = spel.categorie.feitjes.filter(f => !spel.gevonden.includes(f));
  const lijst = document.getElementById("gemist-lijst");
  lijst.innerHTML = "";
  gemist.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f.label;
    lijst.appendChild(li);
  });

  toonScherm("scherm-einde");
}

// ---------- Alles aan elkaar knopen ----------

function init() {
  vulMossyTeksten();
  maakCategorieKnoppen();

  document.getElementById("knop-start").addEventListener("click", () => toonScherm("scherm-categorie"));
  document.getElementById("knop-opnieuw").addEventListener("click", () => toonScherm("scherm-categorie"));
  document.getElementById("knop-klaar").addEventListener("click", eindeSpel);
  document.getElementById("knop-hulp").addEventListener("click", toonHint);

  // Het formulier vangt de Enter-toets op. preventDefault voorkomt dat de pagina herlaadt.
  document.getElementById("antwoord-formulier").addEventListener("submit", e => {
    e.preventDefault();
    const veld = document.getElementById("antwoord-veld");
    verwerkAntwoord(veld.value);
    veld.value = "";
    veld.focus();
  });
}

init();
