window.onload = function () {

    let base = prompt("Ingrese numero inicial");

    let dato = "";

    if(base == 0){
        alert("Error");
    }

    for(var i = 1; i<=base; i++){
        for(var j = 1; j <=base; j++ ){

            dato += (j == i || j == base-i+1) ? "X" : "_"; //La formula base-X-1, hace un decremento de n hasta 1 con i y  en 0, para i y j en 1 base-X+1

        }

        dato += "\n";

    }

    alert(dato+"\nbase = "+base);
    console.log(dato);
    console.log("base = ",base);
    
}