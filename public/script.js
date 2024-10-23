// script.js

document.getElementById('rule-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const ruleString = document.getElementById('ruleString').value;

    fetch('http://localhost:3000/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ruleString }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = `Result: ${data.result}`;
            resultDiv.style.color = 'green';
        })
        .catch(error => {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = `Error: ${error.message}`;
            resultDiv.style.color = 'red';
        });
});
