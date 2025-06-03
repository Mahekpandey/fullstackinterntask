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
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Handle POST request
    if (req.method === 'POST') {
        try {
            // Parse the request body if it's a string
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const number = Number(body.number);
            
            if (isNaN(number)) {
                return res.status(400).json({ error: 'Please provide a valid number' });
            }

            const result = isPrime(number);
            return res.json({ number, isPrime: result });
        } catch (error) {
            console.error('Error processing request:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Handle invalid methods
    return res.status(405).json({ error: 'Method not allowed' });
};
