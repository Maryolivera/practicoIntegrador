let listaPaises=[];
let paisesConCapital = [];
let paisesConBandera = [];
let paisesConFronteras = [];

let correctas = 0;
let incorrectas = 0;
let tiempoInicio;
let numeroPregunta = 1;
let puntajeTotal=0;
const totalPreguntas = 10;


 async function cargarPaises() {
    try {
      const respuesta = await fetch("https://restcountries.com/v3.1/all");
      const datos = await respuesta.json();
      listaPaises = datos;

      paisesConCapital = listaPaises.filter(p => p.capital && p.capital.length > 0);
      paisesConBandera = listaPaises.filter(p => p.flags && p.flags.svg);
      paisesConFronteras = listaPaises.filter(p => p.borders && p.borders.length > 0);
    
      
    } catch (error) {
      console.error("Error al cargar países:", error);
      alert("No se pudieron cargar los datos de los países.");
    }
  }


  async function jugar() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-resultados").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "flex";
  
    correctas = 0;
    incorrectas = 0;
    numeroPregunta = 1;
    puntajeTotal=0;
    tiempoInicio = Date.now();
  
    await cargarPaises(); 
  
    mostrarPregunta();
  } 



  function mostrarPregunta() {
    if (numeroPregunta > totalPreguntas) {
      pantallaResultados();
      return;
    }
  
    const tipo = Math.floor(Math.random() * 3); 
  
    if (tipo === 0) {
      preguntaCapital();
    } else if (tipo === 1) {
      preguntaBandera();
     
    } else {
      preguntaLimitrofes();
      
    }
  }


  function preguntaCapital() { 
    
    
    const pais = paisesConCapital[Math.floor(Math.random() * paisesConCapital.length)];
   


    const nombrePais = pais.name.common;
    const capitalCorrecta = pais.capital[0];
  
    const opciones = [capitalCorrecta];
    while (opciones.length < 4) {
      const aux = paisesConCapital[Math.floor(Math.random() * paisesConCapital.length)];
      const valor=aux.capital[0];
      if (!opciones.includes(valor)) {
        opciones.push(valor);
      }
    }

    const mezcladas = opciones.sort(() => Math.random() - 0.5);
  
    document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
    document.getElementById("pregunta").textContent = `¿Cuál es la capital de ${nombrePais}?`;
  
    mostrarOpciones(mezcladas, capitalCorrecta,3);
    
  }


  function preguntaBandera() {
    
   
    const pais = paisesConBandera[Math.floor(Math.random() * paisesConBandera.length)];
    const nombrePais = pais.name.common;
    const opciones = [nombrePais];

    while (opciones.length < 4) {
      const aux = paisesConBandera[Math.floor(Math.random() * paisesConBandera.length)]
      const valor=aux.name.common;
      if (!opciones.includes(valor)) {
        opciones.push(valor);
      }
    }


    const mezcladas = opciones.sort(() => Math.random() - 0.5);
  
    document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
    document.getElementById("pregunta").innerHTML = `¿Qué país representa esta bandera?<br><img src="${pais.flags.svg}" alt="Bandera" style="width: 100px;">`;
    mostrarOpciones(mezcladas, nombrePais,5);
    
  }

  function preguntaLimitrofes() {
    
   
    const pais = paisesConFronteras[Math.floor(Math.random() * paisesConFronteras.length)];
    
    const cantidadCorrecta = pais.borders.length;
  
    const opciones = [cantidadCorrecta];
    while (opciones.length < 4) {
      const aux = paisesConFronteras[Math.floor(Math.random() * paisesConFronteras.length)];
      const cantidad = aux.borders.length;
      if (!opciones.includes(cantidad)) {
        opciones.push(cantidad);
      }
    }
  
    const mezcladas = opciones.sort(() => Math.random() - 0.5);
    document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
    document.getElementById("pregunta").textContent = `¿Cuántos países limítrofes tiene ${pais.name.common}?`;
  
    mostrarOpciones(mezcladas, cantidadCorrecta,3);
  }



  

  function mostrarOpciones(opciones, correcta,valorPuntaje=0) {
    const contenedor = document.querySelector(".opciones");
    contenedor.innerHTML = "";
  
    opciones.forEach(opcion => {
      const boton = document.createElement("button");
      boton.textContent = opcion;
      boton.onclick = () => responder(opcion === correcta, correcta,valorPuntaje);
      contenedor.appendChild(boton);
    });
  }

  
  function responder(esCorrecta,correcta,valorPuntaje=0) {
    const respuesta = document.getElementById("respuesta");
  
    if (esCorrecta) {
      respuesta.textContent = "✅ ¡Correcto!";
      correctas++;
      puntajeTotal += valorPuntaje;

    } else {
      respuesta.textContent = `❌ Incorrecto. La respuesta era: ${correcta}`;
      incorrectas++;
    }
  
    numeroPregunta++;
    
    setTimeout(() => {
      respuesta.textContent = ""; 
      if (numeroPregunta > totalPreguntas) {
        
        pantallaResultados();
      } else {
        
        mostrarPregunta();
      }
    }, 3000);
  }
  
  function pantallaResultados() {
    const tiempoFinal = Date.now();
    const tiempoTotal = Math.floor((tiempoFinal - tiempoInicio) / 1000);
    const promedio = (tiempoTotal / totalPreguntas).toFixed(1);
  
    document.getElementById("resultado-correctas").textContent = correctas;
    document.getElementById("resultado-incorrectas").textContent = incorrectas;
    document.getElementById("resultado-tiempo-total").textContent = tiempoTotal;
    document.getElementById("resultado-tiempo-promedio").textContent = promedio;
    document.getElementById("resultado-puntaje-total").textContent = puntajeTotal;
  
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-resultados").style.display = "flex";

    
  
    enviarResultados(puntajeTotal,correctas,tiempoTotal);
  }

  function enviarResultados(puntaje, correctas, tiempo) {
    fetch('http://localhost:3000/guardarResultados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ puntaje, correctas, tiempo })
    });
  }
  


  
 
  function reiniciarJuego() {
   
    jugar();
  }



