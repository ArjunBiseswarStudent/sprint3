# Trivia Race: een gezondheidsquiz met Mossy

Trivia Race (eerst Mossy Gezondheidsquiz) is een kleine webapp waarin je in een race tegen de klok binnen 60 seconden zoveel mogelijk gezondheidsfeitjes noemt in een thema. Mossy is de mascotte en kan je met een hulplijn een hint geven. Gemaakt voor de Healthy Hub (Positieve Gezondheid), voor studenten van 17 tot 26 jaar.

## Starten op localhost

Open een PowerShell-venster in deze map en typ:

```
powershell -ExecutionPolicy Bypass -File start-server.ps1
```

Ga daarna in je browser naar **http://localhost:8080**. Stoppen kan met Ctrl+C.

Andere opties:
- In VS Code: installeer de extensie "Live Server", klik rechts op `index.html` en kies "Open with Live Server".
- `index.html` dubbelklikken zou ook moeten werken, omdat de app geen bestanden via het netwerk ophaalt. Dit is niet getest. Gebruik bij twijfel localhost.

## Mappenstructuur

```
gezondheidsquiz/
├── index.html          De schermen (start, thema kiezen, spel, einde)
├── css/style.css       Het uiterlijk: groen en wit, ronde vormen
├── js/data.js          De inhoud: thema's, trefwoorden, hints, teksten van Mossy
├── js/app.js           De spellogica: timer, antwoorden beoordelen, score, hulplijn
├── assets/mossy.png    De mascotte
├── start-server.ps1    Kleine server voor localhost
└── README.md           Dit bestand
```

## Hoe het spel werkt in 5 stappen

1. **Start:** Mossy begroet je en legt het spel in een paar zinnen uit. Je drukt op Start.
2. **Thema kiezen:** je kiest zelf een van de 6 dimensies van Positieve Gezondheid.
3. **Spelen:** er loopt een timer van 60 seconden. Je typt een feitje en drukt op Enter. De app zoekt in de trefwoorden van dat thema of je antwoord herkend wordt. Een nieuw feitje geeft een punt. Noem je hetzelfde nog een keer, dan telt het niet.
4. **Hulplijn:** met "Hulplijn: vraag Mossy om een hint" krijg je een hint. Na de hint zegt Mossy dat je het gerust zelf kunt nagaan.
5. **Einde:** je ziet je score en de mogelijke feitjes binnen dat thema die je nog niet hebt genoemd, zodat je er iets van leert. Met "Nog een ronde" kies je een ander thema.

## Hoe de code in elkaar zit

- `index.html` bevat alle vier de schermen tegelijk. Er is steeds maar één zichtbaar: de functie `toonScherm()` in `app.js` zet bij één scherm de klasse `actief` aan.
- `data.js` bevat alleen gegevens. Wil je een feitje, trefwoord of hint toevoegen, dan pas je alleen dit bestand aan.
- `app.js` leest die gegevens. De belangrijkste functies:
  - `startSpel()` zet alles klaar voor een ronde.
  - `startTimer()` laat elke seconde de tijd aflopen en stopt het spel bij 0.
  - `normaliseer()` maakt tekst klein en haalt accenten weg, zodat "Slaap" en "slaap" gelijk zijn.
  - `zoekFeitjes()` kijkt welke feitjes passen bij wat de speler typte.
  - `verwerkAntwoord()` beslist: goed, al genoemd of niet herkend.
  - `toonHint()` geeft de volgende hint.
  - `eindeSpel()` laat de score en de gemiste feitjes zien.

## Ontwerpkeuzes (zo leg ik het uit)

- **Waarom geen AI voor de hulplijn?** Een AI-sleutel in een webpagina is onveilig, het kost geld en het moet lokaal zonder account werken. Vooraf geschreven hints zijn controleerbaar en gratis.
- **Waarom zijn sommige hints bewust onjuist?** Uit ons onderzoek bleek dat 12 van de 13 studenten het moeilijk vinden om betrouwbare gezondheidsinformatie te vinden. Zo oefent de speler met kritisch blijven nadenken. In `data.js` staat bij 1 op 4 hints `onjuist: true`. Dat wordt nergens aan de speler getoond.
- **Waarom geen opslag en geen account?** Privacy, en een lage drempel: je kunt meteen beginnen. Sluit je de pagina, dan is alles weg.
- **Waarom korte rondes van 60 seconden?** Uit de interviews bleek dat studenten tijdsdruk ervaren en afhaken bij dingen die als een verplichting voelen. Een ronde past tussen twee lessen.
- **Waarom kies je zelf het thema?** Eigen regie was een van de belangrijkste uitkomsten van het onderzoek. In de teksten staan bewust geen woorden als "moet".
- **Waarom alleen HTML, CSS en JavaScript?** Zonder frameworks of installatie kun je elke regel volgen en uitleggen.

## Beperkingen (benoem ze zelf)

- **Het herkennen van antwoorden is niet perfect.** De app zoekt naar stukjes tekst. Een goed antwoord dat niet in de lijst staat, wordt niet herkend. Een antwoord dat een trefwoord toevallig bevat, kan wel meetellen. De melding bij "niet herkend" is daarom bewust vriendelijk. Verbeteren kan door meer trefwoorden toe te voegen.
- **De feitjes zijn algemeen en niet medisch gecontroleerd.** Dit is geen medische app en geeft geen advies. De hints zijn geschreven door ons en niet door een gezondheidsdeskundige beoordeeld.
- **De timer loopt door tijdens een hint.** Dat is een keuze om het simpel te houden.
- **Het is een prototype.** We hebben het nog niet met studenten getest. Dat is de volgende stap.

## Aanpassingen na feedback

Na de eerste test zijn vier dingen aangepast:

1. **Duidelijk dat het Trivia Race is:** de naam staat nu in de titel, de balk bovenaan, de kop op het startscherm en de tekst van Mossy. De uitleg zegt dat het een race tegen de klok is.
2. **Duidelijkere hulplijn:** de knop "Bel Mossy" heet nu "Hulplijn: vraag Mossy om een hint", met een korte uitleg eronder. De knop werkt hetzelfde als eerst.
3. **Aantrekkelijkere stijl:** lichtgroene achtergrond (ook aan de zijkanten), een witte balk bovenaan, witte kaarten met een donkere rand en een harde schaduw, een grote timer en een korte uitleg onder elke kop. Alle kleuren staan als variabelen bovenaan `style.css`.
4. **Vriendelijker eindscherm:** in plaats van "Dit heb je nog niet genoemd" staat er "Dit zijn nog mogelijke dingen die je nog niet hebt genoemd binnen" met de naam van het gekozen thema.

## De prompt waarmee dit is gemaakt

````
Bouw een gezondheidsquiz als webapp die lokaal draait (localhost). Ik ben student HBO-ICT en moet de code zelf kunnen begrijpen en uitleggen, dus houd het simpel.

Concept: de speler noemt binnen 60 seconden zoveel mogelijk gezondheidsfeitjes in een categorie, zoals bij een trivia-spel. Doelgroep: studenten van 17 tot 26 jaar. Eén ronde duurt 2 tot 3 minuten, er is geen account en er worden geen gegevens opgeslagen. Gebruik geen woorden als "moet" en geen belerende toon. Alles in het Nederlands.

Spelverloop:
1. Startscherm met Mossy en een korte uitleg.
2. De speler kiest een categorie uit de 6 dimensies van Positieve Gezondheid (lichaamsfuncties, mentaal welbevinden, zingeving, kwaliteit van leven, meedoen, dagelijks functioneren).
3. De speler typt binnen de tijd zoveel mogelijk feitjes en drukt op Enter. Beoordeel op basis van een simpele lijst met trefwoorden en synoniemen. Een dubbel antwoord telt niet.
4. Eindscherm met de score, de feitjes die gemist zijn en de knop "Nog een ronde".

Hulplijn: een knop "Bel Mossy" met vooraf geprogrammeerde hints (geen AI-API). Ongeveer 1 op 4 hints is bewust een beetje onjuist. Na elke hint zegt Mossy dat de speler het zelf nog even moet checken, zonder te zeggen welke hint fout was.

Uiterlijk: groen en wit, ronde vormen, grote knoppen, werkt op een telefoon. Mossy (assets/mossy.png) is de mascotte met een korte tekstballon op startscherm, hulplijn en eindscherm.

Techniek: alleen HTML, CSS en vanilla JavaScript, zonder frameworks of build-stap. Bestanden: index.html, css/style.css, js/app.js en js/data.js (categorieën, trefwoorden en hints). Leg uit hoe ik het start op localhost.

Uitlegbaar: kleine functies met duidelijke namen, korte Nederlandse comments die uitleggen waarom iets zo is, en alle inhoud in data.js. Bouw in stappen en leg elke stap kort uit voordat je verdergaat. Maak aan het eind een README.md met hoe je het start, de mapstructuur, hoe het spel werkt in 5 stappen, de ontwerpkeuzes (waarom geen AI, geen opslag, korte rondes) en de beperkingen.

Werk niets extra's uit en vraag het me als iets onduidelijk is.
````
