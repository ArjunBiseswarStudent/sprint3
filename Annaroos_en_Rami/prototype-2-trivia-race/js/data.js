// data.js: alle inhoud van de quiz staat hier.
// Waarom een apart bestand? Zo kun je vragen, trefwoorden en hints aanpassen
// zonder de spellogica in app.js aan te raken.

// Elke categorie is een dimensie van Positieve Gezondheid.
// Een "feitje" heeft een label (wat we tonen als je het mist) en trefwoorden.
// Trefwoorden zijn stukjes tekst: als het antwoord van de speler zo'n stukje
// bevat, telt het feitje. "sport" herkent dus ook "sporten" en "teamsport".
const CATEGORIEEN = [
  {
    id: "lichaam",
    naam: "Lichaamsfuncties",
    uitleg: "Hoe je lichaam werkt en wat het helpt.",
    feitjes: [
      { label: "Genoeg slapen", trefwoorden: ["slaap", "slapen", "uitslapen", "nachtrust"] },
      { label: "Water drinken", trefwoorden: ["water", "drinken", "hydrat", "vocht"] },
      { label: "Sporten of bewegen", trefwoorden: ["sport", "bewegen", "beweging", "fitness", "hardlopen", "rennen", "trainen", "gymmen", "fietsen"] },
      { label: "Wandelen", trefwoorden: ["wandel", "stappen", "lopen"] },
      { label: "Gevarieerd eten", trefwoorden: ["gezond eten", "gevarieerd", "voeding", "groente", "fruit", "vezels", "ontbijt"] },
      { label: "Rekken en strekken", trefwoorden: ["rek", "strek", "stretch", "yoga"] },
      { label: "Daglicht en vitamine D", trefwoorden: ["zon", "daglicht", "vitamine d", "buiten"] },
      { label: "Rustig ademhalen", trefwoorden: ["adem"] },
      { label: "Een sterk hart (cardio)", trefwoorden: ["hart", "cardio", "conditie"] },
      { label: "Spieren trainen", trefwoorden: ["spier", "kracht"] },
      { label: "Rechtop zitten en afwisselen", trefwoorden: ["houding", "rechtop", "zithouding"] },
      { label: "Handen wassen en tanden poetsen", trefwoorden: ["tanden", "poets", "handen wassen", "hygiene"] },
      { label: "Matig met alcohol en niet roken", trefwoorden: ["alcohol", "roken", "sigaret"] }
    ],
    hints: [
      { tekst: "Denk aan de basis: slaap, bewegen en drinken. Volwassenen hebben meestal zo'n 7 tot 9 uur slaap nodig.", onjuist: false },
      { tekst: "Even opstaan en rekken telt ook mee, je hoeft er niet voor naar de sportschool.", onjuist: false },
      { tekst: "Denk ook aan wat je eet en hoeveel daglicht je krijgt.", onjuist: false },
      { tekst: "Beweging telt pas mee als je minstens een uur achter elkaar sport.", onjuist: true }
    ]
  },
  {
    id: "mentaal",
    naam: "Mentaal welbevinden",
    uitleg: "Hoe je je voelt en hoe je met spanning omgaat.",
    feitjes: [
      { label: "Rustige ademhaling", trefwoorden: ["adem"] },
      { label: "Mediteren of mindfulness", trefwoorden: ["medit", "mindful"] },
      { label: "Praten met iemand", trefwoorden: ["praten", "gesprek", "vriend", "delen", "luisterend oor"] },
      { label: "Een korte pauze nemen", trefwoorden: ["pauze", "rust nemen", "even stoppen"] },
      { label: "Genoeg slapen", trefwoorden: ["slaap", "slapen"] },
      { label: "Bewegen of sporten", trefwoorden: ["sport", "bewegen", "wandel"] },
      { label: "Minder schermtijd", trefwoorden: ["scherm", "telefoon", "social media"] },
      { label: "Dagboek bijhouden", trefwoorden: ["dagboek", "schrijven", "journal"] },
      { label: "Naar buiten, de natuur in", trefwoorden: ["natuur", "buiten", "park"] },
      { label: "Hulp zoeken als het zwaar is", trefwoorden: ["hulp", "psycholoog", "coach", "huisarts", "slb"] },
      { label: "Muziek luisteren", trefwoorden: ["muziek"] },
      { label: "Grenzen aangeven", trefwoorden: ["grens", "grenzen", "nee zeggen"] },
      { label: "Dankbaarheid", trefwoorden: ["dankbaar"] },
      { label: "Gevoelens benoemen", trefwoorden: ["gevoel", "emotie"] }
    ],
    hints: [
      { tekst: "Ademhalingsoefeningen en even praten met iemand helpen vaak bij spanning.", onjuist: false },
      { tekst: "Een korte pauze zonder scherm kan je hoofd rust geven.", onjuist: false },
      { tekst: "Slaap en mentaal welzijn beinvloeden elkaar sterk.", onjuist: false },
      { tekst: "Praten over spanning maakt het voor de meeste mensen juist groter, dus het voor je houden werkt beter.", onjuist: true }
    ]
  },
  {
    id: "zingeving",
    naam: "Zingeving",
    uitleg: "Wat je belangrijk vindt en waar je energie van krijgt.",
    feitjes: [
      { label: "Doelen stellen", trefwoorden: ["doel", "ambitie"] },
      { label: "Weten wat je waarden zijn", trefwoorden: ["waarde", "normen", "belangrijk vinden"] },
      { label: "Vrijwilligerswerk of anderen helpen", trefwoorden: ["vrijwillig", "helpen", "anderen"] },
      { label: "Geloof of spiritualiteit", trefwoorden: ["geloof", "religie", "spiritu", "bidden", "bid"] },
      { label: "In de natuur zijn", trefwoorden: ["natuur"] },
      { label: "Dankbaarheid", trefwoorden: ["dankbaar"] },
      { label: "Creatief bezig zijn", trefwoorden: ["creatief", "kunst", "schilder", "tekenen", "muziek"] },
      { label: "Terugkijken en nadenken", trefwoorden: ["reflect", "nadenken", "dagboek"] },
      { label: "Je passies volgen", trefwoorden: ["passie", "interesse", "hobby"] },
      { label: "Dromen over de toekomst", trefwoorden: ["droom", "toekomst", "visie"] },
      { label: "Een rolmodel of mentor", trefwoorden: ["rolmodel", "mentor"] },
      { label: "Nieuwsgierig blijven en leren", trefwoorden: ["leren", "nieuwsgierig"] },
      { label: "Tradities en cultuur", trefwoorden: ["traditie", "cultuur"] }
    ],
    hints: [
      { tekst: "Zingeving gaat over wat je belangrijk vindt: je waarden, je doelen en wat je voor anderen betekent.", onjuist: false },
      { tekst: "Een doel hoeft niet groot te zijn, een kleine stap die bij je past telt ook.", onjuist: false },
      { tekst: "Denk aan dingen waar je energie van krijgt, bijvoorbeeld een hobby of anderen helpen.", onjuist: false },
      { tekst: "Zingeving heb je pas nodig na je studie, daarvoor is het nog niet belangrijk.", onjuist: true }
    ]
  },
  {
    id: "kwaliteit",
    naam: "Kwaliteit van leven",
    uitleg: "Hoe tevreden je bent met je leven als geheel.",
    feitjes: [
      { label: "Tijd voor hobby's", trefwoorden: ["hobby", "vrije tijd"] },
      { label: "Financiele rust", trefwoorden: ["geld", "budget", "sparen", "financ"] },
      { label: "Een fijne woonplek", trefwoorden: ["wonen", "woonplek", "huis", "woning", "kamer"] },
      { label: "Vrienden en familie", trefwoorden: ["vriend", "familie"] },
      { label: "Er even tussenuit gaan", trefwoorden: ["vakantie", "reizen", "uitje", "tussenuit", "weekendje"] },
      { label: "Genieten van kleine dingen", trefwoorden: ["genieten", "lekker eten"] },
      { label: "Je veilig voelen", trefwoorden: ["veilig"] },
      { label: "Balans tussen werk en privé", trefwoorden: ["balans", "werk"] },
      { label: "Buiten zijn", trefwoorden: ["buiten", "natuur"] },
      { label: "Goed slapen", trefwoorden: ["slaap", "slapen"] },
      { label: "Lachen en humor", trefwoorden: ["lach", "humor", "grap"] },
      { label: "Ontspannen", trefwoorden: ["ontspan", "rust"] },
      { label: "Tevreden zijn", trefwoorden: ["tevreden", "gelukkig", "blij"] }
    ],
    hints: [
      { tekst: "Kwaliteit van leven gaat over hoe tevreden je bent met je leven, niet alleen over geld.", onjuist: false },
      { tekst: "Denk aan studie, werk, vrije tijd en de mensen om je heen.", onjuist: false },
      { tekst: "Kleine dingen zoals lachen en genieten tellen ook mee.", onjuist: false },
      { tekst: "Hoe meer je verdient, hoe hoger je kwaliteit van leven, en dat blijft altijd verder oplopen.", onjuist: true }
    ]
  },
  {
    id: "meedoen",
    naam: "Meedoen",
    uitleg: "Erbij horen en contact hebben met anderen.",
    feitjes: [
      { label: "Vrienden zien", trefwoorden: ["vriend"] },
      { label: "Een sportclub of team", trefwoorden: ["club", "vereniging", "team", "teamsport"] },
      { label: "Een studentenvereniging", trefwoorden: ["studentenvereniging", "studievereniging", "vereniging"] },
      { label: "Vrijwilligerswerk", trefwoorden: ["vrijwillig"] },
      { label: "Tijd met familie", trefwoorden: ["familie", "ouders", "broer", "zus"] },
      { label: "Contact met de buurt", trefwoorden: ["buur"] },
      { label: "Samen eten of koken", trefwoorden: ["samen eten", "samen koken", "diner", "koken"] },
      { label: "Een feestje of borrel", trefwoorden: ["feest", "uitgaan", "borrel"] },
      { label: "Appen of bellen", trefwoorden: ["appen", "bellen", "groepsapp", "online"] },
      { label: "Samen leren voor school", trefwoorden: ["studiegroep", "samen leren", "samenwerk"] },
      { label: "Naar evenementen gaan", trefwoorden: ["evenement", "festival", "activiteit"] },
      { label: "Iemand uitnodigen", trefwoorden: ["uitnod"] },
      { label: "Luisteren naar een ander", trefwoorden: ["luister", "compliment"] },
      { label: "Nieuwe mensen ontmoeten", trefwoorden: ["ontmoet", "kennismak"] }
    ],
    hints: [
      { tekst: "Meedoen is erbij horen: vrienden, een club, een studentenvereniging of vrijwilligerswerk.", onjuist: false },
      { tekst: "Een berichtje sturen of iemand uitnodigen voor koffie is al een begin.", onjuist: false },
      { tekst: "Denk aan studie, hobby en familie.", onjuist: false },
      { tekst: "Online contact telt niet mee voor meedoen, alleen elkaar echt zien.", onjuist: true }
    ]
  },
  {
    id: "dagelijks",
    naam: "Dagelijks functioneren",
    uitleg: "Hoe je dag soepel verloopt.",
    feitjes: [
      { label: "Plannen met een agenda", trefwoorden: ["plan", "agenda"] },
      { label: "Een vaste routine", trefwoorden: ["routine", "structuur", "ritme"] },
      { label: "Prioriteiten stellen", trefwoorden: ["prioriteit"] },
      { label: "Pauzes nemen", trefwoorden: ["pauze"] },
      { label: "Genoeg slapen", trefwoorden: ["slaap", "slapen"] },
      { label: "Ontbijten", trefwoorden: ["ontbijt"] },
      { label: "Huishouden bijhouden", trefwoorden: ["huishoud", "schoonmaken", "afwas", "opruimen", "wassen"] },
      { label: "Een to-do lijstje", trefwoorden: ["to-do", "todo", "lijstje", "deadline"] },
      { label: "Hulp vragen", trefwoorden: ["hulp", "vragen"] },
      { label: "Nee zeggen", trefwoorden: ["nee zeggen", "grens", "grenzen"] },
      { label: "Afleiding wegleggen", trefwoorden: ["telefoon", "afleiding", "focus", "concentratie"] },
      { label: "Maaltijden koken en boodschappen doen", trefwoorden: ["koken", "maaltijd", "boodschap"] },
      { label: "Tijd voor jezelf", trefwoorden: ["tijd voor jezelf", "me-time", "me time"] },
      { label: "Een reminder of alarm", trefwoorden: ["herinner", "reminder", "alarm"] }
    ],
    hints: [
      { tekst: "Een vast ritme en een korte planning maken je dag overzichtelijker.", onjuist: false },
      { tekst: "Een to-do lijstje met maar drie dingen is vaak haalbaarder dan een lange lijst.", onjuist: false },
      { tekst: "Even je telefoon wegleggen helpt bij je concentratie.", onjuist: false },
      { tekst: "Meerdere dingen tegelijk doen is bewezen sneller dan ze na elkaar doen.", onjuist: true }
    ]
  }
];

// Wat Mossy zegt nadat hij een hint gaf. Bewust zonder te zeggen welke hint
// onjuist was: de speler oefent zo met kritisch blijven nadenken.
const MOSSY_NA_HINT = [
  "Ik weet het niet 100% zeker, check het gerust zelf nog even.",
  "Dit is mijn beste tip, maar kijk het ook zelf na.",
  "Zo zie ik het, jij mag er zelf ook kritisch naar kijken.",
  "Niet alles wat ik zeg klopt altijd. Wat denk jij zelf?"
];

// Korte tekstballonnen voor Mossy op de verschillende schermen.
const MOSSY_TEKSTEN = {
  start: "Hoi, ik ben Mossy! Welkom bij Trivia Race. Hoeveel gezondheidsfeitjes noem jij in 60 seconden?",
  categorie: "Kies zelf waar je mee wilt beginnen.",
  spel: "Typ een feitje en druk op Enter. Weet je even niets? Gebruik de hulplijn.",
  einde: {
    laag: "Goed bezig! Hieronder zie je wat er nog meer mogelijk was.",
    midden: "Mooi gedaan! Je weet al een hoop.",
    hoog: "Wauw, wat een kennis!"
  }
};
