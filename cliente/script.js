let listaPaises=[];
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