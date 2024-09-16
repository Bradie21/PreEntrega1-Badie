// Función para normalizar texto (convertir a minúsculas y eliminar acentos)
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
}

// Clase para manejar conversiones de unidades
class Conversion {
  constructor() {
    this.conversions = [];
  }

  // Método para agregar una conversión
  addConversion(kilometers) {
    this.conversions.push(kilometers);
  }

  // Métodos para convertir kilómetros a diferentes unidades
  convertKilometersToMillimeters(kilometers) {
    return kilometers * 1_000_000;
  }

  convertKilometersToMeters(kilometers) {
    return kilometers * 1_000;
  }

  convertKilometersToCentimeters(kilometers) {
    return kilometers * 100_000;
  }

  // Método para mostrar todas las conversiones en una unidad específica
  convert(kilometers, unit) {
    switch (unit) {
      case "milimetros":
        return this.convertKilometersToMillimeters(kilometers);
      case "metros":
        return this.convertKilometersToMeters(kilometers);
      case "centimetros":
        return this.convertKilometersToCentimeters(kilometers);
      default:
        return null;
    }
  }

  // Función de orden superior para procesar todas las conversiones
  processConversions(unit) {
    return this.conversions.map((km) => ({
      kilometers: km,
      converted: this.convert(km, unit),
    }));
  }

  // Método para buscar una conversión por kilómetros
  findConversion(kilometers) {
    return this.conversions.find((km) => km === kilometers);
  }

  // Método para filtrar las conversiones mayores a un valor
  filterConversionsGreaterThan(value) {
    return this.conversions.filter((km) => km > value);
  }
}

// Función para manejar la conversión y actualizar la interfaz
function convert() {
  const inputKilometers = prompt("Ingrese la cantidad de kilómetros:");
  const kilometers = parseFloat(inputKilometers.trim());

  if (isNaN(kilometers) || kilometers < 0) {
    alert("Por favor, ingrese un valor válido para los kilómetros.");
    return;
  }

  const inputUnit = prompt(
    "¿A qué unidad desea convertir? (milímetros, metros, centímetros):"
  );
  const unit = normalizeText(inputUnit);

  // Crear una instancia de la clase Conversion
  const conversion = new Conversion();
  conversion.addConversion(kilometers);

  // Corregir los acentos y nombres para asegurar que coincidan en el switch
  const convertedValue = conversion.convert(kilometers, unit);
  if (convertedValue === null) {
    alert(
      "Unidad no válida. Por favor, ingrese 'milímetros', 'metros' o 'centímetros' (sin acentos)."
    );
    return;
  }

  // Loguear el resultado
  console.log(`Kilómetros ingresados: ${kilometers}`);
  console.log(
    `${kilometers} kilómetros equivalen a ${convertedValue.toFixed(2)} ${unit}.`
  );

  // Mostrar el resultado al usuario
  alert(
    `${kilometers} kilómetros equivalen a ${convertedValue.toFixed(2)} ${unit}.`
  );

  // Mostrar el resultado en el HTML
  document.getElementById(
    "result"
  ).innerText = `${kilometers} kilómetros equivalen a ${convertedValue.toFixed(
    2
  )} ${unit}.`;

  // Ejemplos de búsqueda y filtrado
  const foundConversion = conversion.findConversion(kilometers);
  const filteredConversions = conversion.filterConversionsGreaterThan(10);
  const processedConversions = conversion.processConversions(unit);

  console.log(`Conversión encontrada: ${foundConversion}`);
  console.log(`Conversiones mayores a 10 kilómetros: ${filteredConversions}`);
  console.log(
    `Todas las conversiones procesadas: ${JSON.stringify(processedConversions)}`
  );
}
