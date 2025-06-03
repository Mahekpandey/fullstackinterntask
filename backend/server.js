const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// Prime number check endpoint
app.post('/api/check-prime', (req, res) => {
    const { number } = req.body;
    
    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'Please provide a valid number' });
    }

    const result = isPrime(number);
    res.json({ number, isPrime: result });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
