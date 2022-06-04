const tablero=[
['', '',''],
['', '',''],
['', '','']
];

let turno= 0; //0=usuario y 1=PC..
//Enumerator.querySelector()
const tableroContainer= document.querySelector('#tablero');     
const playerDiv = document.querySelector('#player');



function renderTablero(){
    const html = tablero.map(row => {
        const celdas = row.map(celda => {
            return `<button class="celda">${celda}</button>`;
        });

        return `<div class="row">${celdas.join('')}</div>`;
    });

    tableroContainer.innerHTML = html.join("");
}

function renderCurrentPlayer() {
    playerDiv.textContent = `${turn=== 0 ? "Tu Turno": "PC Turno"}`;  //MOSTRAR TURNOS
}
// FUNCIONES DE TURNOS
function playerPlays(){
const celdas= document.querySelectorAll('.celda');
celdas.forEach((celda, i) => {
    const column = i % 3;
    const row= parseInt(i / 3);

    if(tablero[row][column]=== ''){
     celda.addEventListener('click', e =>{
        tablero[row][column]='O';
        celda.textContent= tablero[row][column];

        PCplays();
     }); 
    }
});
}
//COMPORTAMIENTO DE LA PC
function PCPlays(){
renderCurrentPlayer();

setTimeout(()=>{
let played = false;
const options = checkIfCanWin();

if(options.length > 0){
const bestOption= options[0];
for(let i= 0; i<bestOption.length; i++){
    if(bestOption[i].value===0){
        const posi = bestOption[i].i;
        const posj = bestOption[j].j;
        tablero[posi][posj] = 'X';
        player= true;
        break;
    }
}
} else{
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++)
        if(tablero[i][j]=== '' && !played){
            tablero[i][j]= 'X'
            played = true;
        }
}
}             
},1500);
}
//funcion posible win
function checkIfCanWin(){
    const arr = JSON.parse(JSON.stringify(tablero));

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
        if(arr[i][j]==="X"){
        arr[i][j]= {value: 1,i,j};
        }
        if(arr[i][j]===""){
            arr[i][j]= {value: 0,i,j}; 
        }
        if(arr[i][j]==="O"){
            arr[i][j]= {value: -2,i,j};
        }
    }
}
const p1 = arr[0][0];
const p2 = arr[0][1];
const p3 = arr[0][2];
const p4 = arr[1][0];
const p5 = arr[1][1];
const p6 = arr[1][2];
const p7 = arr[2][0];
const p8 = arr[2][1];
const p9 = arr[2][2];

//JUGADAS GANADORAS
const s1 =[p1, p2, p3];
const s2 =[p4, p5, p6];
const s3 =[p7, p8, p9];
const s4 =[p1, p4, p7];
const s5 =[p2, p5, p8];
const s6 =[p3, p6, p9];
const s7 =[p1, p5, p9];
const s8 =[p3, p5, p7];
//todas las soluciones
const res = [s1,s2,s3,s4,s5,s6,s7,s8].filter(line=>{
    return (line[0].value + line[1].value + line[2].value ===2 || 
        line[0].value + line[1].value + line[2].value === -4);
});
return res;
}



//

//FIN FUNCIONES DE TURNOS

function empezarJuego() { 
renderTablero(); 
turn = Math.random() < 0.5 ? 0: 1;
renderCurrentPlayer();
if(turn===0){
playerPlays();
}else{
PCplays();
}
}

empezarJuego();