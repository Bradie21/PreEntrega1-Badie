// Normaliza el texto eliminando acentos y pasando a minúsculas
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Clase para manejar las conversiones
class Conversion {
  constructor() {
    this.conversiones = this.obtenerConversionesGuardadas() || []; // Si no hay conversiones previas, inicializa un array vacío
  }

  // Fecha para mostrar en formato 24 horas
  formatearFecha(fecha) {
    const opciones = { hour: "2-digit", minute: "2-digit", hour12: false };
    return fecha.toLocaleDateString("es-ES") + " " + fecha.toLocaleTimeString("es-ES", opciones);
  }

  // Guarda conversiones en LocalStorage
  guardarConversion(kilometros, unidad, valorConvertido) {
    const nuevaConversion = {
      kilometros,
      unidad,
      valorConvertido,
      fecha: this.formatearFecha(new Date()), // Guarda la fecha de la conversión formateada
    };
    this.conversiones.push(nuevaConversion);
    localStorage.setItem("conversiones", JSON.stringify(this.conversiones)); // Guardar en JSON
  }

  // Obtener conversiones desde LocalStorage
  obtenerConversionesGuardadas() {
    return JSON.parse(localStorage.getItem("conversiones"));
  }

  // Convierte kilómetros a la unidad seleccionada
  convertir(kilometros, unidad) {
    switch (unidad) {
      case "milimetros":
        return kilometros * 1000000;
      case "metros":
        return kilometros * 1000;
      case "centimetros":
        return kilometros * 100000;
      default:
        return null;
    }
  }

  // Mostrar el historial de conversiones
  mostrarHistorial() {
    const listaHistorial = document.getElementById("historial");
    listaHistorial.innerHTML = ""; // Borra el historial antes de agregar nuevas conversiones
    this.conversiones.forEach((conversion) => {
      const item = document.createElement("li");
      item.textContent = `${
        conversion.kilometros
      } km = ${conversion.valorConvertido.toFixed(2)} ${
        conversion.unidad
      } (convertido el ${conversion.fecha})`;

      // Aplicar la clase según la unidad para darle color
      item.classList.add(conversion.unidad);
      listaHistorial.appendChild(item);
    });
  }

  // Borrar todas las conversiones del historial
  borrarHistorial() {
    this.conversiones = []; // Limpia el array de conversiones
    localStorage.removeItem("conversiones"); // Elimina del LocalStorage
    this.mostrarHistorial(); // Actualiza el DOM para reflejar los cambios
  }
}

// Crear instancia de la clase Conversion
const conversor = new Conversion();
conversor.mostrarHistorial(); // Mostrar historial al cargar la página

// Función que se ejecuta al hacer clic en el botón de conversión
function manejarConversion() {
  const inputKilometros = document.getElementById("kilometros").value;
  const kilometros = parseFloat(inputKilometros);
  const unidadSeleccionada = document.getElementById("unidad").value;

  // Validar el valor de kilómetros
  if (isNaN(kilometros) || kilometros < 0) {
    document.getElementById("resultado").innerText =
      "Por favor, ingrese un valor válido.";
    return;
  }

  // Realizar la conversión
  const valorConvertido = conversor.convertir(kilometros, unidadSeleccionada);
  if (valorConvertido === null) {
    document.getElementById("resultado").innerText = "Unidad no válida.";
    return;
  }

  // Mostrar el resultado en el HTML
  document.getElementById(
    "resultado"
  ).innerText = `${kilometros} kilómetros equivalen a ${valorConvertido.toFixed(
    2
  )} ${unidadSeleccionada}.`;

  // Guardar la conversión en el historial y mostrarlo
  conversor.guardarConversion(kilometros, unidadSeleccionada, valorConvertido);
  conversor.mostrarHistorial();
}

// Evento de clic al botón de conversión
document
  .getElementById("convertirBtn")
  .addEventListener("click", manejarConversion);

// Función para borrar el historial al hacer clic en el botón
document
  .getElementById("borrarHistorialBtn")
  .addEventListener("click", function () {
    conversor.borrarHistorial(); // Llamar al método para borrar el historial
    document.getElementById("resultado").innerText = ""; // Limpiar el resultado mostrado
  });
