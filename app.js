// Objeto para almacenar las tasas de cambio
let exchangeRates = {};

// Función para obtener las tasas de cambio desde la API
async function fetchExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    if (data.result === 'success') {
      exchangeRates = data.rates;
    } else {
      console.error('Error fetching exchange rates:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Función para actualizar la cantidad convertida
function updateConvertedAmount() {
  const usdAmount = parseFloat(document.getElementById('cantidad_dos').value) || 0;
  const selectedCurrency = document.getElementById('selector_uno').value;
  const conversionRate = exchangeRates[selectedCurrency];
  const convertedAmount = usdAmount * conversionRate;
  document.getElementById('cantidad_convertida').value = convertedAmount.toFixed(2);
}

// Agregar un evento al cambiar el valor del input o el selector
document.getElementById('cantidad_dos').addEventListener('input', updateConvertedAmount);
document.getElementById('selector_uno').addEventListener('change', updateConvertedAmount);

// Llamar a la función para obtener las tasas de cambio cuando la página se carga
window.addEventListener('load', fetchExchangeRates);
