
let huidigSaldo = 0;

function Geldberekening() {

    let verkregenGeld = Number(document.getElementById("verkregenGeld").innerText);
    let kosten1 = Number(document.getElementById("kostenAbonnementen").innerText);
    let kosten2 = Number(document.getElementById("kostenlunch").innerText);
    let kosten3 = Number(document.getElementById("kostenHobbys").innerText);

    let totaleKosten = kosten1 + kosten2 + kosten3;
    

    huidigSaldo = verkregenGeld - totaleKosten;


    document.getElementById("resterendSaldo").innerText = huidigSaldo;
}


Geldberekening();



document.getElementById("Controleerbedragknop").addEventListener("click", function() {
    let uitgave = Number(document.getElementById("bedrag").value);
    
    if (uitgave > huidigSaldo) {
        alert("Let op! Je hebt niet genoeg geld over om dit te besteden.");
    } 
    else {
        huidigSaldo = huidigSaldo - uitgave;
        
        alert("Uitgave gelukt! Resterend geld: " + huidigSaldo);
        console.log("Nieuw resterend saldo:", huidigSaldo);
    }
    console.log("Dynamisch geladen startsaldo:", huidigSaldo);
});
  


