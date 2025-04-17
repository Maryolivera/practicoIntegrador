let listaPaises=[];
let correctas = 0;
let incorrectas = 0;
let tiempoInicio;
let numeroPregunta = 1;
const totalPreguntas = 10;


 async function cargarPaises() {
    try {
      const respuesta = await fetch("https://restcountries.com/v3.1/all");
      const datos = await respuesta.json();
      listaPaises = datos;
      
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
      preguntaCapital();
      
    }
  }


  function preguntaCapital() { 
    let pais;
    do {
      pais = listaPaises[Math.floor(Math.random() * listaPaises.length)];
    } while (!pais.capital || pais.capital.length === 0);

   


    const nombrePais = pais.name.common;
    const capitalCorrecta = pais.capital[0];
  
    const opciones = [capitalCorrecta, ...opcionesIncorrectas(capitalCorrecta, "capital", 3)];
    const mezcladas = opciones.sort(() => Math.random() - 0.5);
  
    document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
    document.getElementById("pregunta").textContent = `¿Cuál es la capital de ${nombrePais}?`;
  
    mostrarOpciones(mezcladas, capitalCorrecta);
    
  }


  function preguntaBandera() {
    const pais = listaPaises[Math.floor(Math.random() * listaPaises.length)];
    const nombrePais = pais.name.common;
    const opciones = [nombrePais, ...opcionesIncorrectas(nombrePais, "nombre", 3)];
    const mezcladas = opciones.sort(() => Math.random() - 0.5);
  
    document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
    document.getElementById("pregunta").innerHTML = `¿Qué país representa esta bandera?<br><img src="${pais.flags.svg}" alt="Bandera" style="width: 100px;">`;
    mostrarOpciones(mezcladas, nombreCorrecto);
    
  }



  function opcionesIncorrectas(correcta, campo, cantidad) {
    const opciones = [];
    let valor;
  
    while (opciones.length < cantidad) {
      const pais = listaPaises[Math.floor(Math.random() * listaPaises.length)];
    if (campo === "capital") {
      if (pais.capital && pais.capital.length > 0) {
        valor = pais.capital[0];
      } else {
        valor = "Sin capital";
      }
    } else {
      valor = pais.name.common;
    }
  
     
      if (
        valor &&
        valor !== correcta &&
        !opciones.includes(valor)
      ) {
        opciones.push(valor);
      }
    }
  
    return opciones;
  }

  function mostrarOpciones(opciones, correcta) {
    const contenedor = document.querySelector(".opciones");
    contenedor.innerHTML = "";
  
    opciones.forEach(opcion => {
      const boton = document.createElement("button");
      boton.textContent = opcion;
      boton.onclick = () => responder(opcion === correcta, correcta);
      contenedor.appendChild(boton);
    });
  }

  
  function responder(esCorrecta,correcta) {
    const respuesta = document.getElementById("respuesta");
  
    if (esCorrecta) {
      respuesta.textContent = "✅ ¡Correcto!";
      correctas++;
    } else {
      respuesta.textContent = `❌ Incorrecto. La respuesta era: ${correcta}`;
      incorrectas++;
    }
  
    numeroPregunta++;
    setTimeout(() => {
      respuesta.textContent = ""; 
      mostrarPregunta();
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
  
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-resultados").style.display = "flex";
  }
  
 
  function reiniciarJuego() {
    jugar();
  }
 

  