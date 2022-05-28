window.onload = function (){

    let myArray = [1,3,2,0,7,8,1,3,0,6,7,1];
    // let myArray = [2,1,0,0,3,4];
    // let myArray = [1,3,2,0,7,8,1,3,0,6,7,1,8,7,6,5,0,1,2,3,4,0,0,5,6,7,8,0];
    let auxArray = [];
    let cadena = "";

    for(var i = 0; i <= myArray.length; i++){
        
        if(myArray[i] != 0 && i != myArray.length){

            auxArray.push(myArray[i]);

        }else{

            if(myArray[i+1] == 0){

                auxArray.sort();
                auxArray.push(" X");
                cadena += auxArray.toString();
                auxArray = [];

            }else{

                auxArray.sort();
                auxArray.push(" ");
                cadena += auxArray.toString();
                auxArray = [];

            }
        }
    }

    const regex = /,/g;

    alert(cadena.replace(regex,''))
    console.log(cadena.replace(regex,''));

} 