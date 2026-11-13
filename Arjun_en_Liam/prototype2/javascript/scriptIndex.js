function openScherm(buttonID){
const knop = document.getElementById(buttonID);

if (knop) {
    knop.addEventListener('click', function() {
            window.location.href = 'ScenarioKeuze.html'
});
          }
    
    
}

opengame('scenario-keuze-pagina')