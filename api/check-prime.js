function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

module.exports = async (req, res) => {
    try {
        // Log the incoming request
        console.log('Received request:', {
            method: req.method,
            body: req.body,
            headers: req.headers
        });

        // Enable CORS
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
        res.setHeader('Access-Control-Allow-Headers', '*');

        // Handle OPTIONS request
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Handle POST request
        if (req.method === 'POST') {
            let number;
            
            try {
                const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
                number = Number(body.number);
                console.log('Parsed number:', number);
            } catch (e) {
                console.error('Error parsing request:', e);
                return res.status(400).json({ error: 'Invalid request body' });
            }
            
            if (isNaN(number)) {
                return res.status(400).json({ error: 'Please provide a valid number' });
            }

            const result = isPrime(number);
            console.log('Result:', { number, isPrime: result });
            return res.status(200).json({ number, isPrime: result });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
