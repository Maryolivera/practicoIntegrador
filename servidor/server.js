const express = require('express')
const cors    = require('cors')
const fs      = require('fs')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/guardarResultados', (req, res) => {
  const ranking = JSON.parse(fs.readFileSync('ranking.json', 'utf8'))
  ranking.push(req.body)
  fs.writeFileSync('ranking.json', JSON.stringify(ranking, null, 2))
  res.json({ mensaje: 'Datos guardados', total: ranking.length })
})

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))





