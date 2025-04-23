const express = require('express')
const cors    = require('cors')
const fs      = require('fs')

const app = express()
const PORT=3000

app.use(cors())
app.use(express.json())


app.post('/guardarResultados', (req, res) => {
  const ranking = JSON.parse(fs.readFileSync('ranking.json', 'utf8'))
  ranking.push(req.body)
  fs.writeFileSync('ranking.json', JSON.stringify(ranking, null, 2))
  res.json({ mensaje: 'Datos guardados', total: ranking.length })
})

app.get('/rankings', (req, res) => {
  res.json(ordenarRanking())
})

function leerRanking() {
  try {
    return JSON.parse(fs.readFileSync('ranking.json', 'utf8'))
  } catch {
    return []
  }
}


function ordenarRanking() {
  const rankingCompleto = leerRanking()

  const rankingPuntaje = [...rankingCompleto]
    .sort((a, b) => b.puntajeTotal - a.puntajeTotal)
    .slice(0, 20)

  const rankingAciertos = [...rankingCompleto]
    .sort((a, b) => b.correctas - a.correctas)
    .slice(0, 20)

  const rankingTiempo = [...rankingCompleto]
    .sort((a, b) => a.duracionTotal - b.duracionTotal)
    .slice(0, 20)

  return { rankingPuntaje, rankingAciertos, rankingTiempo }
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})




