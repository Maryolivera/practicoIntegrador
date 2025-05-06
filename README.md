# practicoIntegrador

## JUEGO DE PAISES

    Este es un juego de preguntas y respuestas sobre países del mundo desarrollado como parte del Práctico Integrador de Programación Web II.
## DESCRIPCION

    El juego pone a prueba tus conocimientos sobre países con tres tipos de preguntas:

        ¿Cuál es la capital de un país? (3 puntos)

        ¿Qué país representa una bandera? (5 puntos)

        ¿Cuántos países limítrofes tiene un país? (3 puntos)

    Se deben responder 10 preguntas por partida.

    Al finalizar, el sistema muestra:

        Cantidad de respuestas correctas e incorrectas.

        Tiempo total de la partida.

        Tiempo promedio por pregunta.

        Puntaje total.

    Además, los resultados se guardan en un ranking que muestra las 20 mejores partidas ordenadas por:

        Puntaje

        Aciertos

        Tiempo

## ENLACE DEL JUEGO EN LINEA

 [Render](https://practicointegrador-1.onrender.com/)    
    
## REPOSITORIO
     
 [GitHub](https://github.com/Maryolivera/practicoIntegrador.git)

## TECNOLOGIAS USADAS

    Frontend: HTML, CSS, JavaScript

    Backend: Node.js + Express

   [API externa](https://restcountries.com/)

    Despliegue: Render.com

    Control de versiones: Git y GitHub

## INSTALACION DE DEPENDENCIAS

     npm install

## INICIAR EL SERVIDOR

     npm start

## ACCEDER AL JUEGO

   [http://localhost:3000](http://localhost:3000)

## API Y RUTAS DISPONIBLES

     GET /api/paises : Devuelve los países desde la API externa.

     POST /guardarResultados : Guarda los resultados de cada partida.

     GET /rankings : Devuelve los rankings organizados por puntaje, aciertos y tiempo.

## ESTRUCTURA DEL PROYECTO

        /cliente
            index.html
            styles.css
            script.js
        server.js
        ranking.json
        package.json

## VIDEO DEMOSTRATIVO

    []()

## Consideraciones sobre partidas simultáneas

El juego está preparado para que múltiples jugadores puedan jugar en simultáneo desde distintos navegadores o dispositivos, ya que cada partida se gestiona de manera independiente en el cliente.

Sin embargo, como el ranking se guarda localmente en un archivo (`ranking.json`), existe la posibilidad de que si varias partidas finalizan exactamente al mismo tiempo, puedan producirse solapamientos o pérdida de datos en el archivo de ranking. Para el uso previsto en este trabajo, esta situación es poco probable.

En caso de querer ampliar el juego para uso  profesional, se recomienda migrar el ranking a una base de datos externa .


## AUTOR

    María Nelly Olivera
    Trabajo final para la cátedra Programación Web II
    Profesor: Fernando Saez
    Año: 2025

