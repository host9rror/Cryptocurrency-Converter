const defaultUrl = "https://v6.exchangerate-api.com/v6/168d5916ba29521161c0efe7/latest/USD/";

function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`Request failed with status ${response.status}`));
      }
      return response.json();
    });
}

function updateCurrency(data) {
  const currencies = Object.keys(data.conversion_rates);
  const selectFrom = document.getElementById('convertFrom');
  const selectTo = document.getElementById('convertTo');

  selectFrom.innerHTML = '';
  selectTo.innerHTML = '';

  currencies.forEach(currency => {
    const optionFrom = document.createElement('option');

    optionFrom.textContent = currency;
    optionFrom.value = currency;

    selectFrom.appendChild(optionFrom);
    selectTo.appendChild(optionFrom.cloneNode(true));
  });
}

function handleConvertCurrency() {
  const fromCurrency = document.getElementById('convertFrom').value;
  const toCurrency = document.getElementById('convertTo').value;
  const inputValue = parseFloat(document.getElementById('input').value);

  const savedToCurrency = toCurrency;

  fetchData(defaultUrl)
    .then(data => {
      updateCurrency(data);

      document.getElementById('convertTo').value = savedToCurrency;

      const exchangeRate = data.conversion_rates[savedToCurrency];
      const convertedVal = inputValue * exchangeRate;
      document.getElementById('output').value = convertedVal.toFixed(2);
    })
    .catch(error => {
      console.error(error);
    });
}

document.getElementById('convertBtn').addEventListener('click', handleConvertCurrency);

document.addEventListener('DOMContentLoaded', function() {
  fetchData(defaultUrl)
    .then(data => {
      updateCurrency(data);
    })
    .catch(error => {
      console.error(error);
    });
});

// Event Delegation
document.getElementById('currencyConverter').addEventListener('click', function(event) {
  if (event.target.matches('#convertBtn')) {
    handleConvertCurrency();
  }
});