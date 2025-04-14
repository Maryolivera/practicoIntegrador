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
      mostrarPantallaResultados();
      return;
    }
  
    const tipo = Math.floor(Math.random() * 3); 
  
    if (tipo === 0) {
      mostrarPreguntaCapital();
    } else if (tipo === 1) {
      
      mostrarPreguntaBandera(); 
    } else {
      
      mostrarPreguntaLimitrofes(); 
    }
  }


  

  