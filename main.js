const tablero=[
['', '',''],
['', '',''],
['', '','']
];
const nombreJugador= prompt("Cual es su nombre?")
let turn= 0; //0=usuario y 1=PC..
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
    playerDiv.textContent = `${turn=== 0 ? "TU TURNO "+nombreJugador.toLocaleUpperCase(): "PC TURNO"}`;  //MOSTRAR TURNOS
}
// FUNCIONES DE TURNOS

//usuario
function playerPlays(){
const celdas= document.querySelectorAll('.celda');
celdas.forEach((celda, i) => {
    const column = i % 3;
    const row= parseInt(i / 3);

    if(tablero[row][column]=== '') {
     celda.addEventListener('click', (e) => {
        tablero[row][column] = 'O';
        celda.textContent= tablero[row][column];
        turn = 1;
        const won = checkIfWinner();
        if (won==='none') {
            PCplays();
            return;
        }
        if(won==='draw'){
        renderDraw();
        celda.removeEventListener('click', this);
        return;
    }
    }); 
    }
});
}
//COMPORTAMIENTO DE LA PC
function PCplays(){
renderCurrentPlayer();

setTimeout(()=>{
let played = false;
const options = checkIfCanWin();

if(options.length > 0){
const bestOption= options[0];
for(let i= 0; i < bestOption.length; i++){
    if(bestOption[i].value===0){
        const posi = bestOption[i].i;
        const posj = bestOption[i].j;
        tablero[posi][posj] = 'X';
        played= true;
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


turn= 0;
renderTablero();
renderCurrentPlayer(); 

const won= checkIfWinner();

if(won=== 'none'){
    playerPlays(); 
    return;
}
if(won=== 'draw'){
    renderDraw(); 
    return;
}
},1000);
}

//rednerDraw funcion
function renderDraw(){
playerDiv.textContent= 'Draw';
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
const res = [s1,s2,s3,s4,s5,s6,s7,s8].filter((line)=>{
    return (line[0].value + line[1].value + line[2].value ===2 || 
        line[0].value + line[1].value + line[2].value === -4);
});
return res;
}

//Funcion Mostrar ganador
function checkIfWinner(){
const p1 = tablero[0][0];
const p2 = tablero[0][1];
const p3 = tablero[0][2];
const p4 = tablero[1][0];
const p5 = tablero[1][1];
const p6 = tablero[1][2];
const p7 = tablero[2][0];
const p8 = tablero[2][1];
const p9 = tablero[2][2];

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
const res = [s1,s2,s3,s4,s5,s6,s7,s8].filter((line)=>{
    return  line[0] + line[1] + line[2] === 'XXX' ||
    line[0] + line[1] + line[2] === 'OOO';
});
if(res.length>0){
    if(res[0][0]==='X'){
        playerDiv.textContent = 'PC WINS';
        return  swal("LO SIENTO "+nombreJugador.toLocaleUpperCase()+" HAS PERDIDO","recarga la pagina y vuelve a intentarlo","error");
    } else{
        playerDiv.textContent= 'USER WINS';
        return swal("FELICIDADES "+ nombreJugador.toLocaleUpperCase()+ " ERES EL GANADOR","recarga la pagina para volver a jugar","success")
    }
}else{
    let draw = true;
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero.length; j++) {
        if (tablero[i][j]==='') {
            draw = false;
        }
     }
    }
      return  draw ? swal("ESTUVISTE MUY CERCA "+nombreJugador.toLocaleUpperCase()+ " ES UN EMPATE", "recarga la pagina para volver a intentarlo","success") : 'none';  
    }
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