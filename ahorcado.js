

const palabraSecreta = ['perro', 'gato', 'flor', 'hipotenusa'];
var palabra = palabraSecreta[Math.floor(Math.random() * palabraSecreta.length)];
var hombre, l;

function iniciarJuego() {
    const audio = new Audio("audios/risa.mp3");
    audio.play();

    document.getElementById('inicioDesaparece').style.display = 'none';
    document.getElementById('juegoAparece').style.display = 'initial';

}
//Declaración de la clase jugarahorcado
var jugarahorcado = function (con) {
    this.contexto = con;
    this.maximo = 5;
    this.intentos = 0;
    this.vivo = true;
    this.aciertos = 0
    this.dibujar();
}
jugarahorcado.prototype.dibujar = function () {
    var dibujo = this.contexto;

    //Dibujando el poste

    dibujo.beginPath();
    dibujo.moveTo(150, 100);
    dibujo.lineTo(150, 50);
    dibujo.lineTo(300, 50);
    dibujo.lineTo(300, 350);
    dibujo.lineTo(350, 350);
    dibujo.lineTo(250, 350);

    dibujo.lineWidth = 10;
    dibujo.strokeStyle = ('#B53014');
    dibujo.stroke();
    dibujo.closePath();
   

    if (this.intentos > 0) {
        // intentos = 1 --> rostro
        dibujo.beginPath();
        dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
        dibujo.strokeStyle = "red";
        dibujo.lineWidth = 5;
        dibujo.stroke();
        dibujo.closePath();
        dibujo.closePath();
        const audio1 = new Audio("audios/grito.mp3");
        audio1.play();
        document.getElementById("intento").innerHTML="4";

        if (this.intentos > 1) {
            // intentos = 2 --> torso
            dibujo.beginPath();
            dibujo.moveTo(150, 180);
            dibujo.lineTo(150, 250);
            dibujo.strokeStyle = "red";
            dibujo.lineWidth = 5;
            dibujo.stroke();
            dibujo.closePath();
            audio1.play();
            document.getElementById("intento").innerHTML="3";


            if (this.intentos > 2) {
                // intentos = 3 --> brazos
                dibujo.beginPath();
                dibujo.moveTo(120, 220);
                dibujo.lineTo(150, 180);
                dibujo.lineTo(180, 220);
                dibujo.strokeStyle = "red";
                dibujo.lineWidth = 5;
                dibujo.stroke();
                dibujo.closePath();
                audio1.play();
                document.getElementById("intento").innerHTML="2";



                if (this.intentos > 3) {
                    // intentos = 4 --> piernas
                    dibujo.beginPath();
                    dibujo.moveTo(120, 290);
                    dibujo.lineTo(150, 250);
                    dibujo.lineTo(180, 290);
                    dibujo.strokeStyle = "red";
                    dibujo.lineWidth = 5;
                    dibujo.stroke();
                    dibujo.closePath();
                    audio1.play();
                    document.getElementById("intento").innerHTML="1";

                    if (this.intentos > 4) {
                        // intentos = 5 --> ojos muertos
                        dibujo.beginPath();
                        //Ojo izquierdo
                        dibujo.moveTo(125, 120);
                        dibujo.lineTo(145, 145);
                        dibujo.moveTo(145, 120);
                        dibujo.lineTo(125, 145);


                        //Ojo derecho
                        dibujo.moveTo(155, 120);
                        dibujo.lineTo(175, 145);
                        dibujo.moveTo(175, 120);
                        dibujo.lineTo(155, 145);

                        dibujo.strokeStyle = "blue";
                        dibujo.lineWidth = 5;
                        dibujo.stroke();
                        dibujo.closePath();
                        const audio = new Audio("audios/risa.mp3");
                        audio.play();

                    }
                }
            }

        }

    }
}
jugarahorcado.prototype.trazar = function () {
    this.intentos++;
   
    if (this.intentos >= this.maximo) {
        this.vivo = false;
        alert("¡Estás muerto! la pabraba es " + palabra);
        document.getElementById('juegoAparece').style.display = 'none';
        document.getElementById('final1').style.display = 'initial';
        document.getElementById("mensajeFinal1").innerHTML="Tu alma nos pertenece has perdido la palabra era " + palabra;
    }
    this.dibujar();
    
    }


    
function iniciar() {
    l = document.getElementById("letra");
    var b = document.getElementById("boton");
    var canvas = document.getElementById("pantalla");
    canvas.width = 500;
    canvas.height = 400;
    var contexto = canvas.getContext("2d");
    hombre = new jugarahorcado(contexto);


    //Convierte a mayúscula un texto
    palabra = palabra.toUpperCase();

    //Declaro un array con n espacios de acuerdo al largo de la plabara
    espacio = new Array(palabra.length);

    //Agregamos una función que se dispare al dar click al botón
    b.addEventListener("click", agregarLetra);

    mostrarPista(espacio);
    //mostrarPista(palabra, espacio);
  
}
function agregarLetra() {
    var letra = l.value;
    l.value = "";
    mostrarPalabra(palabra, hombre, letra);
    
}
var acierto = 0;
function mostrarPalabra(palabra, ahorcado, letra) {
    var encontrado = false;
    var p;
    letra = letra.toUpperCase();
    for (p in palabra) {
        if (letra == palabra[p]) {
            espacio[p] = letra;
            encontrado = true;
            acierto++;
        }
    }
    if(acierto == palabra.length){
        
        alert('ganaste');
        document.getElementById('juegoAparece').style.display = 'none';
        document.getElementById('final').style.display = 'initial';
        document.getElementById("mensajeFinal").innerHTML="Feliciades esta vez te has salvado con la palabra " + palabra;
    }
        
    
    mostrarPista(espacio);
    
    
    // Si NO lo encontré
    if (!encontrado) {
        ahorcado.trazar();
    }

    if (!ahorcado.vivo) {
        //Mostrar la palabra entera al morir(Tarea)
    }

}
function mostrarPista(espacio) {
    var pista = document.getElementById("pista");
    var texto = "";
    var i;
    var largo = espacio.length;

    for (i = 0; i < largo; i++) {
        if (espacio[i] != undefined) {
            texto = texto + espacio[i] + " ";
        }
        else {
            texto += "_ ";
        }
    }
    pista.innerText = texto;

}

