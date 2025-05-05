//Importa modulos necesarios
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Ruta POST para guardar resultados en ranking.json
app.post("/guardarResultados", (req, res) => {
  const ranking = JSON.parse(fs.readFileSync("ranking.json", "utf8"));
  ranking.push(req.body);
  fs.writeFileSync("ranking.json", JSON.stringify(ranking, null, 2));
  res.json({ mensaje: "Datos guardados", total: ranking.length });
});

// Ruta GET para obtener los rankings ordenados
app.get("/rankings", (req, res) => {
  res.json(ordenarRanking());
});

//Leee el archivo ranking.json
function leerRanking() {
  try {
    return JSON.parse(fs.readFileSync("ranking.json", "utf8"));
  } catch {
    return [];
  }
}

//Ordena los ranking por tres criterios
function ordenarRanking() {
  const rankingCompleto = leerRanking();
  const rankingPuntaje = [...rankingCompleto]
    .sort((a, b) => b.puntajeTotal - a.puntajeTotal)
    .slice(0, 20);
  const rankingAciertos = [...rankingCompleto]
    .sort((a, b) => b.correctas - a.correctas)
    .slice(0, 20);
  const rankingTiempo = [...rankingCompleto]
    .sort((a, b) => a.tiempoTotal - b.tiempoTotal)
    .slice(0, 20);
  return { rankingPuntaje, rankingAciertos, rankingTiempo };
}

//Sirve los archivos estaticos desde la carpeta cliente
app.use(express.static(path.join(__dirname, "cliente")));
//Ruta get para obtener los datos de los paises desde la API externa
app.get("/api/paises", async (req, res) => {
  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all");
    const datos = await respuesta.json();
    res.json(datos);
  } catch (error) {
    console.error("Error al obtener países:", error);
    res.status(500).json({ error: "Error al obtener datos de países" });
  }
});

app.get(/^\/(?!guardarResultados|rankings).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "cliente", "index.html"));
});

//Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
