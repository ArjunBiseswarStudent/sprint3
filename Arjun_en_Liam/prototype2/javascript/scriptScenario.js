function Geldberekening(verkregenGeld, Kosten1, Kosten2, Kosten3){
    let TotaleKosten = Kosten1 + Kosten2 + Kosten3;
    let GeldOver = VerkregenGeld - TotaleKosten;

let huidigSaldo = GeldOver; 

}

Geldberekening(350, 12, 35, 50);


document.getElementById("zoekknop").addEventListener("click", function() {
    let uitgave = Number(document.getElementById("bedrag").value);
    
    huidigSaldo = huidigSaldo - uitgave;
    console.log("Nieuw resterend saldo:", huidigSaldo);


    if(uitgave > huidigSaldo){
        alert("let op! Je heb niet genoeg geld over om dit te besteden");
    } else {
        huidigSaldo = huidigSaldo - uitgave;
        alert("uitgave Gelukt! Resterend geld: " + huidigSaldo);
    }
  });
  


