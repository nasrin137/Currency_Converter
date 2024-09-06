document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('converter-form');
    const swapButton = document.getElementById('swap-button');

    const apiKey = 'a045b322dade1d3f212eb18f'; // Replace with your actual API key
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Fetch currencies and populate the dropdowns
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.conversion_rates;
            const currencies = Object.keys(rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option2.value = currency;
                option1.textContent = currency;
                option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`)
            .then(response => response.json())
            .then(data => {
                const convertedAmount = data.conversion_result;
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.textContent = 'An error occurred. Please try again later.';
            });
    });

    swapButton.addEventListener('click', () => {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
    });
});
