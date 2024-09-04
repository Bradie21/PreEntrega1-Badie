function convert() {
  // Usar prompt para solicitar al usuario el valor en kilómetros
  const kilometers = parseFloat(prompt("Ingrese la cantidad de kilómetros:"));

  // Condicional para validar la entrada
  if (isNaN(kilometers) || kilometers < 0) {
    alert("Por favor, ingrese un valor válido para los kilómetros.");
    return;
  }

  // Loguear el valor ingresado en la consola
  console.log(`Kilómetros ingresados: ${kilometers}`);

  // Algoritmo con ciclo
  let miles = 0;
  for (let i = 0; i < kilometers; i++) {
    miles += 0.621371; // 1 kilómetro = 0.621371 millas
  }

  // Se agregan las millas correspondientes a los decimales
  miles += (kilometers % 1) * 0.621371;

  // Loguear el resultado de la conversión en la consola
  console.log(`Millas convertidas: ${miles}`);

  // Mostrar el resultado en una alerta
  alert(`${kilometers} kilómetros equivalen a ${miles.toFixed(2)} millas.`);

  // Mostrar el resultado en el HTML
  document.getElementById(
    "result"
  ).innerText = `${kilometers} kilómetros equivalen a ${miles.toFixed(
    2
  )} millas.`;
}