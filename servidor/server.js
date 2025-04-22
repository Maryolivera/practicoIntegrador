const express   = require('express');
const cors  = require('cors');
const pat= require('path');

const app = express();
app.use(cors());
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
  });
  