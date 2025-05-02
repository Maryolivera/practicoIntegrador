//Variables globales 
let listaPaises = [];
let paisesConCapital = [];
let paisesConBandera = [];
let paisesConFronteras = [];

let correctas = 0;
let incorrectas = 0;
let tiempoInicio;
let tiempoTotal ;
let numeroPregunta = 1;
let puntajeTotal = 0;
const totalPreguntas = 4;
let nombreJugador = "";


//Carga la lista completa de paises desde la API y filtra por categorias
async function cargarPaises() {
  try {
    const respuesta = await fetch("/api/paises");
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

//Inicializa y comienza el juego
async function jugar() {
  nombreJugador = document.getElementById('nombreJugador').value.trim();
  if (nombreJugador === "") {
    alert("Por favor, ingresa tu nombre antes de comenzar.");
    return;
  }

  document.getElementById("pantalla-inicio").style.display = "none";
  document.getElementById("pantalla-resultados").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "flex";
  correctas = 0;
  incorrectas = 0;
  numeroPregunta = 1;
  puntajeTotal = 0;
  tiempoInicio = Date.now();
  await cargarPaises();
  mostrarPregunta();
}

//Determina el tipo de pregunta y la muestra
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

//Pregunta sobre la capital de un pais
function preguntaCapital() {
  const pais = paisesConCapital[Math.floor(Math.random() * paisesConCapital.length)];
  const nombrePais = pais.name.common;
  const capitalCorrecta = pais.capital[0];
  const opciones = [capitalCorrecta];
  while (opciones.length < 4) {
    const aux = paisesConCapital[Math.floor(Math.random() * paisesConCapital.length)];
    const valor = aux.capital[0];
    if (!opciones.includes(valor)) {
      opciones.push(valor);
    }
  }
  const mezcladas = opciones.sort(() => Math.random() - 0.5);
  document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
  document.getElementById("pregunta").textContent = `¿Cuál es la capital de ${nombrePais}?`;
  mostrarOpciones(mezcladas, capitalCorrecta, 3);
}

//Pregunta sobre la bandera de un pais
function preguntaBandera() {
  const pais = paisesConBandera[Math.floor(Math.random() * paisesConBandera.length)];
  const nombrePais = pais.name.common;
  const opciones = [nombrePais];
  while (opciones.length < 4) {
    const aux = paisesConBandera[Math.floor(Math.random() * paisesConBandera.length)]
    const valor = aux.name.common;
    if (!opciones.includes(valor)) {
      opciones.push(valor);
    }
  }
  const mezcladas = opciones.sort(() => Math.random() - 0.5);
  document.getElementById("progreso").textContent = `🟡 Pregunta ${numeroPregunta} de ${totalPreguntas}`;
  document.getElementById("pregunta").innerHTML = `¿Qué país representa esta bandera?<br><img src="${pais.flags.svg}" alt="Bandera" style="width: 100px;">`;
  mostrarOpciones(mezcladas, nombrePais, 5);
}

//Pregunta sobre la cantidad de paises limitrofes
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
  mostrarOpciones(mezcladas, cantidadCorrecta, 3);
}

//Muestra las opciones de respuesta
function mostrarOpciones(opciones, correcta, valorPuntaje = 0) {
  const contenedor = document.querySelector(".opciones");
  contenedor.innerHTML = "";
  opciones.forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.onclick = () => responder(opcion === correcta, correcta, valorPuntaje);
    contenedor.appendChild(boton);
  });
}

//Procesa la respuesta del usuario y actualiza los resultados 
function responder(esCorrecta, correcta, valorPuntaje = 0) {
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
  }, 1500);
}

//Muestra la pantalla final con los resultados deljuego
function pantallaResultados() {
  const tiempoFinal = Date.now();
  tiempoTotal = Math.floor((tiempoFinal - tiempoInicio) / 1000);
  const promedio = (tiempoTotal / totalPreguntas).toFixed(1);
 
  document.getElementById("resultado-correctas").textContent = correctas;
  document.getElementById("resultado-incorrectas").textContent = incorrectas;
  document.getElementById("resultado-tiempo-total").textContent = tiempoTotal;
  document.getElementById("resultado-tiempo-promedio").textContent = promedio;
  document.getElementById("resultado-puntaje-total").textContent = puntajeTotal;
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-resultados").style.display = "flex";
}

//Guarda los resultados y muestra el ranking 
async function mostrarRanking() {
  console.log('🔍 mostrarRanking ● datos a enviar:', {nombreJugador, puntajeTotal, correctas, tiempoTotal });
  try {
    await fetch('guardarResultados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nombreJugador, puntajeTotal, correctas, tiempoTotal })
    });
    const res = await fetch('rankings');
    const data = await res.json();
    document.querySelectorAll('.pantalla').forEach(div => {
      div.style.display = 'none';
    });
    document.getElementById("pantalla-ranking").style.display = "flex";
    document.getElementById('rankingPuntaje').innerHTML = '';
    document.getElementById('rankingAciertos').innerHTML = '';
    document.getElementById('rankingTiempo').innerHTML = '';
    data.rankingPuntaje.forEach((item, i) => {
      const li = document.createElement('li');
      li.textContent = `#${i + 1} ${item.nombreJugador} : ${item.puntajeTotal}`;
      document.getElementById('rankingPuntaje').appendChild(li);
    });

    data.rankingAciertos.forEach((item, i) => {
      const li = document.createElement('li');
      li.textContent = `#${i + 1} ${item.nombreJugador} : ${item.correctas}`;
      document.getElementById('rankingAciertos').appendChild(li);
    });

    data.rankingTiempo.forEach((item, i) => {
      const li = document.createElement('li');
      li.textContent = `#${i + 1}  ${item.nombreJugador} : ${item.tiempoTotal}s`;
      document.getElementById('rankingTiempo').appendChild(li);
    });

  } catch (error) {
    console.error('Error en mostrarRanking:', error);
    alert('Ocurrió un error al guardar o cargar el ranking.');
  }
}

//Reinicia el juego
function reiniciarJuego() {
  jugar();
}



