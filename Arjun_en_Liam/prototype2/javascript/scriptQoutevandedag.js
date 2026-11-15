  const quotes = [
    "Sparen is niet het achterhouden van geld, maar het kopen van je eigen vrijheid voor later.",
    "Wie de kleine uitgaven veracht, zal spoedig door grote kosten worden verrast.",
    "Geef niet uit wat je overhoudt nadat je hebt gekocht, maar houd over wat je uitgeeft voordat je koopt.",
    "Rijkdom zit niet in veel bezitten, maar in slim omgaan met wat je hebt.",
    "Elke euro die je nu spaart, is een steunwieltje voor je toekomstige zelf."
];

function toonqouteinrandomvoligorde(){

let randomqoute = Math.floor(Math.random() *quotes.length);

let gekozenqoute = quotes[randomqoute];

document.getElementById("quotePlek").innerText = gekozenqoute;


setInterval(ToonWillekeurigeQuote, 4000)
}

